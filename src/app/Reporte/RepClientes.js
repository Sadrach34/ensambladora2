import React, { useEffect, useState } from 'react';

async function getClientes() {
    const res = await fetch('http://localhost:3000/api/note/clientes');
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
    return (
        <>
            <div className="Archivo">
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
