"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginPage() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const router = useRouter();
    const [error, setError] = useState(null);

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await signIn('credentials', {
                username: data.Usuario,
                password: data.Clave,
                redirect: false
            });

            if (res?.error) {
                setError(res.error);
            } else {
                router.push('/');
            }
        } catch (err) {
            console.error('Error during sign-in:', err);
            setError('Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo.');
        }
    });

    return (
        <form onSubmit={onSubmit}>
            {error && (
                <p className="bg-red-500 p-3 rounded text-center max-w-max">{error}</p>
            )}
            <div className="loginContainer">
                <Image src="/logo.png" alt="logo" width={170} height={170} />
                <div className="loginForm">
                    <label>Usuario:</label>
                    <input
                        type="text"
                        placeholder="Nombre de usuario..."
                        {...register("Usuario", {
                            required: {
                                value: true,
                                message: "El campo es requerido"
                            },
                        })}
                    />
                    {errors.Usuario && (
                        <span className="text-black p-2">{errors.Usuario.message as string}</span>
                    )}

                    <label>Contraseña:</label>
                    <input
                        type="password"
                        placeholder="Contraseña..."
                        {...register("Clave", {
                            required: {
                                value: true,
                                message: "El campo es requerido"
                            },
                        })}
                    />
                    {errors.Clave && (
                        <span className="text-black p-5">{errors.Clave.message as string}</span>
                    )}
                    <button>Ingresar</button>
                </div>
            </div>
        </form>
    );
}

export default LoginPage;