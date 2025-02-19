import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

async function getVentasClientes() {
    const res = await fetch('http://localhost:3000/api/note/repVenCli');
    const data = await res.json();
    return data;
}

export const RepVenCli = () => {
    const [ventasClientes, setVentasClientes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getVentasClientes();
            setVentasClientes(data);
        }
        fetchData();
    }, []);

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Ventas por Cliente', 14, 16);
        doc.autoTable({
            head: [['Cliente', 'id_ventas']],
            body: ventasClientes.map(ventaCliente => [
                ventaCliente.cliente,
                ventaCliente.id_ventas
            ]),
            startY: 20,
        });
        doc.save('ReporteVentasClientes.pdf');
    };

    return (
        <>
            <div className="Archivo">
                <button onClick={generatePDF}>Generar PDF</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>id_ventas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventasClientes.map((ventaCliente) => (
                            <tr key={ventaCliente.id_ventas}>
                                <td>{ventaCliente.cliente}</td>
                                <td>{ventaCliente.id_ventas}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}