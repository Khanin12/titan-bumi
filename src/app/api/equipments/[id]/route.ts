
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, type, status } = body;

        const updatedEquipment = await prisma.equipments.update({
            where: { id },
            data: {
                name,
                type,
                status,
            },
        });

        return NextResponse.json(updatedEquipment);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update equipment' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.equipments.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Equipment deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete equipment' }, { status: 500 });
    }
}
