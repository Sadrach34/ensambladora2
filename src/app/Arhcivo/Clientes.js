import React from 'react';

export const Clientes = () => {
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
                            <th>id_Cliente</th>
                            <th>Celular</th>
                            <th>Cliente</th>
                            <th>Domicilo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>555-1234</td>
                            <td>Juan Pérez</td>
                            <td>Calle Falsa 123</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>555-5678</td>
                            <td>María López</td>
                            <td>Avenida Siempre Viva 742</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>555-8765</td>
                            <td>Carlos García</td>
                            <td>Bulevar de los Sueños Rotos 456</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="form">
                    <label class="label">id_Cliente</label>
                        <input class="inpt-tabla"></input>

                    <label class="label">Celular</label>
                        <input class="inpt-tabla"></input>

                    <label class="label">Cliente</label>
                        <input class="inpt-tabla inpt-grande2"></input>

                    <label class="label">Domicilo</label>
                        <input class="inpt-tabla"></input>
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