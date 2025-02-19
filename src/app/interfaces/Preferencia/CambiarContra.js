import React from 'react'
import { PantallaPrincipal } from "../../PantallaPrincipal";

export const CambiarContra = () => {
    return (
        <div className="preferencias">
            <div className="">
                <h1>Cambiar Contraseña</h1>
                <h3>Introduce tu contraseña actual:</h3>
                <input className="inpIdio" type="password" placeholder="Contraseña actual"></input>
            </div>

            <div className="">
                <h3>Introduce la contraseña nueva:</h3>
                <input className="inpIdio" type="password" placeholder="Contraseña nueva"></input>
                <h3>Repite la contraseña nueva:</h3>
                <input className="inpIdio" type="password" placeholder="Repetir contraseña"></input>
            </div>

            <div>
                <button className="btnIdio">Cambiar</button>
                <button className="btnIdio" onClick={() => {PantallaPrincipal()}}>Volver</button>
            </div>
        </div>
)
}