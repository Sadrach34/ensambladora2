import React, { useEffect, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
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

    const texts = {
        es: {
            search: 'Buscar...',
            all: 'Todos',
            suspended: 'Suspendidos',
            notSuspended: 'No suspendidos',
            options: 'Opciones',
            delete: 'Eliminar',
            modify: 'Modificar',
            suspend: 'Suspender',
            idVen: 'id_ventas',
            idCli: 'id_cliente',
            idCompo: 'id_componen',
            idUsu: 'Id_usuario',
            amount: 'Monto',
            dateTime: 'FechaHora',
            canceled: 'cancelado',
            error: 'Error al buscar la venta',
            notFound: 'Venta no encontrada',
        },
        en: {
            search: 'Search...',
            all: 'All',
            suspended: 'Suspended',
            notSuspended: 'Not suspended',
            options: 'Options',
            delete: 'Delete',
            modify: 'Modify',
            suspend: 'Suspend',
            idVen: 'id_sales',
            idCli: 'id_client',
            idCompo: 'id_component',
            idUsu: 'Id_user',
            amount: 'Amount',
            dateTime: 'DateTime',
            canceled: 'canceled',
            error: 'Error searching sale',
            notFound: 'Sale not found',
        }
    }

    const language = session?.user?.Idioma === 2 ? 'en' : 'es';
    const t = texts[language];

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
                setError(t.notFound);
                setVentas([]);
                alert(t.notFound);
            }
        } catch (err) {
            setError(t.error + error);
            setVentas([]);
            alert(t.error + err);
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
        if (filter === t.all) return true;
        if (filter === t.notSuspended) return venta.cancelado === 'N';
        if (filter === t.suspended) return venta.cancelado !== 'N';
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
                    <a className="btn" onClick={handleGet}>{t.search}</a>
                </div>
                <FormVenta />
                <select className="filtro" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option>{t.all}</option>
                    <option>{t.notSuspended}</option>
                    <option>{t.suspend}</option>
                </select>
                <table className="table">
                    <thead>
                        <tr>
                            <th>{t.idVen}</th>
                            <th>{t.idCli}</th>
                            <th>{t.idCompo}</th>
                            <th>{t.idUsu}</th>
                            <th>{t.amount}</th>
                            <th>{t.dateTime}</th>
                            <th>{t.canceled}</th>
                            <th>{t.options}</th>
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
                                            <a className="btn btn2" onClick={() => handleDelete(venta.id_ventas)}>{t.delete}</a>
                                            <a className="btn btn2" onClick={() => handleEdit(venta.id_ventas)}>{t.modify}</a>
                                            <a className="btn btn2" onClick={() => handleSuspend(venta.id_ventas, venta.cancelado)}>{t.suspend}</a>
                                        </span>
                                    </td>
                                )}
                                {session?.user?.nivel !== 1 && (
                                <td>
                                    <span className="btn-group">
                                        <a className="btn btn2" onClick={() => handleSuspend(venta.id_ventas, venta.cancelado)}>{t.suspend}</a>
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