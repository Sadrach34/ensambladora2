import React from 'react';

export const Componentes = () => {
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
                            <th>id_componen</th>
                            <th>Componente</th>
                            <th>Precio</th>
                            <th>Disponible</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                            <td>1</td>
                            <td>Procesador Intel Core i7</td>
                            <td>$300</td>
                            <td>Sí</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Memoria RAM 16GB DDR4</td>
                            <td>$150</td>
                            <td>Sí</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Disco Duro SSD 1TB</td>
                            <td>$120</td>
                            <td>No</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="form">
                    <label class="label">id_componen</label>
                        <input class="inpt-tabla"></input>

                    <label class="label">Componente</label>
                        <input class="inpt-tabla inpt-grande2"></input>

                    <label class="label">Precio</label>
                        <input class="inpt-tabla "></input>

                    <label class="label">Disponible</label>
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