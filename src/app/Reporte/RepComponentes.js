import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

async function getComponente() {
    const res = await fetch('http://localhost:3000/api/note?table=componentes');
    const data = await res.json();
    return data;
}

export const RepComponentes = () => {
    const [componente, setComponente] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const data = await getComponente();
            setComponente(data);
        }
        fetchData();
    }, []);

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Componentes', 14, 16);
        doc.autoTable({
            head: [['id_componen', 'Componente', 'Precio', 'Disponible', 'baja']],
            body: componente.map(componente => [
                componente.id_componen,
                componente.componente,
                componente.precio,
                componente.Disponible,
                componente.baja
            ]),
            startY: 20,
        });
        doc.save('ReporteComponentes.pdf');
    }
    return (
        <>
            <div className="Archivo">
                <button onClick={generatePDF}>Generar PDF</button>
                <div className="busqueda">
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>id_componen</th>
                            <th>Componente</th>
                            <th>Precio</th>
                            <th>Disponible</th>
                            <th>baja</th>
                        </tr>
                    </thead>
                    <tbody>
                        {componente.map((componente) => (
                            <tr key={componente.id_componen}>
                                <td>{componente.id_componen}</td>
                                <td>{componente.componente}</td>
                                <td>{componente.precio}</td>
                                <td>{componente.Disponible}</td>
                                <td>{componente.baja}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}