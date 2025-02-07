import React from 'react';

export const Usuarios = () => {
    return (
        <>
            <div className="Archivo">
                <div className="busqueda">
                    <input className="buscar"></input>
                    <a className="btn">Buscar</a>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>id_usuario</th>
                            <th>Usuario</th>
                            <th>Cuenta</th>
                            <th>Clave</th>
                            <th>Nivel</th>
                            <th>Idioma</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                            <td>1</td>
                            <td>Juan Pérez</td>
                            <td>jperez</td>
                            <td>********</td>
                            <td>Administrador</td>
                            <td>Español</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>María López</td>
                            <td>mlopez</td>
                            <td>********</td>
                            <td>Usuario</td>
                            <td>Inglés</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Carlos García</td>
                            <td>cgarcia</td>
                            <td>********</td>
                            <td>Moderador</td>
                            <td>Francés</td>
                        </tr>
                    </tbody>
                </table>
                
                <div className="form">
                    <label className="label">id_usuario</label>
                        <input className="inpt-tabla"></input>
                    <label className="label">Usuario</label>
                        <input className="inpt-tabla"></input>
                    <label className="label">Cuenta</label>
                        <input className="inpt-tabla "></input>
                    <label className="label">Clave</label>
                        <button className="inpt-tabla inpt-grande3">reiniciar contraseña</button>
                    <label className="label">Nivel</label>
                        <input className="inpt-tabla "></input>
                    <label className="label">Idioma</label>
                        <input className="inpt-tabla "></input>
                </div>

                <div className="btn-group">
                    <a className="btn btn2">Agregar</a>
                    <a className="btn btn2">Eliminar</a>
                    <a className="btn btn2">Modificar</a>
                    <a className="btn btn2">Salir</a>
                </div>
            </div>
        </>
    );
}