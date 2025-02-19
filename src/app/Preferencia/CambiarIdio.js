import React from 'react'

export const CambiarIdio = () => {
    return (
        <div className="preferencias">
            <div >
                <h1>Cambiar Idioma</h1>
                <h3>Introduce tu contraseña actual:</h3>
                <input className="inpIdio" type="password" placeholder="Contraseña actual"></input>

                <h3>Selecciona tu nuevo idioma:</h3>
                <select className="inpIdio">
                    <option value="es">Español</option>
                    <option value="en">English</option>
                </select>
            </div>
            <div>
                <button className="btnIdio">Cambiar</button>
                <button className="btnIdio">Volver</button>
            </div>
        </div>
)}