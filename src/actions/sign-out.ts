"use server"
import { signOut } from "../auth/auth"

export default async function signOutFunc() {
  try {
    const res = await signOut({ redirect: false })
    return res
  } catch (error) {
    console.error("Auth error", error)
    throw error
  }
}
