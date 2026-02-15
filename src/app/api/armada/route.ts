
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const skip = (page - 1) * limit;

    try {
        const where: any = {};

        if (search) {
            where.OR = [
                { nama_sopir: { contains: search, mode: 'insensitive' as const } },
                { plat_nomor: { contains: search, mode: 'insensitive' as const } },
            ];
        }

        if (startDate && endDate) {
            where.created_at = {
                gte: new Date(startDate),
                lte: new Date(endDate),
            };
        }

        const [data, total] = await Promise.all([
            prisma.armada.findMany({
                where,
                skip: limit > 0 ? skip : undefined, // Retrieve all if limit is 0 (for export)
                take: limit > 0 ? limit : undefined,
                orderBy: { created_at: 'desc' },
            }),
            prisma.armada.count({ where }),
        ]);

        return NextResponse.json({
            data,
            metadata: {
                total,
                page,
                limit,
                totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nama_sopir, plat_nomor, keterangan } = body;

        const newArmada = await prisma.armada.create({
            data: {
                nama_sopir,
                plat_nomor,
                keterangan,
            },
        });

        return NextResponse.json(newArmada, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create data' }, { status: 500 });
    }
}
