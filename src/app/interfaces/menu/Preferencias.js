import React, { useState } from 'react';
import { CambiarIdio } from '../Preferencia/CambiarIdio';
import { CambiarContra } from '../Preferencia/CambiarContra';
import { AcercaDe } from '../Preferencia/AcercaDe';

export const Preferencias = () => {
    const [activeComponent, setActiveComponent] = useState(null);
    
    const renderComponent = () => {
        switch (activeComponent) {
            case 'CambiarContra':
                return <CambiarContra />;
            case 'CambiarIdio':
                return <CambiarIdio />;
            case 'AcercaDe':
                return <AcercaDe />;
        }
    };
    return (
        <>
            <div className="menu">
                <div className="mini-menu">
                    <a href="#" onClick={() => setActiveComponent('CambiarContra')}>Cambiar contraseña</a>
                </div>
                <div className="mini-menu">
                <a href="#" onClick={() => setActiveComponent('CambiarIdio')}>Cambiar Idioma</a>
                </div>
                <div className="mini-menu">
                    <a href="#" onClick={() => setActiveComponent('AcercaDe')}>Acerca de ...</a>
                </div>
            </div>

            <section className="main">
                {renderComponent()}
            </section>
        </>
    );
};