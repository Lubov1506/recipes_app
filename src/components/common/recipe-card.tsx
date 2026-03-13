"use client"

import { Card, CardBody, CardHeader, Button } from "@heroui/react"
import Link from "next/link"
import { useTransition } from "react"
import Image from "next/image"
import { IRecipe } from "@/src/types/recipe"
import { useAuthStore } from "@/src/store/auth.store"
import { useRecipeStore } from "@/src/store/recipe.store"
import { UNIT_ABBREVIATIONS } from "@/src/constants/select-options"

interface RecipeCardProps {
  recipe: IRecipe
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { removeRecipe } = useRecipeStore()
  const { isAuth } = useAuthStore()
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await removeRecipe(recipe.id)
      } catch (error) {
        console.error("Recipe deleting error:", error)
      }
    })
  }

  const getUnitLabel = (unit: string) => {
    const unitOption = UNIT_ABBREVIATIONS.find(
      (option) => option.value === unit
    )
    return unitOption ? unitOption.label : unit.toLowerCase()
  }

  return (
    <Card className='w-full min-w-63.5 max-w-md h-120 flex flex-col'>
      <div className='h-48 overflow-hidden'>
        {recipe.imageUrl ? (
          <div className='relative h-48 group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg'>
            <Image
              src={recipe.imageUrl}
              alt='Image for recipe'
              fill
              className='object-cover transition-transform duration-300 group-hover:scale-105'
            />
          </div>
        ) : (
          <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
            <span className='text-gray-500'>No image</span>
          </div>
        )}
      </div>

      <CardHeader className='flex justify-between items-center text-black'>
        <h2 className='text-xl font-bold'>{recipe.name}</h2>
      </CardHeader>

      <CardBody className='flex-1 text-black'>
        <p className='text-gray-600 line-clamp-6'>
          {recipe.description || "No description"}
        </p>
        <h3 className='mt-4 font-semibold'>Ingredients:</h3>
        <ul className='list-disc pl-5 overflow-y-auto max-h-24'>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.ingredient.name}: {ingredient.quantity}{" "}
              {getUnitLabel(ingredient.ingredient.unit)}
            </li>
          ))}
        </ul>
      </CardBody>

      {isAuth && (
        <div className='flex justify-end gap-2 p-4'>
          <Link href={`/recipe/${recipe.id}`}>
            <Button color='primary' variant='light'>
              Update
            </Button>
          </Link>
          <Button
            color='danger'
            variant='light'
            onPress={handleDelete}
            isLoading={isPending}
          >
            Delete
          </Button>
        </div>
      )}
    </Card>
  )
}

export default RecipeCard
