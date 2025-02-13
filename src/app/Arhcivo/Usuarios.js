import React, { useEffect, useState } from 'react';

async function getUsuarios() {
    const res = await fetch('http://localhost:3000/api/note/usuarios');
    const data = await res.json();
    return data;
}

export const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const data = await getUsuarios();
            setUsuarios(data);
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
                            <th>id_usuario</th>
                            <th>Usuario</th>
                            <th>Cuenta</th>
                            <th>Clave</th>
                            <th>Nivel</th>
                            <th>Idioma</th>
                            <th>activo</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.Id_usuario}>
                                <td>{usuario.Id_usuario}</td>
                                <td>{usuario.Usuario}</td>
                                <td>{usuario.Cuenta}</td>
                                <td>{usuario.Clave}</td>
                                <td>{usuario.nivel}</td>
                                <td>{usuario.Idioma}</td>
                                <td>{usuario.activo}</td>
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
                </div>
            </div>
        </>
    );
}