"use server"

import prisma from "../lib/prisma"

export async function getRecipes() {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    })
    return { success: true, recipes }
  } catch (error) {
    console.log(error, "GET recipes error")
    return { success: false, error: "GET recipes error " }
  }
}
export async function createRecipe(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const imageUrl = formData.get("imageUrl") as string
    const ingredients = Array.from(formData.entries())
      .filter(([key]) => key.startsWith("/ingredients"))
      .map(([key, value]) => ({
        ingredientId: value as string,
        quantity: parseFloat(
          formData.get(`quantity_${key.split("_")[1]}`) as string
        ),
      }))

    if (!name || ingredients.length === 0) {
      return {
        success: false,
        error: "Name and quantity at least 1 are required",
      }
    }
    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        imageUrl,
        ingredients: {
          create: ingredients.map(({ ingredientId, quantity }) => ({
            ingredient: { connect: { id: ingredientId } },
            quantity,
          })),
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    })

    return { success: true, recipe }
  } catch (error) {
    console.log(error, "Creating recipe error")
    return { success: false, error: "Creating recipe error " }
  }
}
export async function updateRecipe(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const imageUrl = formData.get("imageUrl") as string
    const ingredients = Array.from(formData.entries())
      .filter(([key]) => key.startsWith("/ingredients"))
      .map(([key, value]) => ({
        ingredientId: value as string,
        quantity: parseFloat(
          formData.get(`quantity_${key.split("_")[1]}`) as string
        ),
      }))

    if (!name || ingredients.length === 0) {
      return {
        success: false,
        error: "Name and quantity at least 1 are required",
      }
    }

    const recipe = await prisma.recipe.update({
      where: { id },
      data: {
        name,
        description,
        imageUrl,
        ingredients: {
          deleteMany: {},
          create: ingredients.map(({ ingredientId, quantity }) => ({
            ingredient: { connect: { id: ingredientId } },
            quantity,
          })),
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    })
    return { success: true, recipe }
  } catch (error) {
    console.log(error, "Updating recipe error")
    return { success: false, error: "Updating recipe error " }
  }
}
export async function deleteRecipe(id: string) {
  try {
    await prisma.recipeIngredient.deleteMany({
      where: {
        recipeId: id,
      },
    })
    await prisma.recipe.delete({
      where: { id },
    })
    return { success: true }
  } catch (error) {
    console.log(error, "Deleting recipe error")
    return { success: false, error: "Deleting recipe error " }
  }
}
