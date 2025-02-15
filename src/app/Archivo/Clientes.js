import React, { useEffect, useState } from 'react';
import { FormCliente } from '@/components/FormClientes';

async function getClientes() {
    const res = await fetch('http://localhost:3000/api/note?table=clientes');
    const data = await res.json();
    return data;
}

async function deleteCliente(id) {
    const res = await fetch(`http://localhost:3000/api/note/${id}?table=clientes`, {
        method: 'DELETE',
    });
    return res.json();
}

async function getCliente(id) {
    const res = await fetch(`http://localhost:3000/api/note/${id}?table=clientes`, {
        method: 'GET',
    });
    return res.json();
}

export const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getClientes();
            setClientes(data);
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await deleteCliente(id);
        setClientes((prevClientes) => prevClientes.filter((cliente) => cliente.Id_cliente !== id));
    };

    const handleGet = async () => {
        try {
            const data = await getCliente(searchId);
            if (data.record) {
                setClientes([data.record]);
                setError(null);
            } else {
                setError('Cliente no encontrado');
                setClientes([]);
                alert('Cliente no encontrado');
            }
        } catch (err) {
            setError('Error al buscar el cliente');
            setClientes([]);
            alert('Error al buscar el cliente'+err+{error});
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

                <FormCliente />

                <table className="table">
                    <thead>
                        <tr>
                            <th>id_Cliente</th>
                            <th>Cliente</th>
                            <th>Celular</th>
                            <th>Domicilo</th>
                            <th>suspendido</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.Id_cliente}>
                                <td>{cliente.Id_cliente}</td>
                                <td>{cliente.cliente}</td>
                                <td>{cliente.Celular}</td>
                                <td>{cliente.Domicilio}</td>
                                <td>{cliente.suspendido}</td>
                                <td>
                                    <span className="btn-group">
                                        <a className="btn btn2" onClick={() => handleDelete(cliente.Id_cliente)}>Eliminar</a>
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