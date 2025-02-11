import React, { useState } from 'react';

import { Ventas } from "../Arhcivo/Ventas";
import { Clientes } from "../Arhcivo/Clientes";
import { Componentes } from "../Arhcivo/Componentes";
import { Usuarios } from "../Arhcivo/Usuarios";

export const Archivo = () => {
    const [activeComponent, setActiveComponent] = useState(null);
    
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

        case 'ventas':
            return <Ventas />;

        case 'ventas':
            return <Ventas />;

        case 'ventas':
            return <Ventas />;
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
                <div className="mini-menu">
                <a href="#" onClick={() => setActiveComponent('usuarios')}>Usuarios</a>
                </div>
                <a href="#" className="salir">Salir</a>
            </div>
            {/* <Image src={Logo} alt="Descripción de la imagen" className='img'/> */}
            <section className="main">
                {renderComponent()}
            </section>
        </>
    );
};