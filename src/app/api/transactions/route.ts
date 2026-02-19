import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    try {
        const [data, total] = await Promise.all([
            prisma.transactions.findMany({
                where: {
                    OR: [
                        { notes: { contains: search, mode: 'insensitive' } },
                        { driver: { name: { contains: search, mode: 'insensitive' } } },
                        { armada: { plat_nomor: { contains: search, mode: 'insensitive' } } },
                    ]
                },
                include: {
                    driver: true,
                    armada: true,
                    material: true,
                    partner: true,
                },
                orderBy: { date: 'desc' },
                skip,
                take: limit,
            }),
            prisma.transactions.count({
                where: {
                    OR: [
                        { notes: { contains: search, mode: 'insensitive' } },
                        { driver: { name: { contains: search, mode: 'insensitive' } } },
                        { armada: { plat_nomor: { contains: search, mode: 'insensitive' } } },
                    ]
                }
            })
        ]);

        return NextResponse.json({
            data,
            metadata: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Transactions GET Error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const transaction = await prisma.transactions.create({
            data: {
                date: new Date(body.date),
                driver_id: body.driver_id,
                armada_id: body.armada_id,
                material_id: body.material_id,
                partner_id: body.partner_id,
                quantity: body.quantity,
                price: body.price,
                royalty: body.royalty || 0,
                solar: body.solar || 0,
                notes: body.notes,
            }
        });
        return NextResponse.json(transaction);
    } catch (error) {
        console.error('Transactions POST Error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
