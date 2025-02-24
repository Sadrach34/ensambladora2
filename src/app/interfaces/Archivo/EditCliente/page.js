'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

async function getCliente(id) {
    const res = await fetch(`http://localhost:3000/api/note/${id}?table=clientes`, {
        method: 'GET',
    });
    if (!res.ok) {
        throw new Error('Error al obtener los datos del cliente');
    }
    return res.json();
}

async function updateCliente(id, data) {
    const res = await fetch(`http://localhost:3000/api/note/${id}?table=clientes`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error('Error al actualizar los datos del cliente');
    }
    return res.json();
}

const EditCliente = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [cliente, setCliente] = useState(null);
    const [formData, setFormData] = useState({
        cliente: '',
        Celular: '',
        Domicilio: '',
        suspendido: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            async function fetchCliente() {
                try {
                    const data = await getCliente(id);
                    setCliente(data.record);
                    setFormData({
                        cliente: data.record.cliente || '',
                        Celular: data.record.Celular || '',
                        Domicilio: data.record.Domicilio || '',
                        suspendido: data.record.suspendido || '',
                    });
                } catch (err) {
                    setError(err.message);
                }
            }
            fetchCliente();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCliente(id, formData);
            router.push('/');
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!cliente) return <div>Cargando...</div>;

    return (
        <div className="form-container">
            <h1>Modificar Cliente</h1>
            <form className="form-modi" onSubmit={handleSubmit}>
                <div className="image-container">
                    <Image src="/logo.png" alt="Descripción de la imagen" width={250} height={250} />
                    <input type="file" accept="image/*" />
                </div>

                <div className="form-fields">
                    <div className="form-row">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="cliente"
                            placeholder="Nombre..."
                            value={formData.cliente}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label>Celular:</label>
                        <input
                            type="text"
                            name="Celular"
                            placeholder="Celular..."
                            value={formData.Celular}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <label>Domicilio:</label>
                        <input
                            type="text"
                            name="Domicilio"
                            placeholder="Domicilio..."
                            value={formData.Domicilio}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <label>Suspendido:</label>
                        <input
                            type="text"
                            name="suspendido"
                            placeholder="Suspendido..."
                            value={formData.suspendido}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-buttons">
                    <button type="submit" name="modificar">Modificar</button>
                    <button type="button">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default EditCliente;