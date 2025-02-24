'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormCliente } from '@/components/FormClientes';
import { useSession } from 'next-auth/react';

async function getClientes() {
    const res = await fetch('http://localhost:3000/api/note?table=clientes');
    const data = await res.json();
    return data;
}

async function deleteCliente(id) {
    const res = await fetch(`http://localhost:3000/api/note/${id}?table=clientes`, {
        method: 'DELETE',
    });
    return res.json();
}

async function getCliente(id) {
    const res = await fetch(`http://localhost:3000/api/note/${id}?table=clientes`, {
        method: 'GET',
    });
    return res.json();
}

async function updateClienteSuspendido(id, suspendido) {
    const res = await fetch('/api/note/upSuspendido', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, table: 'clientes', field: 'suspendido', value: suspendido }),
    });
    return res.json();
}

export const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('Todos');
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        async function fetchData() {
            const data = await getClientes();
            setClientes(data);
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await deleteCliente(id);
        setClientes((prevClientes) => prevClientes.filter((cliente) => cliente.Id_cliente !== id));
    };

    const handleGet = async () => {
        try {
            const data = await getCliente(searchId);
            if (data.record) {
                setClientes([data.record]);
                setError(null);
            } else {
                setError('Cliente no encontrado');
                setClientes([]);
                alert('Cliente no encontrado');
            }
        } catch (err) {
            setError('Error al buscar el cliente');
            setClientes([]);
            alert('Error al buscar el cliente' + err + { error });
        }
    };

    const handleEdit = (id) => {
        router.push(`/interfaces/Archivo/EditCliente?id=${id}`);
    };

    const handleSuspend = async (id, currentStatus) => {
        const newStatus = currentStatus === 'S' ? 'N' : 'S';
        await updateClienteSuspendido(id, newStatus);
        setClientes((prevClientes) =>
            prevClientes.map((cliente) =>
                cliente.Id_cliente === id ? { ...cliente, suspendido: newStatus } : cliente
            )
        );
    };

    const filteredClientes = clientes.filter((cliente) => {
        if (filter === 'Todos') return true;
        if (filter === 'No suspendidos') return cliente.suspendido === 'N';
        if (filter === 'Suspendidos') return cliente.suspendido !== 'N';
        return true;
    });

    return (
        <>
            <div className="Archivo">
                <div className="busqueda">
                    <input
                        className="buscar"
                        type="text"
                        placeholder="Buscar..."
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                    <a className="btn" onClick={handleGet}>Buscar</a>
                </div>
                <FormCliente />
                <select className="filtro" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option>Todos</option>
                    <option>No suspendidos</option>
                    <option>Suspendidos</option>
                </select>
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
                        {filteredClientes.map((cliente) => (
                            <tr key={cliente.Id_cliente}>
                                <td>{cliente.Id_cliente}</td>
                                <td>{cliente.cliente}</td>
                                <td>{cliente.Celular}</td>
                                <td>{cliente.Domicilio}</td>
                                <td>{cliente.suspendido}</td>
                                {session?.user?.nivel === 1 && (
                                    <td>
                                        <span className="btn-group">
                                            <a className="btn btn2" onClick={() => handleDelete(cliente.Id_cliente)}>Eliminar</a>
                                            <a className="btn btn2" onClick={() => handleEdit(cliente.Id_cliente)}>Modificar</a>
                                            <a className="btn btn2" onClick={() => handleSuspend(cliente.Id_cliente, cliente.suspendido)}>Suspender</a>
                                        </span>
                                    </td>
                                )}
                                {session?.user?.nivel !== 1 && (
                                    <td>
                                        <span className="btn-group">
                                            <a className="btn btn2" onClick={() => handleSuspend(cliente.Id_cliente, cliente.suspendido)}>Suspender</a>
                                        </span>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};