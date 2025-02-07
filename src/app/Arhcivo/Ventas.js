import React from 'react';

export const Ventas = () => {
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
                            <th>id_ventas</th>
                            <th>id_Cliente</th>
                            <th>id_componente</th>
                            <th>Monto</th>
                            <th>FechaHora</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1000</td>
                            <td>2021-10-01 10:00:00</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>2</td>
                            <td>2</td>
                            <td>2000</td>
                            <td>2021-10-02 11:00:00</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>3</td>
                            <td>3</td>
                            <td>3000</td>
                            <td>2021-10-03 12:00:00</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>4</td>
                            <td>4</td>
                            <td>4000</td>
                            <td>2021-10-04 13:00:00</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5000</td>
                            <td>2021-10-05 14:00:00</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="form">
                    <label class="label">id_ventas</label>
                        <input class="inpt-tabla"></input>
                    <label class="label">id_Cliente</label>
                        <input class="inpt-tabla"></input>
                    <label class="label">id_componente</label>
                        <input class="inpt-tabla"></input>
                    <label class="label">Monto</label>
                        <input class="inpt-tabla"></input>
                    <label class="label">FechaHora</label>
                        <input class="inpt-tabla inpt-grande"></input>
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