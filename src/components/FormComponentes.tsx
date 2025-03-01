"Use Client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function FormComponentes() {
    const [componente, setComponente] = useState('');
    const [precio, setPrecio] = useState('');
    const [disponible, setDisponible] = useState('');
    const [baja, setBaja] = useState('');

    const router = useRouter();

    const validateInputs = () => {
        if (!componente || !precio || !disponible || !baja) {
            alert("Debes de llenar todos los campos.");
            return false;
        }
        if (isNaN(Number(precio)) || isNaN(Number(disponible))) {
            alert("El campo precio, disponible debe ser un número.");
            return false;
        }
        if (baja !== 'S' && baja !== 'N') {
            alert("El campo baja debe ser 'S' o 'N'.");
            return false;
        }
        return true;
    };

    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
            if (!validateInputs()) {
                return;
            }
            const res = await fetch('/api/note?table=componentes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    componente: componente,
                    precio: Number(precio), 
                    Disponible: Number(disponible),
                    baja: baja, 
                }),
            });
            const data = await res.json();
            console.log(data);

            router.refresh();
        }}>
            <div className="FormCliente">
                <input 
                type="text" name="title" 
                autoFocus placeholder="Componente" 
                onChange={(e) => setComponente(e.target.value)}/>

                <input 
                type="text" name="title" 
                placeholder="Precio" 
                onChange={(e) => setPrecio(e.target.value)}/>

                <input
                type="text" name="title" 
                placeholder="Disponible" 
                onChange={(e) => setDisponible(e.target.value)}/>

                <input 
                type="text" name="title" 
                placeholder="Baja" 
                onChange={(e) => setBaja(e.target.value)}/>
                <button>agregar</button>
            </div>
        </form>
    );
}