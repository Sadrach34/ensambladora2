"use client";

import React, { useState } from 'react';
import {Archivo} from './menu/Archivo.js';
import { PantallaPrincipal } from "./PantallaPrincipal";
import { Reportes } from './menu/Reportes';
import { Preferencias } from './menu/Preferencias';

export default function Home() {
  const [activeComponent, setActiveComponent] = useState('');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'archivo': 
        return <Archivo />;

      case 'reportes':
        return <Reportes />;

      case 'preferencias':
        return <Preferencias />;

      default:
          return <PantallaPrincipal />;
    }
  };

  return (
    <>
      <div className="Titulo">
        <h1><a onClick={() => setActiveComponent('index')}>Ensambladora</a></h1>

        <nav className="menu">
          <div className="dropdown">
            <a href="#" onClick={() => setActiveComponent('archivo')}>Archivo</a>
          </div>

          <div className="dropdown">
            <a href="#" onClick={() => setActiveComponent('reportes')}>Reportes</a>
          </div>

          <div className="dropdown">
            <a href="#" onClick={() => setActiveComponent('preferencias')}>Preferencias</a>
          </div>
        </nav>
      </div>

      <section className="main">
        {renderComponent()}
      </section>
    </>
  );
}
