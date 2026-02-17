
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, phone } = body;

        const updatedDriver = await prisma.drivers.update({
            where: { id },
            data: {
                name,
                phone,
            },
        });

        return NextResponse.json(updatedDriver);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update driver' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.drivers.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Driver deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete driver' }, { status: 500 });
    }
}
