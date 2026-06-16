
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from './utils/models/User'
import DBConnection from "./utils/config/db";

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await DBConnection();

                const user = await UserModel.findOne({email: credentials.email})
                if(!user) {
                    return null
                }
                if(credentials.password !== user.password) {
                    return null
                }
                return {
                    id: user._id.toString(),
                    name: user.username,
                    email: user.email,
                    role: user.role,
                };
            }
        })
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.userId = user.id;
                token.username = user.name;
                token.role = user.role;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.userId;
            session.user.username = token.username;
            session.user.role = token.role;
            session.user.email = token.email;

            return session;
        }
    }
});