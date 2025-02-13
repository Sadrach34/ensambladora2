import React, { useEffect, useState } from 'react';

async function getClientes() {
    const res = await fetch('http://localhost:3000/api/note/clientes');
    const data = await res.json();
    return data;
}

export const Clientes = () => {
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
                <div className="busqueda">
                    <input className="buscar"></input>
                    <a className="btn">Buscar</a>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>id_Cliente</th>
                            <th>Cliente</th>
                            <th>Celular</th>
                            <th>Domicilo</th>
                            <th>suspendido</th>
                            <th>Opciones</th>
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
                                <td>
                                    <span className="btn-group">
                                        <a className="btn btn2">Eliminar</a>
                                        <a className="btn btn2">Modificar</a>
                                    </span>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="btn-group">
                    <a className="btn btn2">Agregar</a>
                </div>
            </div>
        </>
    );
}