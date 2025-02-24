"use client";

import React, { useState } from 'react';
import { Archivo } from './interfaces/menu/Archivo.js';
import { PantallaPrincipal } from './PantallaPrincipal';
import { Reportes } from './interfaces/menu/Reportes';
import { Preferencias } from './interfaces/menu/Preferencias';
import { useSession } from 'next-auth/react';

import Image from 'next/image';

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [activeComponent, setActiveComponent] = useState('');
  const { data: session } = useSession();

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
      <div className='Titulo'>
        <div onClick={() => setIsActive(!isActive)} className={`nombre ${isActive ? "text-red-500" : "text-blue-500"}`}>
          <h1><a onClick={() => setActiveComponent('index')}>Ensambladora</a></h1>
        </div>
        <div className="dropdown">
          <a href="#" onClick={() => setActiveComponent('archivo')}>Archivo</a>
        </div>

        {session?.user?.nivel === 1 && (
          <div className="dropdown">
            <a href="#" onClick={() => setActiveComponent('reportes')}>Reportes</a>
          </div>
        )}

        <div className="dropdown">
          <a href="#" onClick={() => setActiveComponent('preferencias')}>
            <Image src="/login.png" alt="Descripción de la imagen" className="img" width={50} height={30} />
          </a>
        </div>
      </div>

      <section className="main">
        {renderComponent()}
      </section>
    </>
  );
}