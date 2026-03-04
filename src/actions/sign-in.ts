"use server"
import { AuthError } from "next-auth";
import { signIn } from "../auth/auth"

export default async function signInWithCredentials(
  email: string,
  password: string
) {
  console.log('sign-in');
  
  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    return res
  } catch (error) {
    console.error("Auth error")
    throw error
  }
}
