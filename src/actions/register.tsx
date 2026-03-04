"use server"

import prisma from "../lib/prisma"
import { IFormData } from "../types/form-data"


export const registerUser = async (formData: IFormData) => {
  const { email, password, confirmPassword } = formData

  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
      },
    })
    console.log(user, "user")
    return user
  } catch (error) {
    console.log("Register error", error)
    return { error: "Register error" }
  }
}
