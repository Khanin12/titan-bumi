
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
                { location: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [data, total] = await Promise.all([
            prisma.partners.findMany({
                where,
                skip: limit > 0 ? skip : undefined,
                take: limit > 0 ? limit : undefined,
                orderBy: { created_at: 'desc' },
            }),
            prisma.partners.count({ where }),
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
        return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, location } = body;

        const newPartner = await prisma.partners.create({
            data: {
                name,
                location,
            },
        });

        return NextResponse.json(newPartner, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
    }
}
