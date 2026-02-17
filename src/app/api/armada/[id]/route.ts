
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { owner, plat_nomor, keterangan } = body;

        const updatedArmada = await prisma.armada.update({
            where: { id },
            data: {
                owner,
                plat_nomor,
                keterangan,
            },
        });

        return NextResponse.json(updatedArmada);
    } catch (error) {
        console.error('Error updating armada:', error);
        return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.armada.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Data deleted successfully' });
    } catch (error) {
        console.error('Error deleting armada:', error);
        return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
    }
}
