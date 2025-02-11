import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const clientes = await prisma.clientes.findMany();
        console.log(clientes);

        // Convertir BigInt a string
        const clientesSerialized = clientes.map(cliente => ({
            ...cliente,
            Id_cliente: cliente.Id_cliente.toString(),
            // Añadir aquí otros campos de tipo BigInt si los hay
        }));
        return NextResponse.json(clientesSerialized);

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
        const { Id_cliente, cliente, Celular, Domicilio } = await request.json();

        const newVenta = await prisma.clientes.create({
            data: {
                Id_cliente,
                cliente,
                Celular,
                Domicilio
            }
        });

        // Convertir BigInt a string
        const newclienteserialized = {
            ...newVenta,
            Id_cliente: newVenta.Id_cliente.toString(),
            // Añadir aquí otros campos de tipo BigInt si los hay
        };

        return NextResponse.json(newclienteserialized);
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