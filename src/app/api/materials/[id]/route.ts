
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, price_per_rit } = body;


        const updatedMaterial = await prisma.materials.update({
            where: { id },
            data: {
                name,
                price_per_rit: price_per_rit ? parseFloat(price_per_rit) : null,
            },
        });

        return NextResponse.json(updatedMaterial);
    } catch (error) {
        console.error('Update material error:', error);
        return NextResponse.json({ error: 'Failed to update material' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.materials.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Material deleted successfully' });
    } catch (error) {
        console.error('Delete material error:', error);
        return NextResponse.json({ error: 'Failed to delete material' }, { status: 500 });
    }
}
