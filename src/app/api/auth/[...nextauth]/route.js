import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '@/lib/db';
import CryptoJS from 'crypto-js';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Usuario", type: "text", placeholder: "jsmith" },
                password: {  label: "Clave", type: "password", placeholder: "****" },
            },
            async authorize(Credentials) {
                console.log(Credentials);
                
                const UserFound = await db.usuarios.findUnique({
                    where: {
                        Usuario: Credentials.username
                    }
                });
                if (!UserFound) throw new Error('Usuario no encontrado');
                console.log(UserFound);

                const hashedPassword = CryptoJS.SHA256(Credentials.password).toString();

                if (hashedPassword !== UserFound.Clave) throw new Error('contraseña incorrecta');
                
                return {
                    id: UserFound.id,
                    name: UserFound.Usuario,
                    Cuenta: UserFound.Cuenta,
                    Clave: UserFound.Clave,
                    nivel: UserFound.nivel,
                };
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.nivel = token.nivel;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.nivel = user.nivel;
            }
            return token;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };