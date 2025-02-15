import React, { useEffect, useState } from 'react';
import { FormVenta } from '@/components/FormVenta';

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

export function Ventas() {
    const [ventas, setVentas] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [error, setError] = useState(null);

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
            setError('Error al buscar la venta');
            setVentas([]);
            alert('Error al buscar la venta'+err+{error});
        }
    };

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
                        {ventas.map((venta) => (
                            <tr key={venta.id_ventas}>
                                <td>{venta.id_ventas}</td>
                                <td>{venta.id_cliente}</td>
                                <td>{venta.id_componen}</td>
                                <td>{venta.Id_usuario}</td>
                                <td>{venta.Monto}</td>
                                <td>{venta.FechaHora}</td>
                                <td>{venta.cancelado}</td>
                                <td>
                                    <span className="btn-group">
                                        <a className="btn btn2" onClick={() => handleDelete(venta.id_ventas)}>Eliminar</a>
                                        <a className="btn btn2">Modificar</a>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}