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
        Clave: '',
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
        <div className="form-container">
            <h1>Modificar Usuario</h1>
            <form className="form-modi" onSubmit={handleSubmit}>

                <div className="form-fields">
                    <div className="form-row">
                        <label>Usuario:</label>
                        <input
                            type="text"
                            name="Usuario"
                            placeholder="Usuario..."
                            value={formData.Usuario}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label>Cuenta:</label>
                        <input
                            type="text"
                            name="Cuenta"
                            placeholder="Cuenta..."
                            value={formData.Cuenta}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label>Clave:</label>
                        <input
                            type="password"
                            name="Clave"
                            placeholder="Clave..."
                            value={formData.Clave}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label>Nivel:</label>
                        <input
                            type="text"
                            name="nivel"
                            placeholder="Nivel..."
                            value={formData.nivel}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label>Idioma:</label>
                        <input
                            type="text"
                            name="Idioma"
                            placeholder="Idioma..."
                            value={formData.Idioma}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label>Activo:</label>
                        <input
                            type="text"
                            name="activo"
                            placeholder="Activo..."
                            value={formData.activo}
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

export default EditUsuario;