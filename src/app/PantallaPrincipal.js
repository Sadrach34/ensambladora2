import React from 'react';
import Image from 'next/image';

export const PantallaPrincipal = () => {
    return (
        <div className="image-container">
            <Image src="/logo.png" alt="Descripción de la imagen" className="img" width={300} height={300} />
        </div>
    );
};