import React, { useEffect, useState } from 'react';
import { FormUsuario } from '@/components/FormUsuarios';

async function getUsuarios() {
    const res = await fetch('http://localhost:3000/api/note?table=usuarios');
    const data = await res.json();
    return data;
}

async function deleteUsuarios(id) {
    const res = await fetch(`http://localhost:3000/api/note/${id}?table=usuarios`, {
        method: 'DELETE',
    });
    return res.json();
}

async function getUsuario(id) {
    const res = await fetch(`http://localhost:3000/api/note/${id}?table=usuarios`, {
        method: 'GET',
    });
    return res.json();
}

export const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getUsuarios();
            setUsuarios(data);
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteUsuarios(id);
            setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.Id_usuario !== id));
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    };

    const handleGet = async () => {
        try {
            const data = await getUsuario(searchId);
            if (data.record) {
                setUsuarios([data.record]);
                setError(null);
            } else {
                setError('Usuario no encontrado');
                setUsuarios([]);
                alert('Usuario no encontrado');
            }
        } catch (err) {
            setError('Error al buscar el usuario');
            setUsuarios([]);
            alert('Error al buscar el usuario'+err+{error});
        }
    }

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
                <FormUsuario />
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
                                        <a className="btn btn2" onClick={() => handleDelete(usuario.Id_usuario)}>Eliminar</a>
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