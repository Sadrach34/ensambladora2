import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        // Obtener todas las ventas
        const ventas = await prisma.ventas.findMany();
        
        // Obtener todos los componentes
        const componentes = await prisma.componentes.findMany();

        // Crear un mapa de componentes para acceso rápido
        const componentesMap = new Map();
        componentes.forEach(componente => {
            componentesMap.set(componente.id_componen.toString(), componente.componente);
        });

        // Combinar los datos de ventas y componentes
        const ventasComponentesSerialized = ventas.map(venta => ({
            id_ventas: venta.id_ventas.toString(),
            componente: componentesMap.get(venta.id_componen?.toString()) || 'N/A',
        }));

        return NextResponse.json(ventasComponentesSerialized);

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