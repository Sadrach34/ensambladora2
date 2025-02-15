import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

async function getUsuarios() {
    const res = await fetch('http://localhost:3000/api/note?table=usuarios');
    const data = await res.json();
    return data;
}

export const RepUsuarios = () => {
    const [usuarios, setusuarios] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const data = await getUsuarios();
            setusuarios(data);
        }
        fetchData();
    }, []);

    const generatePDF = () => {
            const doc = new jsPDF();
            doc.text('Reporte de Usuarios', 14, 16);
            doc.autoTable({
                head: [['id_usuario', 'Usuario', 'Cuenta', 'Clave', 'Nivel', 'Idioma', 'activo']],
                body: usuarios.map(usuario => [
                    usuario.Id_usuario,
                    usuario.Usuario,
                    usuario.Cuenta,
                    usuario.Clave,
                    usuario.nivel,
                    usuario.Idioma,
                    usuario.activo
                ]),
                startY: 20,
            });
            doc.save('ReporteUsuarios.pdf');
        };

    return (
        <>
            <div className="Archivo">
                <button onClick={generatePDF}>Generar PDF</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>id_usuario</th>
                            <th>Usuario</th>
                            <th>Cuenta</th>
                            <th>Clave</th>
                            <th>Nivel</th>
                            <th>Idioma</th>
                            <th>activo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.Id_usuario}>
                                <td>{usuario.Id_usuario}</td>
                                <td>{usuario.Usuario}</td>
                                <td>{usuario.Cuenta}</td>
                                <td>{usuario.Clave}</td>
                                <td>{usuario.nivel}</td>
                                <td>{usuario.Idioma}</td>
                                <td>{usuario.activo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}