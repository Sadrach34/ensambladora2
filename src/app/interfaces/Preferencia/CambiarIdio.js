import React, { useState } from 'react';

export const CambiarIdio = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newLanguage, setNewLanguage] = useState(1); // 1 para español por defecto

    const handleChangeLanguage = async () => {
        try {
            const response = await fetch('/api/note/upIdioma', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentPassword, newLanguage }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
                return;
            }

            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error al cambiar el idioma:', error);
            alert('Error al cambiar el idioma');
        }
    };

    return (
        <div className="preferencias">
            <div>
                <h1>Cambiar Idioma</h1>
                <h3>Introduce tu contraseña actual:</h3>
                <input
                    className="inpIdio"
                    type="password"
                    placeholder="Contraseña actual"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />

                <h3>Selecciona tu nuevo idioma:</h3>
                <select
                    className="inpIdio"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(parseInt(e.target.value))}
                >
                    <option value={1}>Español</option>
                    <option value={2}>English</option>
                </select>
            </div>
            <div>
                <button className="btnIdio" onClick={handleChangeLanguage}>Cambiar</button>
                <button className="btnIdio">Volver</button>
            </div>
        </div>
    );
};