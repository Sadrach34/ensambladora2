import React from 'react'
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export const AcercaDe = () => {
    const { data: session } = useSession();

    const texts = {
        es: {
            title: 'Sistema de Ensambladora',

            description: 'Sistema Ensambladora es una herrmanienta para administrar el inventario de Componentes de computadora de la empresa Ensambladora.',

            telefono: 'Telefono: 123-456-7890',

            web: 'https//Ensambladora.com',

            correo: 'correo: Ensambladora@example.com',

            version: 'Version 1.0.1',

            derechos: 'Derechos reservados: 2025 ©',

            lugar: 'Hermosillo, Sonora, México'
        },
        en: {
            title: 'Assembler System',
            description: 'Assembler System is a tool to manage the computer component inventory of the Assembler company.',
            telefono: 'Phone: 123-456-7890',
            web: 'https//Ensambladora.com',
            correo: 'email: Ensambladora@example.com',
            version: 'Version 1.0.1',
            derechos: 'All rights reserved: 2025 ©',
            lugar: 'Hermosillo, Sonora, México'
        }
    }

    const language = session?.user?.Idioma === 2 ? 'en' : 'es';
    const t = texts[language];

    return (
        <div className="preferencias">
            <div className="TituloAD">
                <h1>{t.title}</h1>
                <p>{t.description}</p>
            </div>
            <div>
                <Image src="/logo.png" alt="Descripción de la imagen" className="img" width={170} height={170} />
            </div>
            <div className="infoAD">
                <p className='p1'>
                    {t.telefono} <br></br>
                    {t.web} <br></br>
                    {t.correo}
                </p>
                <p className='p2'>
                    {t.version} <br></br>
                    {t.derechos}<br></br>
                    {t.lugar}
                </p>
            </div>
        </div>
    )
}