import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const convertBigIntToString = (obj: any) => {
    for (const key in obj) {
        if (typeof obj[key] === 'bigint') {
            obj[key] = obj[key].toString();
        }
    }
    return obj;
};

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "No autorizado" }, { status: 401 });
        }

        const { id, table, field, value } = await request.json();

        if (!id || !table || !field || !value) {
            return NextResponse.json({ message: "Faltan parámetros" }, { status: 400 });
        }

        const model = getModel(table);
        const idField = getIdField(table);

        const existingRecord = await model.findUnique({
            where: {
                [idField]: Number(id),
            },
        });

        if (!existingRecord) {
            return NextResponse.json({ message: `${table} no encontrado` }, { status: 404 });
        }

        const updateData = { [field]: value };

        const updatedRecord = await model.update({
            where: {
                [idField]: Number(id),
            },
            data: updateData,
        });

        return NextResponse.json({ message: "Campo actualizado correctamente", updatedRecord: convertBigIntToString(updatedRecord) });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

const getModel = (table: string) => {
    switch (table) {
        case 'ventas':
            return prisma.ventas;
        case 'clientes':
            return prisma.clientes;
        case 'componentes':
            return prisma.componentes;
        case 'usuarios':
            return prisma.usuarios;
        default:
            throw new Error('Nombre de tabla inválido');
    }
};

const getIdField = (table: string) => {
    switch (table) {
        case 'ventas':
            return 'id_ventas';
        case 'clientes':
            return 'Id_cliente';
        case 'componentes':
            return 'id_componen';
        case 'usuarios':
            return 'Id_usuario';
        default:
            throw new Error('Nombre de campo de ID inválido');
    }
};