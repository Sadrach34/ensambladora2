import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export const PantallaPrincipal = () => {
    const { data: session } = useSession();

    return (
        <>
            <div className="image-container">
                <Image src="/logo.png" alt="Descripción de la imagen" className="img" width={300} height={300} />
            </div>
            <div>
                {session ? (
                    <p>(nivel: {session.user.nivel})</p>
                ) : (
                    <p>No has iniciado sesión</p>
                )}
            </div>
            <div>
                {session ? (
                    <p>(Idioma: {session.user.Idioma})</p>
                ) : (
                    <p>No has iniciado sesión</p>
                )}
            </div>
            <div className="image-container">
                {session ? (
                    <p>Bienvenido, {session.user.name}</p>
                ) : (
                    <p>No has iniciado sesión</p>
                )}
            </div>
        </>
    );
};