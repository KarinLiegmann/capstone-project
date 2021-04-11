import { render } from "@testing-library/react"
import IngredientTags from './IngredientTags'

describe("IngredientTag Component", () => {

    it("should toggle the active-state of the ingredient when clicking on the ingredient tag", () => {
        const ingredients = [{ id: 6583, name: "ramen", isActive: true }, { id: 16112, name: "miso", isActive: false }]
        const toggleIngredientTag = jest.fn((ingredient) => { });
        const { getByTestId } = render(
            <IngredientTags
                ingredients={ingredients}
                onToggleStatus={toggleIngredientTag}
            />
        )
    })

    it("should delete the ingredient when clicking on the delete icon", () => {
        const ingredients = [{ id: 6583, name: "ramen", isActive: true }, { id: 16112, name: "miso", isActive: false }]
        const deleteIngredient = jest.fn((ingredient) => { });
        const { getByTestId } = render(
            <IngredientTags
                ingredients={ingredients}
                onDeleteTag={deleteIngredient}
            />
        )
    })
})