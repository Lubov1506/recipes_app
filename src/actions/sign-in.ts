"use server"

import { AuthError } from "next-auth"
import { signIn } from "../auth/auth"

export async function signInWithCredentials(email: string, password: string) {
  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    return { res }
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error
    }

    if (error instanceof AuthError) {
      return { error: "Invalid credentials" }
    }
    throw error
  }
}
