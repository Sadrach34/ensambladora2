import React, { useEffect, useState } from 'react';

async function getComponente() {
    const res = await fetch('http://localhost:3000/api/note/componentes');
    const data = await res.json();
    return data;
}

export const RepComponentes = () => {
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
            </div>
        </>
    );
}