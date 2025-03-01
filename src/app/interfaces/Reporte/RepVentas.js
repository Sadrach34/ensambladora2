import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

async function getVentas() {
    const res = await fetch('http://localhost:3000/api/note?table=ventas');
    const data = await res.json();
    return data;
}

export const RepVentas = () => {
    const [ventas, setVentas] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const data = await getVentas();
            setVentas(data);
        }
        fetchData();
    }, []);

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Ventas', 14, 16);
        doc.autoTable({
            head: [['id_ventas', 'id_cliente', 'id_componente', 'Id_usuario', 'Monto', 'FechaHora', 'cancelado']],
            body: ventas.map(venta => [
                venta.id_ventas,
                venta.id_cliente,
                venta.id_componente,
                venta.Id_usuario,
                venta.Monto,
                venta.FechaHora,
                venta.cancelado
            ]),
            startY: 20,
        });
        doc.save('ReporteVentas.pdf');
    };

    return (
        <>
            <div className="Archivo">
                <button onClick={generatePDF}>Generar PDF</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>id_ventas</th>
                            <th>id_cliente</th>
                            <th>id_componente</th>
                            <th>Id_usuario</th>
                            <th>Monto</th>
                            <th>FechaHora</th>
                            <th>cancelado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((venta) => (
                            <tr key={venta.id_ventas}>
                                <td>{venta.id_ventas}</td>
                                <td>{venta.id_cliente}</td>
                                <td>{venta.id_componente}</td>
                                <td>{venta.Id_usuario}</td>
                                <td>{venta.Monto}</td>
                                <td>{venta.FechaHora}</td>
                                <td>{venta.cancelado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}