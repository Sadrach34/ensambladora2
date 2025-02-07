import React from 'react';

export const RepClientes = () => {
    return (
        <>
            <div className="Archivo">
                <table className="table">
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
                
                <div className="form">
                    <label className="label">id_Cliente</label>
                        <input className="inpt-tabla"></input>

                    <label className="label">Celular</label>
                        <input className="inpt-tabla"></input>

                    <label className="label">Cliente</label>
                        <input className="inpt-tabla inpt-grande2"></input>

                    <label className="label">Domicilo</label>
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