import React, { useEffect, useState } from 'react';

async function getVentas() {
    const res = await fetch('http://localhost:3000/api/note');
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
                            <th>id_Cliente</th>
                            <th>id_componente</th>
                            <th>Monto</th>
                            <th>FechaHora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((venta) => (
                            <tr key={venta.id_ventas}>
                                <td>{venta.id_ventas}</td>
                                <td>{venta.id_cliente}</td>
                                <td>{venta.id_componen}</td>
                                <td>{venta.Monto}</td>
                                <td>{venta.FechaHora}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <div className="form">
                    <label className="label">id_ventas</label>
                        <input className="inpt-tabla"></input>
                    <label className="label">id_Cliente</label>
                        <input className="inpt-tabla"></input>
                    <label className="label">id_componente</label>
                        <input className="inpt-tabla"></input>
                    <label className="label">Monto</label>
                        <input className="inpt-tabla"></input>
                    <label className="label">FechaHora</label>
                        <input className="inpt-tabla inpt-grande"></input>
                </div>

                <div className="btn-group">
                    <a className="btn btn2">Agregar</a>
                    <a className="btn btn2">Eliminar</a>
                    <a className="btn btn2">Modificar</a>
                    <a className="btn btn2">Salir</a>
                </div>
            </div>
        </>
    );
}