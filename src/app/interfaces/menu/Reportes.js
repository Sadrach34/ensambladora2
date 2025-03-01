import React, { useState } from 'react';
import { RepVentas } from '../Reporte/RepVentas';
import { RepClientes } from '../Reporte/RepClientes';
import { RepComponentes } from '../Reporte/RepComponentes';
import { RepUsuarios } from '../Reporte/RepUsuarios';
import { RepVenCompo } from '../Reporte/RepVenCompo';
import { RepVenCli } from '../Reporte/RepVenCli';
import { RepVenUsu } from '../Reporte/RepVenUsu';
import { useSession } from 'next-auth/react';

export const Reportes = () => {
    const [activeComponent, setActiveComponent] = useState(null);
    const { data: session } = useSession();
        
            const texts = {
                es: {
                    repVentas: 'Ventas',
                    repClientes: 'Clientes',
                    repComponentes: 'Componentes',
                    repUsuarios: 'Usuarios',
                    repVenCompo: 'Ventas por Componente',
                    repVenCli: 'Ventas por Cliente',
                    repVenUsu: 'Ventas por Usuario'
                },
                en: {
                    repVentas: 'Sales',
                    repClientes: 'Customers',
                    repComponentes: 'Components',
                    repUsuarios: 'Users',
                    repVenCompo: 'Sales by Component',
                    repVenCli: 'Sales by Customer',
                    repVenUsu: 'Sales by User'
                }
            }
        
        const language = session?.user?.Idioma === 2 ? 'en' : 'es';
        const t = texts[language];
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
                    <a href="#" onClick={() => setActiveComponent('repVentas')}>{t.repVentas}</a>
                </div>
                <div className="mini-menu">
                    <a href="#" onClick={() => setActiveComponent('repClientes')}>{t.repClientes}</a>
                </div>
                <div className="mini-menu">
                    <a href="#" onClick={() => setActiveComponent('repComponentes')}>{t.repComponentes}</a>
                </div>
                <div className="mini-menu">
                    <a href="#" onClick={() => setActiveComponent('repUsuarios')}>{t.repUsuarios}</a>
                </div>
                <div className="mini-menu">
                    <a href="#" onClick={() => setActiveComponent('repVenCli')}>{t.repVenCompo}</a>
                </div>
                <div className="mini-menu">
                    <a href="#" onClick={() => setActiveComponent('repVenCompo')}>{t.repVenCli}</a>
                </div>
                <div className="mini-menu">
                    <a href="#" onClick={() => setActiveComponent('repVenUsu')}>{t.repVenUsu}</a>
                </div>
            </div>

            <section className="main">
                {renderComponent()}
            </section>
        </>
    );
};