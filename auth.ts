import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET,
    providers: [
        Credentials({
            name: "Admin Login",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Simple hardcoded admin for demonstration
                // In a real app, this would check a database
                if (credentials?.username === "Khalidlwa3er" && credentials?.password === "Hh$6csf92F)?t4z6Xi%B{M7t@") {
                    return { id: "1", name: "Admin", role: "admin" }
                }
                return null
            }
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) token.role = (user as any).role
            return token
        },
        session({ session, token }) {
            if (session.user) (session.user as any).role = token.role
            return session
        },
    },
})
