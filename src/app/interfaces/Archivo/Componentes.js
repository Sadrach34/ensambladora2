import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormComponentes } from '@/components/FormComponentes';
import { useSession } from 'next-auth/react';

async function getComponente() {
    const res = await fetch('http://localhost:3000/api/note?table=componentes');
    const data = await res.json();
    return data;
}

async function deleteComponente(id) {
    const res = await fetch(`http://localhost:3000/api/note/${id}?table=componentes`, {
        method: 'DELETE',
    });
    return res.json();
}

async function getComponent(id) {
    const res = await fetch(`http://localhost:3000/api/note/${id}?table=componentes`, {
        method: 'GET',
    });
    return res.json();
}

async function updateComponenteBaja(id, baja) {
    const res = await fetch('/api/note/upSuspendido', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, table: 'componentes', field: 'baja', value: baja }),
    });
    return res.json();
}

export const Componentes = () => {
    const [componentes, setComponente] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('Todos');
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        async function fetchData() {
            const data = await getComponente();
            setComponente(data);
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await deleteComponente(id);
        setComponente((prevComponentes) => prevComponentes.filter((componente) => componente.id_componen !== id));
    };

    const handleGet = async () => {
        try {
            const data = await getComponent(searchId);
            if (data.record) {
                setComponente([data.record]);
                setError(null);
            } else {
                setError('Componente no encontrado');
                setComponente([]);
                alert('Componente no encontrado');
            }
        } catch (err) {
            setError('Error al buscar el componente');
            setComponente([]);
            alert('Error al buscar el componente' + err + { error });
        }
    };

    const handleEdit = (id) => {
        router.push(`/interfaces/Archivo/EditCompo?id=${id}`);
    };

    const handleSuspend = async (id, currentStatus) => {
        const newStatus = currentStatus === 'S' ? 'N' : 'S';
        await updateComponenteBaja(id, newStatus);
        setComponente((prevComponentes) =>
            prevComponentes.map((componente) =>
                componente.id_componen === id ? { ...componente, baja: newStatus } : componente
            )
        );
    };

    const filteredComponentes = componentes.filter((componente) => {
        if (filter === 'Todos') return true;
        if (filter === 'No suspendidos') return componente.baja === 'N';
        if (filter === 'Suspendidos') return componente.baja !== 'N';
        return true;
    });

    return (
        <>
            <div className="Archivo">
                <div className="busqueda">
                    <input
                        className="buscar"
                        type="text"
                        placeholder="Buscar..."
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                    <a className="btn" onClick={handleGet}>Buscar</a>
                </div>
                <FormComponentes />
                <select className="filtro" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option>Todos</option>
                    <option>No suspendidos</option>
                    <option>Suspendidos</option>
                </select>
                <table className="table">
                    <thead>
                        <tr>
                            <th>id_componen</th>
                            <th>Componente</th>
                            <th>Precio</th>
                            <th>Disponible</th>
                            <th>baja</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredComponentes.map((componente) => (
                            <tr key={componente.id_componen}>
                                <td>{componente.id_componen}</td>
                                <td>{componente.componente}</td>
                                <td>{componente.precio}</td>
                                <td>{componente.Disponible}</td>
                                <td>{componente.baja}</td>
                                {session?.user?.nivel === 1 && (
                                    <td>
                                        <span className="btn-group">
                                            <a className="btn btn2" onClick={() => handleDelete(componente.id_componen)}>Eliminar</a>
                                            <a className="btn btn2" onClick={() => handleEdit(componente.id_componen)}>Modificar</a>
                                            <a className="btn btn2" onClick={() => handleSuspend(componente.id_componen, componente.baja)}>Suspender</a>
                                        </span>
                                    </td>
                                )}
                                {session?.user?.nivel !== 1 && (
                                    <td>
                                        <span className="btn-group">
                                            <a className="btn btn2" onClick={() => handleSuspend(componente.id_componen, componente.baja)}>Suspender</a>
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
};