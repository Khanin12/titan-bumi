import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const transaction = await prisma.transactions.update({
            where: { id },
            data: {
                date: body.date ? new Date(body.date) : undefined,
                driver_id: body.driver_id,
                armada_id: body.armada_id,
                material_id: body.material_id,
                partner_id: body.partner_id,
                quantity: body.quantity,
                price: body.price,
                royalty: body.royalty,
                solar: body.solar,
                notes: body.notes,
            }
        });
        return NextResponse.json(transaction);
    } catch (error) {
        console.error('Transactions PUT Error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.transactions.delete({
            where: { id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Transactions DELETE Error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
