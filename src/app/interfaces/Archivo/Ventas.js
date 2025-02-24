import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormVenta } from '@/components/FormVenta';
import { useSession } from 'next-auth/react';

async function getVentas() {
    const res = await fetch('http://localhost:3000/api/note?table=ventas');
    const data = await res.json();
    return data;
}

async function deleteVenta(id) {
    const res = await fetch(`http://localhost:3000/api/note/${id}?table=ventas`, {
        method: 'DELETE',
    });
    return res.json();
}

async function getVenta(id) {
    const res = await fetch(`http://localhost:3000/api/note/${id}?table=ventas`, {
        method: 'GET',
    });
    return res.json();
}

async function updateVentaCancelado(id, cancelado) {
    const res = await fetch('/api/note/upSuspendido', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, table: 'ventas', field: 'cancelado', value: cancelado }),
    });
    return res.json();
}

export function Ventas() {
    const [ventas, setVentas] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('Todos');
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        async function fetchData() {
            const data = await getVentas();
            setVentas(data);
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await deleteVenta(id);
        setVentas((prevVentas) => prevVentas.filter((venta) => venta.id_ventas !== id));
    };

    const handleGet = async () => {
        try {
            const data = await getVenta(searchId);
            if (data.record) {
                setVentas([data.record]);
                setError(null);
            } else {
                setError('Venta no encontrada');
                setVentas([]);
                alert('Venta no encontrada');
            }
        } catch (err) {
            setError('Error al buscar la venta' + error);
            setVentas([]);
            alert('Error al buscar la venta: ' + err);
        }
    };

    const handleEdit = (id) => {
        router.push(`/interfaces/Archivo/EditVenta?id=${id}`);
    };

    const handleSuspend = async (id, currentStatus) => {
        const newStatus = currentStatus === 'S' ? 'N' : 'S';
        await updateVentaCancelado(id, newStatus);
        setVentas((prevVentas) =>
            prevVentas.map((venta) =>
                venta.id_ventas === id ? { ...venta, cancelado: newStatus } : venta
            )
        );
    };

    const filteredVentas = ventas.filter((venta) => {
        if (filter === 'Todos') return true;
        if (filter === 'No suspendidos') return venta.cancelado === 'N';
        if (filter === 'Suspendidos') return venta.cancelado !== 'N';
        return true;
    });

    return (
        <>
            <div className="Archivo">
                <div className="busqueda">
                    <input
                        className="buscar"
                        placeholder='Buscar...'
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                    <a className="btn" onClick={handleGet}>Buscar</a>
                </div>
                <FormVenta />
                <select className="filtro" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option>Todos</option>
                    <option>No suspendidos</option>
                    <option>Suspendidos</option>
                </select>
                <table className="table">
                    <thead>
                        <tr>
                            <th>id_ventas</th>
                            <th>id_cliente</th>
                            <th>id_componen</th>
                            <th>Id_usuario</th>
                            <th>Monto</th>
                            <th>FechaHora</th>
                            <th>cancelado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVentas.map((venta) => (
                            <tr key={venta.id_ventas}>
                                <td>{venta.id_ventas}</td>
                                <td>{venta.id_cliente}</td>
                                <td>{venta.id_componen}</td>
                                <td>{venta.Id_usuario}</td>
                                <td>{venta.Monto}</td>
                                <td>{venta.FechaHora}</td>
                                <td>{venta.cancelado}</td>
                                {session?.user?.nivel === 1 && (
                                    <td>
                                        <span className="btn-group">
                                            <a className="btn btn2" onClick={() => handleDelete(venta.id_ventas)}>Eliminar</a>
                                            <a className="btn btn2" onClick={() => handleEdit(venta.id_ventas)}>Modificar</a>
                                            <a className="btn btn2" onClick={() => handleSuspend(venta.id_ventas, venta.cancelado)}>Suspender</a>
                                        </span>
                                    </td>
                                )}
                                {session?.user?.nivel !== 1 && (
                                <td>
                                    <span className="btn-group">
                                        <a className="btn btn2" onClick={() => handleSuspend(venta.id_ventas, venta.cancelado)}>Suspender</a>
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
}