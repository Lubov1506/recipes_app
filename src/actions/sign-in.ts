"use server";

import { AuthError } from "next-auth";
import { signIn } from "../auth/auth";

export async function signInWithCredentials(email: string, password: string) {
  try {
    console.log(email, password, 'email, password signInWithCredentials');

    const res = await signIn("credentials", {
      email,
      password,
      redirect: true
    });

    return {res}
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
   }
   
   if (error instanceof AuthError) {
     return { error: "Невірний логін або пароль" };
   }
   
   // Якщо це системний редирект NextAuth, він МАЄ вилетіти з функції
   throw error; 
    // if (error instanceof AuthError) {
    //   return { error: "Invalid credentials." }
    // }
    // throw error 
  }
}