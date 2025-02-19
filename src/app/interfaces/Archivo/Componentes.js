import React, { useEffect, useState } from 'react';
import { FormComponentes } from '@/components/FormComponentes';

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

export const Componentes = () => {
    const [componentes, setComponente] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [error, setError] = useState(null);
    
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
            alert('Error al buscar el componente'+err+{error});
        }
    };

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
                        {componentes.map((componente) => (
                            <tr key={componente.id_componen}>
                                <td>{componente.id_componen}</td>
                                <td>{componente.componente}</td>
                                <td>{componente.precio}</td>
                                <td>{componente.Disponible}</td>
                                <td>{componente.baja}</td>
                                <td>
                                    <span className="btn-group">
                                        <a className="btn btn2" onClick={() => handleDelete(componente.id_componen)}>Eliminar</a>
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