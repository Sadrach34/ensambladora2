'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

async function getComponente(id) {
    const res = await fetch(`http://localhost:3000/api/note/${id}?table=componentes`, {
        method: 'GET',
    });
    if (!res.ok) {
        throw new Error('Error al obtener los datos del componente');
    }
    return res.json();
}

async function updateComponente(id, data) {
    const res = await fetch(`http://localhost:3000/api/note/${id}?table=componentes`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorText = await res.text();
        console.error('Error response text:', errorText);
        throw new Error(errorText || 'Error al actualizar los datos del componente');
    }
    return res.json();
}

const EditCompo = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [componente, setComponente] = useState(null);
    const [formData, setFormData] = useState({
        componente: '',
        precio: '',
        Disponible: '',
        baja: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            async function fetchComponente() {
                try {
                    const data = await getComponente(id);
                    setComponente(data.record);
                    setFormData({
                        componente: data.record.componente || '',
                        precio: data.record.precio || '',
                        Disponible: data.record.Disponible || '',
                        baja: data.record.baja || '',
                    });
                } catch (err) {
                    setError(err.message);
                }
            }
            fetchComponente();
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
            const updatedData = {
                ...formData,
                precio: Number(formData.precio),
                Disponible: Number(formData.Disponible),
            };
            console.log('Updating componente with data:', updatedData); // Log de los datos enviados
            await updateComponente(id, updatedData);
            router.push('/');
        } catch (err) {
            console.error('Error updating componente:', err); // Log del error
            setError(err.message);
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!componente) return <div>Cargando...</div>;

    return (
        <div className="form-container">
            <h1>Modificar Componente</h1>
            <form className="form-modi" onSubmit={handleSubmit}>

                <div className="form-fields">
                    <div className="form-row">
                        <label>Componente:</label>
                        <input
                            type="text"
                            name="componente"
                            placeholder="Componente..."
                            value={formData.componente}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label>Precio:</label>
                        <input
                            type="text"
                            name="precio"
                            placeholder="Precio..."
                            value={formData.precio}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <label>Disponible:</label>
                        <input
                            type="text"
                            name="Disponible"
                            placeholder="Disponible..."
                            value={formData.Disponible}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <label>Baja:</label>
                        <input
                            type="text"
                            name="baja"
                            placeholder="Baja..."
                            value={formData.baja}
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

export default EditCompo;