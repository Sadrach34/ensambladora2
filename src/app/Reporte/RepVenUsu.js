import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

async function getVentasUsuarios() {
    const res = await fetch('http://localhost:3000/api/note/repVenUsu');
    const data = await res.json();
    return data;
}

export const RepVenUsu = () => {
    const [ventasUsuario, setVentasUsuarios] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const data = await getVentasUsuarios();
            setVentasUsuarios(data);
        }
        fetchData();
    }, []);

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Ventas por Usuario', 14, 16);
        doc.autoTable({
            head: [['Usuario', 'id_ventas']],
            body: ventasUsuario.map(ventaUsuario => [
                ventaUsuario.usuario,
                ventaUsuario.id_ventas
            ]),
            startY: 20,
        });
        doc.save('ReporteVentasUsuarios.pdf');
    };
    return (
        <>
            <div className="Archivo">
                <button onClick={generatePDF}>Generar PDF</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>id_ventas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventasUsuario.map((ventasUsuario) => (
                            <tr key={ventasUsuario.id_ventas}>
                                <td>{ventasUsuario.usuario}</td>
                                <td>{ventasUsuario.id_ventas}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}