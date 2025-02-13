import React, { useEffect, useState } from 'react';

async function getVentasUsuarios() {
    const res = await fetch('http://localhost:3000/api/note/repVenUsu');
    const data = await res.json();
    return data;
}

export const RepVenUsu = () => {
    const [ventasUsuario, setVentasUsuarios] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const data = await getVentasUsuarios();
            setVentasUsuarios(data);
        }
        fetchData();
    }, []);

    return (
        <>
            <div className="Archivo">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>id_ventas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventasUsuario.map((ventasUsuario) => (
                            <tr key={ventasUsuario.id_ventas}>
                                <td>{ventasUsuario.usuario}</td>
                                <td>{ventasUsuario.id_ventas}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}