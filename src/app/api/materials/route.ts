
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    try {
        const where: any = {};

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [data, total] = await Promise.all([
            prisma.materials.findMany({
                where,
                skip: limit > 0 ? skip : undefined,
                take: limit > 0 ? limit : undefined,
                orderBy: { created_at: 'desc' },
            }),
            prisma.materials.count({ where }),
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
        console.error('Fetch materials error:', error);
        return NextResponse.json({ error: 'Failed to fetch materials' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, price_per_rit } = body;

        const newMaterial = await prisma.materials.create({
            data: {
                name,
                price_per_rit: price_per_rit ? parseFloat(price_per_rit) : null,
            },
        });

        return NextResponse.json(newMaterial, { status: 201 });
    } catch (error) {
        console.error('Create material error:', error);
        return NextResponse.json({ error: 'Failed to create material' }, { status: 500 });
    }
}
