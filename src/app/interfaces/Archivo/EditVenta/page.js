'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

async function getVenta(id) {
    const res = await fetch(`http://localhost:3000/api/note/${id}?table=ventas`, {
        method: 'GET',
    });
    if (!res.ok) {
        throw new Error('Error al obtener los datos de la venta');
    }
    return res.json();
}

async function updateVenta(id, data) {
    const res = await fetch(`http://localhost:3000/api/note/${id}?table=ventas`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error('Error al actualizar los datos de la venta');
    }
    return res.json();
}

const EditVenta = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [venta, setVenta] = useState(null);
    const [formData, setFormData] = useState({
        id_cliente: '',
        id_componen: '',
        Id_usuario: '',
        Monto: '',
        FechaHora: '',
        cancelado: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            async function fetchVenta() {
                try {
                    const data = await getVenta(id);
                    setVenta(data.record);
                    setFormData({
                        id_cliente: data.record.id_cliente || '',
                        id_componen: data.record.id_componen || '',
                        Id_usuario: data.record.Id_usuario || '',
                        Monto: data.record.Monto || '',
                        FechaHora: data.record.FechaHora || '',
                        cancelado: data.record.cancelado || '',
                    });
                } catch (err) {
                    setError(err.message);
                }
            }
            fetchVenta();
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
            await updateVenta(id, formData);
            router.push('/');
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!venta) return <div>Cargando...</div>;

    return (
        <div className="form-container">
            <h1>Modificar Venta</h1>
            <form className="form-modi" onSubmit={handleSubmit}>

                <div className="form-fields">
                    <div className="form-row">
                        <label>Cliente ID:</label>
                        <input
                            type="text"
                            name="id_cliente"
                            placeholder="Cliente ID..."
                            value={formData.id_cliente}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label>Componente ID:</label>
                        <input
                            type="text"
                            name="id_componen"
                            placeholder="Componente ID..."
                            value={formData.id_componen}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label>Usuario ID:</label>
                        <input
                            type="text"
                            name="Id_usuario"
                            placeholder="Usuario ID..."
                            value={formData.Id_usuario}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label>Monto:</label>
                        <input
                            type="text"
                            name="Monto"
                            placeholder="Monto..."
                            value={formData.Monto}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label>Fecha y Hora:</label>
                        <input
                            type="text"
                            name="FechaHora"
                            placeholder="Fecha y Hora..."
                            value={formData.FechaHora}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label>Cancelado:</label>
                        <input
                            type="text"
                            name="cancelado"
                            placeholder="Cancelado..."
                            value={formData.cancelado}
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

export default EditVenta;