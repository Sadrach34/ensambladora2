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

    const texts = {
        es: {
            title: 'Clientes',
            search: 'Buscar...',
            all: 'Todos',
            suspended: 'Suspendidos',
            notSuspended: 'No suspend',
            notFound: 'Cliente no encontrado',
            error: 'Error al buscar el cliente',
            id: 'id_Cliente',
            client: 'Cliente',
            cell: 'Celular',
            address: 'Domicilio',
            suspended: 'suspendido',
            options: 'Opciones',
            delete: 'Eliminar',
            modify: 'Modificar',
            suspend: 'Suspender'
        },
        en: {
            title: 'Clients',
            search: 'Search...',
            all: 'All',
            suspended: 'Suspended',
            notSuspended: 'Not suspended',
            notFound: 'Client not found',
            error: 'Error searching client',
            id: 'id_Client',
            client: 'Client',
            cell: 'Cellphone',
            address: 'Address',
            suspended: 'suspended',
            options: 'Options',
            delete: 'Delete',
            modify: 'Modify',
            suspend: 'Suspend'
        }
    }

    const language = session?.user?.Idioma === 2 ? 'en' : 'es';
    const t = texts[language];

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
                setError(t.notFound);
                setClientes([]);
                alert(t.notFound);
            }
        } catch (err) {
            setError(t.error);
            setClientes([]);
            alert(t.error + err + { error });
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
        if (filter === t.all) return true;
        if (filter === t.notSuspended) return cliente.suspendido === 'N';
        if (filter === t.suspend) return cliente.suspendido !== 'N';
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
                    <a className="btn" onClick={handleGet}>{t.search}</a>
                </div>
                <FormCliente />
                <select className="filtro" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option>{t.all}</option>
                    <option>{t.notSuspended}</option>
                    <option>{t.suspend}</option>
                </select>
                <table className="table">
                    <thead>
                        <tr>
                            <th>{t.id}</th>
                            <th>{t.client}</th>
                            <th>{t.cell}</th>
                            <th>{t.address}</th>
                            <th>{t.suspended}</th>
                            <th>{t.options}</th>
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
                                            <a className="btn btn2" onClick={() => handleDelete(cliente.Id_cliente)}>{t.delete}</a>
                                            <a className="btn btn2" onClick={() => handleEdit(cliente.Id_cliente)}>{t.modify}</a>
                                            <a className="btn btn2" onClick={() => handleSuspend(cliente.Id_cliente, cliente.suspendido)}>{t.suspend}</a>
                                        </span>
                                    </td>
                                )}
                                {session?.user?.nivel !== 1 && (
                                    <td>
                                        <span className="btn-group">
                                            <a className="btn btn2" onClick={() => handleSuspend(cliente.Id_cliente, cliente.suspendido)}>{t.suspend}</a>
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