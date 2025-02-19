import React, { useState } from 'react';
// import { PantallaPrincipal } from "../PantallaPrincipal";
import { RepVentas } from '../Reporte/RepVentas';
import { RepClientes } from '../Reporte/RepClientes';
import { RepComponentes } from '../Reporte/RepComponentes';
import { RepUsuarios } from '../Reporte/RepUsuarios';
import { RepVenCompo } from '../Reporte/RepVenCompo';
import { RepVenCli } from '../Reporte/RepVenCli';
import { RepVenUsu } from '../Reporte/RepVenUsu';

export const Reportes = () => {
    const [activeComponent, setActiveComponent] = useState(null);
    
    const renderComponent = () => {
    switch (activeComponent) {
        case 'repVentas':
            return <RepVentas />;

        case 'repClientes':
            return <RepClientes />;

        case 'repComponentes':
            return <RepComponentes />;

        case 'repUsuarios':
            return <RepUsuarios />;

        case 'repVenCompo':
            return <RepVenCompo />;

        case 'repVenCli':
            return <RepVenCli />;

        case 'repVenUsu':
            return <RepVenUsu />;

    }
    };
    return (
        <>
            <div className="menu">
                <div className="mini-menu">
                    <a href="#" onClick={() => setActiveComponent('repVentas')}>Ventas</a>
                </div>
                <div className="mini-menu">
                    <a href="#" onClick={() => setActiveComponent('repClientes')}>Clientes</a>
                </div>
                <div className="mini-menu">
                    <a href="#" onClick={() => setActiveComponent('repComponentes')}>Componentes</a>
                </div>
                <div className="mini-menu">
                    <a href="#" onClick={() => setActiveComponent('repUsuarios')}>Usuarios</a>
                </div>
                <div className="mini-menu">
                    <a href="#" onClick={() => setActiveComponent('repVenCli')}>Ventas por Cliente</a>
                </div>
                <div className="mini-menu">
                    <a href="#" onClick={() => setActiveComponent('repVenCompo')}>Ventas por Componente</a>
                </div>
                <div className="mini-menu">
                    <a href="#" onClick={() => setActiveComponent('repVenUsu')}>Ventas por Usuario</a>
                </div>
            </div>

            <section className="main">
                {renderComponent()}
            </section>
        </>
    );
};