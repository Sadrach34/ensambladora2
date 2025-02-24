import React, { useState } from 'react';
import { PantallaPrincipal } from "../../PantallaPrincipal";

export const CambiarContra = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');

    const handleChangePassword = async () => {
        if (newPassword !== repeatNewPassword) {
            alert("Las contraseñas nuevas no coinciden");
            return;
        }

        try {
            const response = await fetch('/api/note/upContra', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            alert('Error al cambiar la contraseña');
        }
    };

    return (
        <div className="preferencias">
            <div className="">
                <h1>Cambiar Contraseña</h1>
                <h3>Introduce tu contraseña actual:</h3>
                <input
                    className="inpIdio"
                    type="password"
                    placeholder="Contraseña actual"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>

            <div className="">
                <h3>Introduce la contraseña nueva:</h3>
                <input
                    className="inpIdio"
                    type="password"
                    placeholder="Contraseña nueva"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <h3>Repite la contraseña nueva:</h3>
                <input
                    className="inpIdio"
                    type="password"
                    placeholder="Repetir nueva contraseña"
                    value={repeatNewPassword}
                    onChange={(e) => setRepeatNewPassword(e.target.value)}
                />
            </div>

            <div>
                <button className="btnIdio" onClick={handleChangePassword}>Cambiar</button>
                <button className="btnIdio" onClick={() => { PantallaPrincipal() }}>Volver</button>
            </div>
        </div>
    );
};