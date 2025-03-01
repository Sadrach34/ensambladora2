'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
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
    const { data: session } = useSession();

    const texts = {
        es: {
            title: 'Modificar Cliente',
            name: 'Nombre:',
            phone: 'Celular:',
            address: 'Domicilio:',
            suspended: 'Suspendido:',
            modify: 'Modificar:',
            cancel: 'Cancelar:',
        },
        en: {
            title: 'Edit Client',
            name: 'Name:',
            phone: 'Phone:',
            address: 'Address:',
            suspended: 'Suspended:',
            modify: 'Modify:',
            cancel: 'Cancel:',
        }
    }

    const language = session?.user?.Idioma === 2 ? 'en' : 'es';
    const t = texts[language];

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

    const handleCancel = () => {
        router.push('/');
    }

    // const renderComponent = () => {
    //     switch (activeComponent) {
    //       case 'archivo':
    //         return <Archivo />;
    
    //       case 'reportes':
    //         return <Reportes />;
    
    //       case 'preferencias':
    //         return <Preferencias />;
    
    //       default:
    //         return <PantallaPrincipal />;
    //     }
    // };

    return (
        <div className="form-container">
            <h1>{t.title}</h1>
            <form className="form-modi" onSubmit={handleSubmit}>
                <div className="image-container">
                    <Image src="/logo.png" alt="Descripción de la imagen" width={250} height={250} />
                    <input type="file" accept="image/*" />
                </div>

                <div className="form-fields">
                    <div className="form-row">
                        <label>{t.name}</label>
                        <input
                            type="text"
                            name="cliente"
                            placeholder="Nombre..."
                            value={formData.cliente}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label>{t.phone}</label>
                        <input
                            type="text"
                            name="Celular"
                            placeholder="Celular..."
                            value={formData.Celular}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <label>{t.address}</label>
                        <input
                            type="text"
                            name="Domicilio"
                            placeholder="Domicilio..."
                            value={formData.Domicilio}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <label>{t.suspended}</label>
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
                    <button type="submit" name="modificar">{t.modify}</button>
                    <button type="button" onClick={handleCancel}>{t.cancel}</button>
                </div>
            </form>
        </div>
    );
};

export default EditCliente;