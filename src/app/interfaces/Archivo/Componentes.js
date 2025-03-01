import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FormComponentes } from '@/components/FormComponentes';
import { title } from 'process';

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

    const texts = {
        es: {
            title: 'Componentes',
            search: 'Buscar...',
            all: 'Todos',
            suspended: 'Suspendidos',
            notSuspended: 'No suspend',
            notFound: 'Componente no encontrado',
            error: 'Error al buscar el componente',
            id: 'id_componen',
            component: 'Componente',
            price: 'Precio',
            available: 'Disponible',
            suspended: 'baja',
            options: 'Opciones',
            delete: 'Eliminar',
            modify: 'Modificar',
            suspend: 'Suspender'
        },
        en: {
            title: 'Components',
            search: 'Search...',
            all: 'All',
            suspended: 'Suspended',
            notSuspended: 'Not suspended',
            notFound: 'Component not found',
            error: 'Error searching component',
            id: 'id_componen',
            component: 'Component',
            price: 'Price',
            available: 'Available',
            suspended: 'baja',
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
                setError(t.notFound);
                setComponente([]);
                alert(t.notFound);
            }
        } catch (err) {
            setError(t.error);
            setComponente([]);
            alert(t.error + err + { error });
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
        if (filter === t.all) return true;
        if (filter === t.notSuspended) return componente.baja === 'N';
        if (filter === t.suspend) return componente.baja !== 'N';
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
                    <a className="btn" onClick={handleGet}>{t.search}</a>
                </div>
                <FormComponentes />
                <select className="filtro" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option>{t.all}</option>
                    <option>{t.notSuspended}</option>
                    <option>{t.suspend}</option>
                </select>
                <table className="table">
                    <thead>
                        <tr>
                            <th>{t.id}</th>
                            <th>{t.component}</th>
                            <th>{t.price}</th>
                            <th>{t.available}</th>
                            <th>{t.suspend}</th>
                            <th>{t.options}</th>
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
                                            <a className="btn btn2" onClick={() => handleDelete(componente.id_componen)}>{t.delete}</a>
                                            <a className="btn btn2" onClick={() => handleEdit(componente.id_componen)}>{t.modify}</a>
                                            <a className="btn btn2" onClick={() => handleSuspend(componente.id_componen, componente.baja)}>{t.suspend}</a>
                                        </span>
                                    </td>
                                )}
                                {session?.user?.nivel !== 1 && (
                                    <td>
                                        <span className="btn-group">
                                            <a className="btn btn2" onClick={() => handleSuspend(componente.id_componen, componente.baja)}>{t.suspend}</a>
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