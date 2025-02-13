import React, { useEffect, useState } from 'react';

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
    return (
        <>
            <div className="Archivo">
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