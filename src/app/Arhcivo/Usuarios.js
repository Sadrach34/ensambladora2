import React from 'react';

export const Usuarios = () => {
    return (
        <>
            <div class="Archivo">
                <div class="busqueda">
                    <input class="buscar"></input>
                    <a class="btn">Buscar</a>
                </div>
                <table class="table">
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
                
                <div class="form">
                    <label class="label">id_usuario</label>
                        <input class="inpt-tabla"></input>
                    <label class="label">Usuario</label>
                        <input class="inpt-tabla"></input>
                    <label class="label">Cuenta</label>
                        <input class="inpt-tabla "></input>
                    <label class="label">Clave</label>
                        <button class="inpt-tabla inpt-grande3">reiniciar contraseña</button>
                    <label class="label">Nivel</label>
                        <input class="inpt-tabla "></input>
                    <label class="label">Idioma</label>
                        <input class="inpt-tabla "></input>
                </div>

                <div class="btn-group">
                    <a class="btn btn2">Agregar</a>
                    <a class="btn btn2">Eliminar</a>
                    <a class="btn btn2">Modificar</a>
                    <a class="btn btn2">Salir</a>
                </div>
            </div>
        </>
    );
}