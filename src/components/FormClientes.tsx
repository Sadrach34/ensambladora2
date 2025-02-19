    "Use Client";
    import { useState } from 'react';
    import { useRouter } from 'next/navigation';

    export function FormCliente() {
        const [cliente, setCliente] = useState('');
        const [celular, setCelular] = useState('');
        const [domicilio, setDomicilio] = useState('');
        const [suspendido, setSuspendido] = useState('');

        const router = useRouter();

        const validateInputs = () => {
            if (!cliente || !celular || !domicilio || !suspendido) {
                alert("Debes de llenar todos los campos.");
                return false;
            }
            if (isNaN(Number(celular)) || celular.length !== 10) {
                alert("El campo celular debe ser un número y contener 10 dígitos.");
                return false;
            }
            if (suspendido !== 'S' && suspendido !== 'N') {
                alert("El campo suspendido debe ser 'S' o 'N'.");
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
                const res = await fetch('/api/note?table=clientes', { // Corregir la URL
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        cliente: cliente,
                        Celular: celular, // Asegúrate de que sea una cadena de texto
                        Domicilio: domicilio,
                        suspendido: suspendido, // Asegúrate de que sea una cadena de texto
                    }),
                });
                const data = await res.json();
                console.log(data);

                router.refresh();
            }}>
                <div className="FormCliente">
                    <input 
                    type="text" name="title" 
                    autoFocus placeholder="id_cliente" />

                    <input 
                    type="text" name="title" 
                    autoFocus placeholder="Cliente" 
                    onChange={(e) => setCliente(e.target.value)}/>

                    <input 
                    type="text" name="title" 
                    placeholder="Celular" 
                    onChange={(e) => setCelular(e.target.value)}/>

                    <input
                    type="text" name="title" 
                    placeholder="Domicilio" 
                    onChange={(e) => setDomicilio(e.target.value)}/>

                    <input 
                    type="text" name="title" 
                    placeholder="suspendido" 
                    onChange={(e) => setSuspendido(e.target.value)}/>
                    <button>agregar</button>
                </div>
            </form>
        );
    }