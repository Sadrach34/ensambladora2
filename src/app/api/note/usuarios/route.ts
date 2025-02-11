import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const usuarios = await prisma.usuarios.findMany();
        console.log(usuarios);

        // Convertir BigInt a string
        const usuariosSerialized = usuarios.map(componente => ({
            ...componente,
            Id_usuario: componente.Id_usuario.toString(),
            // Añadir aquí otros campos de tipo BigInt si los hay
        }));
        return NextResponse.json(usuariosSerialized);

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
        const { Id_usuario, Usuario, Cuenta, Clave, nivel, Idioma } = await request.json();

        const newcomponente = await prisma.usuarios.create({
            data: {
                Id_usuario,
                Usuario,
                Cuenta,
                Clave,
                nivel,
                Idioma,
            }
        });

        // Convertir BigInt a string
        const newusuarioserialized = {
            ...newcomponente,
            Id_usuario: newcomponente.Id_usuario.toString(),
            // Añadir aquí otros campos de tipo BigInt si los hay
        };

        return NextResponse.json(newusuarioserialized);
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