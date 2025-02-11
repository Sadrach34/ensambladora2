// import React, { useState } from 'react';
// import { PantallaPrincipal } from "../PantallaPrincipal";

export const Preferencias = () => {
    // const [activeComponent, setActiveComponent] = useState(null);
    
    // const renderComponent = () => {
    // switch (activeComponent) {
    //     case 'ventas':
    //         return <Ventas />;

    //     case 'index':
    //         return <PantallaPrincipal />;
    // }
    // };
    return (
        <>
            <div className="menu">
                <div className="mini-menu">
                    <a href="#">Cambiar contraseña</a>
                </div>
                <div className="mini-menu">
                    <a href="#">Cambiar idioma</a>
                </div>
                <div className="mini-menu">
                    <a href="#">Acerca de ...</a>
                </div>
            </div>

            <section className="main">
                {/* {renderComponent()} */}
            </section>
        </>
    );
};