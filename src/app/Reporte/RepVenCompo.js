import React, { useEffect, useState } from 'react';

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
    return (
        <>
            <div className="Archivo">

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