import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormUsuario } from '@/components/FormUsuarios';
import { useSession } from 'next-auth/react';

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

async function updateUsuarioActivo(id, activo) {
    const res = await fetch('/api/note/upSuspendido', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, table: 'usuarios', field: 'activo', value: activo }),
    });
    return res.json();
}

export const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('Todos');
    const router = useRouter();
    const { data: session } = useSession();

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
            alert('Error al buscar el usuario: ' + err);
        }
    }

    const handleEdit = (id) => {
        router.push(`/interfaces/Archivo/EditUsuario?id=${id}`);
    }

    const handleSuspend = async (id, currentStatus) => {
        const newStatus = currentStatus === 'S' ? 'N' : 'S';
        await updateUsuarioActivo(id, newStatus);
        setUsuarios((prevUsuarios) =>
            prevUsuarios.map((usuario) =>
                usuario.Id_usuario === id ? { ...usuario, activo: newStatus } : usuario
            )
        );
    };

    const filteredUsuarios = usuarios.filter((usuario) => {
        if (filter === 'Todos') return true;
        if (filter === 'No suspendidos') return usuario.activo === 'S';
        if (filter === 'Suspendidos') return usuario.activo !== 'S';
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
                <FormUsuario />
                <select className="filtro" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option>Todos</option>
                    <option>No suspendidos</option>
                    <option>Suspendidos</option>
                </select>
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
                        {filteredUsuarios.map((usuario) => (
                            <tr key={usuario.Id_usuario}>
                                <td>{usuario.Id_usuario}</td>
                                <td>{usuario.Usuario}</td>
                                <td>{usuario.Cuenta}</td>
                                <td>{usuario.Clave}</td>
                                <td>{usuario.nivel}</td>
                                <td>{usuario.Idioma}</td>
                                <td>{usuario.activo}</td>
                                {session?.user?.nivel === 1 && (
                                    <td>
                                        <span className="btn-group">
                                            <a className="btn btn2" onClick={() => handleDelete(usuario.Id_usuario)}>Eliminar</a>
                                            <a className="btn btn2" onClick={() => handleEdit(usuario.Id_usuario)}>Modificar</a>
                                            <a className="btn btn2" onClick={() => handleSuspend(usuario.Id_usuario, usuario.activo)}>Suspender</a>
                                        </span>
                                    </td>
                                )}
                                {session?.user?.nivel !== 1 && (
                                <td>
                                    <span className="btn-group">
                                        <a className="btn btn2" onClick={() => handleSuspend(usuario.Id_usuario, usuario.activo)}>Suspender</a>
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