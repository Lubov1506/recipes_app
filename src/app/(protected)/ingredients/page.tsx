import PageContent from "@/src/components/common/page-content"
import IngredientsTable from "@/src/components/ui/tables/ingredients"
import IngredientForm from "@/src/forms/ingredient.form"

const Page = () => {
  return <div >
      <IngredientForm/>
      <IngredientsTable/>
  </div>
}

export default Page
