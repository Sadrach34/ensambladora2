import React, { useState } from 'react';
import { Ventas } from "../Archivo/Ventas";
import { Clientes } from "../Archivo/Clientes";
import { Componentes } from "../Archivo/Componentes";
import { Usuarios } from "../Archivo/Usuarios";

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