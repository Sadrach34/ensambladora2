import React, { useState } from 'react';
import { PantallaPrincipal } from "../PantallaPrincipal";

export const Preferencias = () => {
    const [activeComponent, setActiveComponent] = useState(null);
    
    const renderComponent = () => {
    switch (activeComponent) {
        // case 'ventas':
        //     return <Ventas />;

        case 'index':
            return <PantallaPrincipal />;
    }
    };
    return (
        <>
            <div class="menu">
                <a href="#">Cambiar contraseña</a>
                <a href="#">Cambiar idioma</a>
                <a href="#">Hacerca de ...</a>
            </div>

            <section class="main">
                {renderComponent()}
            </section>
        </>
    );
};