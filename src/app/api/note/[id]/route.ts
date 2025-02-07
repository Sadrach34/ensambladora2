import { NextResponse } from "next/server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {params: {id: string}}

export async function GET(request: Request, {params}: Params) { 
    // GET /api/note/[id]
    try{
        const venta = await prisma.ventas.findFirst({
            where: {
                id_ventas: Number(params.id),
            },
        });

        if (!venta) {
            return NextResponse.json({
                message: "Venta not found",
            }, {
                status: 404,
            });
        }

        // Convertir BigInt a string
        const ventaSerialized = {
            ...venta,
            id_ventas: venta.id_ventas.toString(),
            id_cliente: venta.id_cliente ? venta.id_cliente.toString() : 'N/A',
            id_componen: venta.id_componen ? venta.id_componen.toString() : 'N/A',
            FechaHora: venta.FechaHora ? venta.FechaHora.toISOString() : 'N/A',
        };

        return NextResponse.json({ventaSerialized});
    }catch(error){
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, {
                status: 500,
            });
        }
    }
}

export async function DELETE(request: Request, {params}: Params) {
    // DELETE /api/note/[id]
    try{
        const deleteVenta = await prisma.ventas.delete({
            where: {
                id_ventas: Number(params.id),
            },
        });

        if (!deleteVenta) {
            return NextResponse.json({
                message: "Venta not found",
            }, {
                status: 404,
            });
        }

        // Convertir BigInt a string
        const deleteVentaSerialized = {
            ...deleteVenta,
            id_ventas: deleteVenta.id_ventas.toString(),
            id_cliente: deleteVenta.id_cliente ? deleteVenta.id_cliente.toString() : 'N/A',
            id_componen: deleteVenta.id_componen ? deleteVenta.id_componen.toString() : 'N/A',
            FechaHora: deleteVenta.FechaHora ? deleteVenta.FechaHora.toISOString() : 'N/A',
        };

        return NextResponse.json({deleteVentaSerialized});
    }catch(error){
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json({
                    message: "Venta not found (p2025)",
                }, {
                    status: 404,
                });
            }
            return NextResponse.json({
                message: error.message
            }, {
                status: 500,
            });
        }
    }
}

export async function PUT(request: Request, {params}: Params) { 
    // PUT /api/note/[id]
    try{
        const { id_cliente, id_componen, Monto } = await request.json();
        
        prisma.ventas.update({
            where: {
                id_ventas: Number(params.id),
            },
            data: {
                id_cliente,
                id_componen,
                Monto
            },
        });

        // Convertir BigInt a string
        const deleteVentaSerialized = {
            id_cliente: id_cliente ? id_cliente.toString() : 'N/A',
            id_componen: id_componen ? id_componen.toString() : 'N/A',
            Monto: Monto.toString(),
        };

        return NextResponse.json({deleteVentaSerialized});
    }catch(error){
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json({
                    message: "Venta not found (p2025)",
                }, {
                    status: 404,
                });
            }
            return NextResponse.json({
                message: error.message
            }, {
                status: 500,
            });
        }
    }
}
