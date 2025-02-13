import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        // Obtener todas las ventas
        const ventas = await prisma.ventas.findMany();
        
        // Obtener todos los usuarios
        const usuarios = await prisma.usuarios.findMany();

        // Crear un mapa de usuarios para acceso rápido
        const usuariosMap = new Map();
        usuarios.forEach(usuario => {
            usuariosMap.set(usuario.Id_usuario.toString(), usuario.Usuario);
        });

        // Combinar los datos de ventas y usuarios
        const ventasUsuariosSerialized = ventas.map(venta => ({
            id_ventas: venta.id_ventas.toString(),
            usuario: usuariosMap.get(venta.Id_usuario?.toString()) || 'N/A',
        }));

        return NextResponse.json(ventasUsuariosSerialized);

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