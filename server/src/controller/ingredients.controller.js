import Ingredient from '../models/Ingredient.model.js'
import User from '../models/User.model.js'

import { saveToDatabase, findAll, findById, findAndUpdate } from '../library/databaseHelpers.js'

async function postIngredient(req, res) {
    const userId = req.params.userId

    const newIngredients = new Ingredient({
        userId,
        ingredients: [{
            ingredientName: req.body.ingredientName,
            id: req.body.id,
            isActive: req.body.isActive
        }]
    })
    try {
        const ingredients = await saveToDatabase(newIngredients)
        res.json(ingredients)
    } catch (error) {
        res.json(error)
    }
}

async function getIngredients(_, res) {
    const userId = req.params.userId;

    try {
        const ingredients = await findAll(userId);
        res.json(ingredients);
    } catch (error) {
        res.json(error);
    }
}

async function getIngredient(req, res) {
    const userId = req.params.userId;

    try {
        /*const ingredientId = req.params.ingredientId;*/
        const ingredient = await findById(Ingredient, userId);
        res.json(ingredient);
    } catch (error) {
        res.json(error);
    }
}

export { postIngredient, getIngredients, getIngredient }
