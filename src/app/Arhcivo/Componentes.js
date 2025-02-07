import React from 'react';

export const Componentes = () => {
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
                
                <div className="form">
                    <label className="label">id_componen</label>
                        <input className="inpt-tabla"></input>

                    <label className="label">Componente</label>
                        <input className="inpt-tabla inpt-grande2"></input>

                    <label className="label">Precio</label>
                        <input className="inpt-tabla "></input>

                    <label className="label">Disponible</label>
                        <input className="inpt-tabla"></input>
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