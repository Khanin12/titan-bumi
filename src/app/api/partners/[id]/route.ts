
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, location } = body;

        const updatedPartner = await prisma.partners.update({
            where: { id },
            data: {
                name,
                location,
            },
        });

        return NextResponse.json(updatedPartner);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update partner' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.partners.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Partner deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 });
    }
}
