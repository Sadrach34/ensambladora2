"Use Client";
import {useState} from 'react';
import { useRouter } from 'next/navigation';

export function FormVenta() {
    const [id_venta, setId_venta] = useState('');
    const [id_cliente, setId_cliente] = useState('');
    const [id_componen, setId_componen] = useState('');
    const [id_usuario, setId_usuario] = useState('');
    const [monto, setMonto] = useState('');
    const [fechaHora, setFechaHora] = useState('');
    const [cancelado, setCancelado] = useState('');

    const router = useRouter();
    
    const validateInputs = () => {
        if (!id_venta || !id_cliente || !id_componen || !id_usuario || !monto || !fechaHora || !cancelado) {
            alert("Los campos deben de estar llenos.");
            return false;
        }
        if (isNaN(Number(id_venta)) || isNaN(Number(id_cliente)) || isNaN(Number(id_componen)) || isNaN(Number(id_usuario))) {
            alert("Los campos id_venta, id_cliente, id_componen y Id_usuario deben ser números.");
            return false;
        }
        if (isNaN(Number(monto))) {
            alert("El campo monto debe ser un número.");
            return false;
        }
        if (cancelado !== 'S' && cancelado !== 'N') {
            alert("El campo cancelado debe ser 'S' o 'N'.");
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
            const res = await fetch('/api/note?table=ventas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_cliente: Number(id_cliente),
                    id_componen: Number(id_componen),
                    Id_usuario: Number(id_usuario),
                    Monto: parseFloat(monto),
                    FechaHora: fechaHora,
                    cancelado: cancelado,
                }),
            });
            const data = await res.json();
            console.log(data);
            
        
            router.refresh();
        }}>
            <div className="FormVenta">
                <input 
                type="text" name="title" 
                autoFocus placeholder="id_venta" 
                onChange={(e) => setId_venta(e.target.value)}/>
        
                <input 
                type="text" name="title" 
                placeholder="id_cliente" 
                onChange={(e) => setId_cliente(e.target.value)}/>
        
                <input 
                type="text" name="title" 
                placeholder="id_componen" 
                onChange={(e) => setId_componen(e.target.value)}/>
        
                <input type="text" name="title" placeholder="id_usuario" onChange={(e) => setId_usuario(e.target.value)}/>
        
                <input type="text" name="title" placeholder="Monto" onChange={(e) => setMonto(e.target.value)}/>
        
                <input type="text" name="title" placeholder="Fecha" onChange={(e) => setFechaHora(e.target.value)}/>
                
                <input type="text" name="title" placeholder="cancelado" onChange={(e) => setCancelado(e.target.value)}/>
                
                <button>agregar</button>
            </div>
        </form>
    )
}