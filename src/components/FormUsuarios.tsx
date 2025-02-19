"Use Client";
import { useForm } from 'react-hook-form';
import CryptoJS from 'crypto-js';

export function FormUsuario() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        try {
            // Convertir los valores de Idioma y nivel a números enteros
            data.Idioma = parseInt(data.Idioma, 10);
            data.nivel = parseInt(data.nivel, 10);

            if (isNaN(data.Idioma)) {
                throw new Error('El campo Idioma debe ser un número válido');
            }

            if (isNaN(data.nivel)) {
                throw new Error('El campo nivel debe ser un número válido');
            }

            // Cifrar la clave en SHA-256 usando crypto-js
            data.Clave = CryptoJS.SHA256(data.Clave).toString(CryptoJS.enc.Hex);

            console.log('Enviando datos:', data); // Agregar registro de datos enviados
            const res = await fetch('/api/note?table=usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Error en la respuesta del servidor: ${res.status} ${res.statusText} - ${errorText}`);
            }

            const resJson = await res.json();
            console.log('Respuesta del servidor:', resJson); // Agregar registro de la respuesta del servidor
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    });

    return (
        <form onSubmit={onSubmit}>
            <div className="FormUsuarios">
                <div>
                <input
                className="w-full"
                    type="text"
                    placeholder="Usuario"
                    {...register("Usuario", {
                        required: {
                            value: true,
                            message: "El campo es requerido"
                        },
                    })}
                />
                <br/>
                {
                    errors.Usuario && (
                        <span className="text-red-500 m-5">
                            {errors.Usuario.message as string}
                        </span>
                    )
                }
                </div>
                <div>
                <input
                className="w-full"
                    type="text"
                    placeholder="Cuenta"
                    {...register("Cuenta", {
                        required: {
                            value: true,
                            message: "El campo es requerido"
                        },
                    })}
                />
                <br/>
                {
                    errors.Cuenta && (
                        <span className="text-red-500 m-5">{errors.Cuenta.message as string}</span>
                    )
                }
                </div>
                <div>
                <input
                className="w-full"
                    type="password"
                    placeholder="Clave"
                    {...register("Clave", {
                        required: {
                            value: true,
                            message: "El campo es requerido"
                        },
                    })}
                />
                <br/>
                {
                    errors.Clave && (
                        <span className="text-red-500 m-5">{errors.Clave.message as string}</span>
                    )
                }
                </div>
                <div>
                <input
                className="w-full"
                    type="text"
                    placeholder="nivel"
                    {...register("nivel", {
                        required: {
                            value: true,
                            message: "El campo es requerido"
                        },
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "El nivel debe ser un número"
                        }
                    })}
                />
                <br/>
                {
                    errors.nivel && (
                        <span className="text-red-500 m-5">{errors.nivel.message as string}</span>
                    )
                }
                </div>
                <div>
                <input
                className="w-full"
                    type="text"
                    placeholder="Idioma"
                    {...register("Idioma", {
                        required: {
                            value: true,
                            message: "El campo es requerido"
                        },
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "El Idioma debe ser un número"
                        }
                    })}
                />
                <br/>
                {
                    errors.Idioma && (
                        <span className="text-red-500 m-5">{errors.Idioma.message as string}</span>
                    )
                }
                </div>
                <div>
                <input
                className="w-full"
                    type="text"
                    placeholder="activo"
                    {...register("activo", {
                        required: {
                            value: true,
                            message: "El campo es requerido"
                        },
                        validate: value => value === "S" || value === "N" || "El campo activo debe ser 'S' o 'N'"
                    })}
                />
                <br/>
                {
                    errors.activo && (
                        <span className="text-red-500 m-5">{errors.activo.message as string}</span>
                    )
                }
                </div>
                <div>
                    <button className='w-full'>agregar</button>
                </div>
            </div>
        </form>
    );
}