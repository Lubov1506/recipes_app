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
  secret: process.env.BETTER_AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required")
          }
          const { email, password } = await signInSchema.parseAsync(credentials)
          const user = await getUserFromDb(email)

          if (!user || !user.password) {
            throw new Error("Invalid credentials.")
          }
          const isPasswordValid = await bcryptjs.compare(
            password,
            user.password
          )
          if (!isPasswordValid) {
            throw new Error("Invalid credentials")
          }
          return { id: user.id, email: user.email }
        } catch (error) {
          if (error instanceof ZodError) {
            return null
          }
          return null
        }
      },
    }),
  ],
})
