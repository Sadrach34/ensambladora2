import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const Componentes = await prisma.componentes.findMany();
        console.log(Componentes);

        // Convertir BigInt a string
        const ComponentesSerialized = Componentes.map(componente => ({
            ...componente,
            id_Componentes: componente.id_Componentes.toString(),
            // Añadir aquí otros campos de tipo BigInt si los hay
        }));
        return NextResponse.json(ComponentesSerialized);

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
        const { id_Componentes, componente, precio, Disponible } = await request.json();

        const newcomponente = await prisma.componentes.create({
            data: {
                id_Componentes,
                componente,
                precio,
                Disponible,
            }
        });

        // Convertir BigInt a string
        const newComponenteserialized = {
            ...newcomponente,
            id_Componentes: newcomponente.id_Componentes.toString(),
            // Añadir aquí otros campos de tipo BigInt si los hay
        };

        return NextResponse.json(newComponenteserialized);
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