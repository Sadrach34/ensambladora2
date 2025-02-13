import React from 'react';
import Image from 'next/image';

export const PantallaPrincipal = () => {
    return (
        <div className="image-container">
            <Image src="/logo.png" alt="Descripción de la imagen" className="img" width={350} height={350} />
        </div>
    );
};