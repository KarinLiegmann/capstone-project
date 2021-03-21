import express from 'express';
import {
    postIngredient,
    getIngredients,
    getIngredient,
} from '../controller/ingredients.controller.js';

const router = express.Router();

router.get('/ingredients/:userId', getIngredient);

router.get('/ingredients/:userId', getIngredients);

router.post('/ingredients/:userId', postIngredient);

export default router;