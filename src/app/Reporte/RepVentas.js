import React, { useEffect, useState } from 'react';

async function getVentas() {
    const res = await fetch('http://localhost:3000/api/note/ventas');
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
    return (
        <>
            <div className="Archivo">
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
                                <td>{venta.id_componen}</td>
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