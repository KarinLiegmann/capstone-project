This is a documentation for the ingredientsList-component. This component renders ingredients as ListItems including the amount that is given in the recipe and the short version of the unit name. The amount is rounded up during the render. 

```js
<IngredientsList ingredients={[{amount: 2, unitShort:'tbsp', name: 'sugar'}, {amount: 4.4, unitShort:'lb', name: 'Tomatoes'}, {amount: 1.2, unitShort:'g', name: 'Curry paste'}]} />
```