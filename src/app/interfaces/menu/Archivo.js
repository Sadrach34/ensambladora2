import React, { useState } from 'react';
import { Ventas } from "../Archivo/Ventas";
import { Clientes } from "../Archivo/Clientes";
import { Componentes } from "../Archivo/Componentes";
import { Usuarios } from "../Archivo/Usuarios";
import { signOut, useSession } from 'next-auth/react';

export const Archivo = () => {
    const [activeComponent, setActiveComponent] = useState(null);
    const { data: session } = useSession();
    
    const texts = {
        es: {
            ventas: 'Ventas',
            clientes: 'Clientes',
            componentes: 'Componentes',
            usuarios: 'Usuarios',
            salir: 'Salir'
        },
        en: {
            ventas: 'Sales',
            clientes: 'Clients',
            componentes: 'Components',
            usuarios: 'Users',
            salir: 'Sign out'
        }
    }
    
    const language = session?.user?.Idioma === 2 ? 'en' : 'es';
    const t = texts[language];

    const renderComponent = () => {
        switch (activeComponent) {
            case 'ventas':
                return <Ventas />;

            case 'clientes':
                return <Clientes />;

            case 'componentes':
                return <Componentes />;

            case 'usuarios':
                return <Usuarios />;
        }
    };

    return (
        <>
            <div className="menu">
                <div className="mini-menu">
                    <a href="#" onClick={() => setActiveComponent('ventas')}>{t.ventas}</a>
                </div>
                <div className="mini-menu">
                    <a href="#" onClick={() => setActiveComponent('clientes')}>{t.clientes}</a>
                </div>
                <div className="mini-menu">
                    <a href="#" onClick={() => setActiveComponent('componentes')}>{t.componentes}</a>
                </div>
                
                {session?.user?.nivel === 1 && (
                    <div className="mini-menu">
                        <a href="#" onClick={() => setActiveComponent('usuarios')}>{t.usuarios}</a>
                    </div>
                )}
                <div className="mini-menu">
                    <a href="#" onClick={() => signOut()}>{t.salir}</a>
                </div>
            </div>
            <section className="main">
                {renderComponent()}
            </section>
        </>
    );
};