import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
            throw new Error('Invalid table name');
    }
};

const convertBigIntToString = (obj: any) => {
    for (const key in obj) {
        if (typeof obj[key] === 'bigint') {
            obj[key] = obj[key].toString();
        }
    }
    return obj;
};

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const table = url.searchParams.get('table');
        if (!table) {
            throw new Error('Table parameter is missing');
        }

        const model = getModel(table);
        const records = await model.findMany();
        const convertedRecords = records.map(convertBigIntToString);

        return NextResponse.json(convertedRecords);
    } catch (error) {
        console.error(error);
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
        const url = new URL(request.url);
        const table = url.searchParams.get('table');
        if (!table) {
            throw new Error('Table parameter is missing');
        }

        const model = getModel(table);
        const data = await request.json();

        console.log(`Creating new record in table: ${table}`, data);

        const newRecord = await model.create({
            data: {
                ...data,
                FechaHora: table === 'ventas' ? new Date() : undefined, // Solo agregar FechaHora para ventas
            }
        });

        const newRecordSerialized = convertBigIntToString(newRecord);

        return NextResponse.json(newRecordSerialized);
    } catch (error) {
        console.error('Error creating new record:', error);
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message,
                stack: error.stack,
                error: error // Agregar el objeto de error completo para más detalles
            }, {
                status: 500,
            });
        }
    }
}