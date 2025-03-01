import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        // Obtener todas las ventas
        const ventas = await prisma.ventas.findMany();
        
        // Obtener todos los clientes
        const clientes = await prisma.clientes.findMany();

        // Crear un mapa de clientes para acceso rápido
        const clientesMap = new Map();
        clientes.forEach(cliente => {
            clientesMap.set(cliente.Id_cliente.toString(), cliente.cliente);
        });

        // Combinar los datos de ventas y clientes
        const ventasClientesSerialized = ventas.map(venta => ({
            id_ventas: venta.id_ventas.toString(),
            cliente: clientesMap.get(venta.id_cliente?.toString()) || 'N/A',
        }));

        return NextResponse.json(ventasClientesSerialized);

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