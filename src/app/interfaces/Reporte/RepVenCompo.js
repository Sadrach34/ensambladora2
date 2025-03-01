import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

async function getVentasComponentes() {
    const res = await fetch('http://localhost:3000/api/note/repVenCompo');
    const data = await res.json();
    return data;
}

export const RepVenCompo = () => {
        const [ventasComponente, setVentasComponentes] = useState([]);
    
        useEffect(() => {
            async function fetchData() {
                const data = await getVentasComponentes();
                setVentasComponentes(data);
            }
            fetchData();
        }, []);

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Ventas por Componente', 14, 16);
        doc.autoTable({
            head: [['Componente', 'id_ventas']],
            body: ventasComponente.map(ventaComponente => [
                ventaComponente.componente,
                ventaComponente.id_ventas
            ]),
            startY: 20,
        });
        doc.save('ReporteVentasComponentes.pdf');
    };

    return (
        <>
            <div className="Archivo">
                <button onClick={generatePDF}>Generar PDF</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Componente</th>
                            <th>id_ventas</th>
                        </tr>
                    </thead>
                    <tbody>
                    {ventasComponente.map((ventaComponente) => (
                            <tr key={ventaComponente.id_ventas}>
                                <td>{ventaComponente.componente}</td>
                                <td>{ventaComponente.id_ventas}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}