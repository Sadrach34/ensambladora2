import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '@/lib/db';
import CryptoJS from 'crypto-js';

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Usuario", type: "text", placeholder: "jsmith" },
                password: {  label: "Clave", type: "password",placeholder: "****" },
            },
            async authorize(Credentials) {
                // console.log(Credentials);
                
                const UserFound = await db.usuarios.findUnique({
                    where: {
                        Usuario: Credentials.username
                    }
                })
                if (!UserFound) throw new Error('Usuario no encontrado');
                // console.log(UserFound);

                const hashedPassword = CryptoJS.SHA256(Credentials.password).toString();

                if (hashedPassword !== UserFound.Clave) throw new Error('contraseña incorrecta');
                
                return {
                    id: UserFound.id,
                    name: UserFound.Usuario,
                    Clave: UserFound.Clave
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };