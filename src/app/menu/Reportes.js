import React, { useState } from 'react';
import { PantallaPrincipal } from "../PantallaPrincipal";
import { RepVentas } from '../Reporte/RepVentas';
import { Repclientes } from '../Reporte/RepClientes';
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

        case 'repclientes':
            return <Repclientes />;

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



        case 'index':
            return <PantallaPrincipal />;
    }
    };
    return (
        <>
            <div class="menu">
                <a href="#" onClick={() => setActiveComponent('repVentas')}>Ventas</a>
                <a href="#" onClick={() => setActiveComponent('repClientes')}>Clientes</a>
                <a href="#" onClick={() => setActiveComponent('repComponentes')}>Componentes</a>
                <a href="#" onClick={() => setActiveComponent('repUsuarios')}>Usuarios</a>
                <a href="#" onClick={() => setActiveComponent('repVenCompo')}>Ventas por Cliente</a>
                <a href="#" onClick={() => setActiveComponent('repVenCli')}>Ventas por Componente</a>
                <a href="#" onClick={() => setActiveComponent('repVenUsu')}>Ventas por Usuario</a>
            </div>

            <section class="main">
                {renderComponent()}
            </section>
        </>
    );
};