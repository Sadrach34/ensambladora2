import React, { useState } from 'react';
import { Ventas } from "../Archivo/Ventas";
import { Clientes } from "../Archivo/Clientes";
import { Componentes } from "../Archivo/Componentes";
import { Usuarios } from "../Archivo/Usuarios";
import { signOut, useSession } from 'next-auth/react';

export const Archivo = () => {
    const [activeComponent, setActiveComponent] = useState(null);
    const { data: session } = useSession();

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
                    <a href="#" onClick={() => setActiveComponent('ventas')}>Ventas</a>
                </div>
                <div className="mini-menu">
                    <a href="#" onClick={() => setActiveComponent('clientes')}>Clientes</a>
                </div>
                <div className="mini-menu">
                    <a href="#" onClick={() => setActiveComponent('componentes')}>Componentes</a>
                </div>
                
                {session?.user?.nivel === 1 && (
                    <div className="mini-menu">
                        <a href="#" onClick={() => setActiveComponent('usuarios')}>Usuarios</a>
                    </div>
                )}
                <div className="mini-menu">
                    <a href="#" onClick={() => signOut()}>Salir</a>
                </div>
            </div>
            <section className="main">
                {renderComponent()}
            </section>
        </>
    );
};