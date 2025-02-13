import React, { useEffect, useState } from 'react';
import { FormVenta } from '@/components/FormVenta';

async function getVentas() {
    const res = await fetch('http://localhost:3000/api/note/ventas');
    const data = await res.json();
    return data;
}

export function Ventas() {
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
                <div className="busqueda">
                    <input className="buscar"></input>
                    <a className="btn">Buscar</a>
                </div>
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
                    <FormVenta></FormVenta>
                </div>
            </div>
        </>
    );
}