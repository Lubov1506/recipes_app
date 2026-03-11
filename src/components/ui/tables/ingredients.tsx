import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/src/constants/select-options"
import { useAuthStore } from "@/src/store/auth.store"
import { useIngredientStore } from "@/src/store/ingredient.store"
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react"

const IngredientsTable = () => {
  const { ingredients, deleteIngredient, isLoading } = useIngredientStore()
  const { isAuth } = useAuthStore()

  const handleDelete = async (id: string) => {
    await deleteIngredient(id)
  }
  const getCategoryLabel = (value: string) => {
    const option = CATEGORY_OPTIONS.find((opt) => opt.value === value)
    return option ? option.label : value
  }
  const getUnitLabel = (value: string) => {
    const option = UNIT_OPTIONS.find((opt) => opt.value === value)
    return option ? option.label : value
  }
  return (
    <Table
      aria-label='Ingredients list'
      classNames={{
        wrapper: "mt-4",
        table: "w-full",
        th: "text-black",
        td: "text-black",
      }}
    >
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Category</TableColumn>
        <TableColumn>Unit</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn>Description</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {ingredients.map((ingredient) => (
          <TableRow key={ingredient.id}>
            <TableCell>{ingredient.name}</TableCell>
            <TableCell>{getCategoryLabel(ingredient.category)}</TableCell>
            <TableCell>{getUnitLabel(ingredient.unit)}</TableCell>
            <TableCell>
              {ingredient.pricePerUnit !== null
                ? `${ingredient.pricePerUnit} $`
                : "-"}
            </TableCell>
            <TableCell>{ingredient.description || "-"}</TableCell>
            <TableCell>
              <Button
                color='danger'
                size='sm'
                onPress={() => handleDelete(ingredient.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default IngredientsTable
