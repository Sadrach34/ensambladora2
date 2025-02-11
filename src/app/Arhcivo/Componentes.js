import React, { useEffect, useState } from 'react';

async function getComponente() {
    const res = await fetch('http://localhost:3000/api/note/componentes');
    const data = await res.json();
    return data;
}

export const Componentes = () => {
    const [componente, setComponente] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const data = await getComponente();
            setComponente(data);
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
                            <th>id_componen</th>
                            <th>Componente</th>
                            <th>Precio</th>
                            <th>Disponible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {componente.map((componente) => (
                            <tr key={componente.id_componen}>
                                <td>{componente.id_componen}</td>
                                <td>{componente.componente}</td>
                                <td>{componente.precio}</td>
                                <td>{componente.Disponible}</td>
                                <td>{componente.baja}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <div className="form">
                    <label className="label">id_componen</label>
                        <input className="inpt-tabla"></input>

                    <label className="label">Componente</label>
                        <input className="inpt-tabla inpt-grande2"></input>

                    <label className="label">Precio</label>
                        <input className="inpt-tabla "></input>

                    <label className="label">Disponible</label>
                        <input className="inpt-tabla"></input>
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