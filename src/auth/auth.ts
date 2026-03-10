import bcryptjs from "bcryptjs"
import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "../schema/zod"
import getUserFromDb from "../utils/user"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "../lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        console.log(credentials, "credentials")

        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("1")
            throw new Error("Email and password are required")
          }
          const { email, password } = await signInSchema.parseAsync(credentials)
          // const email = credentials?.email;
          // const password = credentials?.password;
          console.log(email, password, "email, password")

          const user = await getUserFromDb(email)
          console.log(user, "user lubov")

          if (!user || !user.password) {
            console.log("2")
            throw new Error("Invalid credentials.")
          }
          const isPasswordValid = await bcryptjs.compare(
            password,
            user.password
          )
          if (!isPasswordValid) {
            console.log("3", isPasswordValid)
            throw new Error("Invalid credentials")
          }
          return { id: user.id, email: user.email }
        } catch (error) {
          if (error instanceof ZodError) {
            console.log("4", error)
            return null
          }
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
})
