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
                <a href="#">Cambiar contraseña</a>
                <a href="#">Cambiar idioma</a>
                <a href="#">Acerca de ...</a>
            </div>

            <section className="main">
                {/* {renderComponent()} */}
            </section>
        </>
    );
};