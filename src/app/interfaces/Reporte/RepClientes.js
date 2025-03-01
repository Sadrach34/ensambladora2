import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


async function getClientes() {
    const res = await fetch('http://localhost:3000/api/note?table=clientes');
    const data = await res.json();
    return data;
}
export const RepClientes = () => {
    const [clientes, setClientes] = useState([]);
    
        useEffect(() => {
            async function fetchData() {
                const data = await getClientes();
                setClientes(data);
            }
            fetchData();
        }, []);

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Clientes', 14, 16);
        doc.autoTable({
            head: [['id_cliente', 'Celular', 'Cliente', 'Domicilio', 'suspendido']],
            body: clientes.map(cliente => [
                cliente.Id_cliente,
                cliente.Celular,
                cliente.cliente,
                cliente.Domicilio,
                cliente.suspendido
            ]),
            startY: 20,
        });
        doc.save('ReporteClientes.pdf');
    };

    return (
        <>
            <div className="Archivo">
                <button onClick={generatePDF}>Generar PDF</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>id_Cliente</th>
                            <th>Celular</th>
                            <th>Cliente</th>
                            <th>Domicilo</th>
                            <th>suspendido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.Id_cliente}>
                                <td>{cliente.Id_cliente}</td>
                                <td>{cliente.cliente}</td>
                                <td>{cliente.Celular}</td>
                                <td>{cliente.Domicilio}</td>
                                <td>{cliente.suspendido}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
