'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

async function getUsuario(id) {
    const res = await fetch(`http://localhost:3000/api/note/${id}?table=usuarios`, {
        method: 'GET',
    });
    if (!res.ok) {
        throw new Error('Error al obtener los datos del usuario');
    }
    return res.json();
}

async function updateUsuario(id, data) {
    const res = await fetch(`http://localhost:3000/api/note/${id}?table=usuarios`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error('Error al actualizar los datos del usuario');
    }
    return res.json();
}

const EditUsuario = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [usuario, setUsuario] = useState(null);
    const [formData, setFormData] = useState({
        Usuario: '',
        Cuenta: '',
        nivel: '',
        Idioma: '',
        activo: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            async function fetchUsuario() {
                try {
                    const data = await getUsuario(id);
                    setUsuario(data.record);
                    setFormData({
                        Usuario: data.record.Usuario || '',
                        Cuenta: data.record.Cuenta || '',
                        Clave: data.record.Clave || '',
                        nivel: data.record.nivel || '',
                        Idioma: data.record.Idioma || '',
                        activo: data.record.activo || '',
                    });
                } catch (err) {
                    setError(err.message);
                }
            }
            fetchUsuario();
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
            await updateUsuario(id, formData);
            router.push('/');
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!usuario) return <div>Cargando...</div>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Usuario:</label>
                <input type="text" name="Usuario" value={formData.Usuario} onChange={handleChange} />
            </div>
            <div>
                <label>Cuenta:</label>
                <input type="text" name="Cuenta" value={formData.Cuenta} onChange={handleChange} />
            </div>
            <div>
                <label>Nivel:</label>
                <input type="text" name="nivel" value={formData.nivel} onChange={handleChange} />
            </div>
            <div>
                <label>Idioma:</label>
                <input type="text" name="Idioma" value={formData.Idioma} onChange={handleChange} />
            </div>
            <div>
                <label>Activo:</label>
                <input type="text" name="activo" value={formData.activo} onChange={handleChange} />
            </div>
            <button type="submit">Guardar cambios</button>
        </form>
    );
};

export default EditUsuario;