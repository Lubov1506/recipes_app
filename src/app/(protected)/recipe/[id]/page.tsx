'use client'
import RecipeForm from "@/src/forms/recipe.form"
import { useRecipeStore } from "@/src/store/recipe.store"
import { IRecipe } from "@/src/types/recipe"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const Page = () => {
  const { id } = useParams<{ id: string }>()
  const { recipes, isLoading, error } = useRecipeStore()
  const [recipe, setRecipe] = useState<IRecipe | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    if (recipes.length > 0 || error) {
      const foundRecipe = recipes.find((recipe) => recipe.id === id)
      setRecipe(foundRecipe || null)
      setHasSearched(true)
    }
  }, [error, id, recipes])
  if (isLoading) return <p className='text-center'>Loading...</p>
  if (error) return <p className='text-red-700'>{error}</p>
  if (hasSearched && !recipe) return <p>Recipe not found</p>
  if (recipe) {
    return (
      <div className='container mx-auto p-4'>
        <h1 className='text-3xl font-bold mb-4'>Edit recipe: {recipe.name}</h1>
        <RecipeForm initialRecipe={recipe} />
      </div>
    )
  }
  return <p className='text-center'>Loading...</p>
}

export default Page
