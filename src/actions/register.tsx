"use server"

import prisma from "../lib/prisma"
import { IFormData } from "../types/form-data"
import { saltAndHashPassword } from "../utils/password"

export const registerUser = async (formData: IFormData) => {
  const { email, password, confirmPassword } = formData

  if (password !== confirmPassword) {
    return { error: "Password aren't matches" }
  }
  if (password.length < 6) {
    return { error: "Password can't be less than 6 symbols" }
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (existingUser) {
      return { error: "User with that email is already exist" }
    }
    const pwHash = await saltAndHashPassword(password)
    const user = await prisma.user.create({
      data: {
        email: email,
        password: pwHash,
      },
    })
    return user
  } catch (error) {
    console.log("Register error", error)
    return { error: "Register error" }
  }
}
