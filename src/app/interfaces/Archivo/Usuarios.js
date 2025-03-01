import React, { useEffect, useState } from 'react';
import { FormUsuario } from '@/components/FormUsuarios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
    
        const texts = {
            es: {
                title: 'Usuarios',
                search: 'Buscar...',
                all: 'Todos',
                suspended: 'Suspendidos',
                notSuspended: 'No suspend',
                notFound: 'Usuario no encontrado',
                error: 'Error al buscar el usuario',
                id: 'id_usuario',
                user: 'Usuario',
                account: 'Cuenta',
                password: 'Clave',
                level: 'Nivel',
                language: 'Idioma',
                asset: 'activo',
                options: 'Opciones',
                delete: 'Eliminar',
                modify: 'Modificar',
                suspend: 'Suspender'
            },
            en: {
                title: 'Users',
                search: 'Search...',
                all: 'All',
                suspended: 'Suspended',
                notSuspended: 'Not suspended',
                notFound: 'User not found',
                error: 'Error searching the user',
                id: 'id_user',
                user: 'User',
                account: 'Account',
                password: 'Password',
                level: 'Level',
                language: 'Language',
                asset: 'asset',
                options: 'Options',
                delete: 'Delete',
                modify: 'Modify',
                suspend: 'Suspend'
            }
        }
    
        const language = session?.user?.Idioma === 2 ? 'en' : 'es';
        const t = texts[language];

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
                setError(t.notFound);
                setUsuarios([]);
                alert(t.notFound);
            }
        } catch (err) {
            setError(t.error);
            setUsuarios([]);
            alert(t.error + err);
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
        if (filter === t.all) return true;
        if (filter === t.notSuspended) return usuario.activo === 'S';
        if (filter === t.suspend) return usuario.activo !== 'S';
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
                <FormUsuario />
                <select className="filtro" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option>{t.all}</option>
                    <option>{t.notSuspended}</option>
                    <option>{t.suspend}</option>
                </select>
                <table className="table">
                    <thead>
                        <tr>
                            <th>{t.id}</th>
                            <th>{t.user}</th>
                            <th>{t.account}</th>
                            <th>{t.password}</th>
                            <th>{t.level}</th>
                            <th>{t.language}</th>
                            <th>{t.asset}</th>
                            <th>{t.options}</th>
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
                                            <a className="btn btn2" onClick={() => handleDelete(usuario.Id_usuario)}>{t.delete}</a>
                                            <a className="btn btn2" onClick={() => handleEdit(usuario.Id_usuario)}>{t.modify}</a>
                                            <a className="btn btn2" onClick={() => handleSuspend(usuario.Id_usuario, usuario.activo)}>{t.suspended}</a>
                                        </span>
                                    </td>
                                )}
                                {session?.user?.nivel !== 1 && (
                                <td>
                                    <span className="btn-group">
                                        <a className="btn btn2" onClick={() => handleSuspend(usuario.Id_usuario, usuario.activo)}>{t.suspended}</a>
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