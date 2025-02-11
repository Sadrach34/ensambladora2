import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const ventas = await prisma.ventas.findMany();
        console.log(ventas);

        // Convertir BigInt a string
        const ventasSerialized = ventas.map(venta => ({
            ...venta,
            id_ventas: venta.id_ventas.toString(),
            id_cliente: venta.id_cliente ? venta.id_cliente.toString() : 'N/A',
            id_componen: venta.id_componen ? venta.id_componen.toString() : 'N/A',
            FechaHora: venta.FechaHora ? venta.FechaHora.toISOString() : 'N/A',
            cancelado: venta.cancelado || 'N/A',
        }));
        return NextResponse.json(ventasSerialized);

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, {
                status: 500,
            });
        }
    }
}

export async function POST(request: Request) {
    try {
        const { id_cliente, id_componen, Monto, cancelado } = await request.json();

        const newVenta = await prisma.ventas.create({
            data: {
                id_cliente,
                id_componen,
                Monto,
                FechaHora: new Date(),
                cancelado,
            }
        });

        // Convertir BigInt a string
        const newVentaSerialized = {
            ...newVenta,
            id_ventas: newVenta.id_ventas.toString(),
            id_cliente: newVenta.id_cliente ? newVenta.id_cliente.toString() : 'N/A',
            id_componen: newVenta.id_componen ? newVenta.id_componen.toString() : 'N/A',
            FechaHora: newVenta.FechaHora ? newVenta.FechaHora.toISOString() : 'N/A',
            cancelado: newVenta.cancelado || 'N/A',
        };

        return NextResponse.json(newVentaSerialized);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, {
                status: 500,
            });
        }
    }
}