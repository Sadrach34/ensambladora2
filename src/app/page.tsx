"use client";

import React, { useState } from 'react';
import { Archivo } from './menu/Archivo.js';
import { PantallaPrincipal } from "./PantallaPrincipal";
import { Reportes } from './menu/Reportes';
import { Preferencias } from './menu/Preferencias';
import Image from 'next/image';

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
          <div className="nombre">
            <h1><a onClick={() => setActiveComponent('index')}>Ensambladora</a></h1>
          </div>
          <div className="dropdown">
            <a href="#" onClick={() => setActiveComponent('archivo')}>Archivo</a>
          </div>

          <div className="dropdown">
            <a href="#" onClick={() => setActiveComponent('reportes')}>Reportes</a>
          </div>

          <div className="dropdown">
            <a href="#" onClick={() => setActiveComponent('preferencias')}><Image src="/login.png" alt="Descripción de la imagen" className="img" width={50} height={30} /></a>
          </div>
        
      </div>

      <section className="main">
        {renderComponent()}
      </section>
    </>
  );
}
