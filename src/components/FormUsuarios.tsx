"Use Client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function FormUsuario() {
    const [usuario, setUsuario] = useState('');
    const [cuenta, setCuenta] = useState('');
    const [clave, setClave] = useState('');
    const [nivel, setNivel] = useState('');
    const [idioma, setIdioma] = useState('');
    const [activo, setActivo] = useState('');

    const router = useRouter();

    const validateInputs = () => {
        if (!usuario || !cuenta || !clave || !nivel || !activo) {
            alert("Debes de llenar todos los campos excepto Idioma.");
            return false;
        }
        if (isNaN(Number(nivel))) {
            alert("El campo nivel debe ser un número.");
            return false;
        }
        if (idioma && isNaN(Number(idioma))) {
            alert("El campo idioma debe ser un número si está presente.");
            return false;
        }
        if (activo !== 'S' && activo !== 'N') {
            alert("El campo activo debe ser 'S' o 'N'.");
            return false;
        }
        return true;
    };

    const hashPassword = async (password) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    };

    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
            if (!validateInputs()) {
                return;
            }

            const hashedClave = await hashPassword(clave);

            const payload = {
                Usuario: usuario,
                Cuenta: cuenta,
                Clave: hashedClave,
                nivel: Number(nivel),
                Idioma: Number(idioma),
                activo: activo,
            };

            const res = await fetch('/api/note?table=usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            console.log(data);

            router.refresh();
        }}>
            <div className="FormUsuarios">
                <input 
                type="text" name="title" 
                autoFocus placeholder="Id_usuario" />

                <input 
                type="text" name="title" 
                autoFocus placeholder="Usuario" 
                onChange={(e) => setUsuario(e.target.value)}/>

                <input 
                type="text" name="title" 
                placeholder="Cuenta" 
                onChange={(e) => setCuenta(e.target.value)}/>

                <input
                type="password" name="title" 
                placeholder="Clave" 
                onChange={(e) => setClave(e.target.value)}/>

                <input 
                type="text" name="title" 
                placeholder="nivel" 
                onChange={(e) => setNivel(e.target.value)}/>
                
                <input 
                type="text" name="title" 
                placeholder="Idioma" 
                onChange={(e) => setIdioma(e.target.value)}/>
                
                <input 
                type="text" name="title" 
                placeholder="activo" 
                onChange={(e) => setActivo(e.target.value)}/>
                <button>crear</button>
            </div>
        </form>
    );
}