import React from 'react'
import Image from 'next/image';

export const AcercaDe = () => {
    return (
        <div className="preferencias">
            <div className="TituloAD">
                <h1>Sistema de Ensambladora</h1>
                <p>Sistema Ensambladora es una herrmanienta para administrar el inventario de Componentes de computadora de la empresa Ensambladora.
                </p>
            </div>
            <div>
                <Image src="/logo.png" alt="Descripción de la imagen" className="img" width={170} height={170} />
            </div>
            <div className="infoAD">
                <p className='p1'>
                    Telefono: 123-456-7890 <br></br>
                    https//Ensambladora.com <br></br>
                    correo: Ensambladora@example.com
                </p>
                <p className='p2'>
                    Version 1.0.1 <br></br>
                    Derechos reservados: 2025 © <br></br>
                    Hermosillo, Sonora, México
                </p>
            </div>

            <div>
                <button className="btnIdio">Volver</button>
            </div>
        </div>
)
}