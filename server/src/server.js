import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import axios from 'axios';
import path from 'path';
import { dirname } from './lib/pathHelpers.js';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY
const DB_PATH = process.env.DB_PATH

const __dirname = dirname(import.meta.url);

const app = express();
app.use(cors());
app.use(express.json());


const connectionString = `${DB_PATH}`;
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});




app.get('/ingredients', (req, res) => {
    const queryParams = req.query

    axios.get(`https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${API_KEY}`, {
        params: {
            metaInformation: true,
            number: queryParams.number,
            query: queryParams.query
        },
    })
        .then(res => res.data)
        .then(ingredients => res.status(200).send(ingredients))
        .catch(error => res.json(error))
})

app.get('/recipes', (req, res) => {
    const queryParams = req.query

    axios.get(`https://api.spoonacular.com/recipes/findByIngredients?&apiKey=${API_KEY}`, {
        params: {
            instructionsRequired: queryParams.instructionsRequired,
            ranking: queryParams.ranking,
            number: queryParams.number,
            offset: queryParams.offset,
            ingredients: queryParams.ingredients
        },
    })
        .then(res => res.data)
        .then(recipes => res.status(200).send(recipes))
        .catch(error => res.json(error))
})

app.get('/recipeInstructions/:recipeId', (req, res) => {
    const recipeId = req.params.recipeId

    axios.get(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${API_KEY}`)
        .then(res => res.data)
        .then(recipe => res.status(200).send(recipe))
        .catch(error => res.json(error))
})

/*app.get('/', (req, res) =>
    res.json({ status: 'Server is up and running.' })
);*/

app.use(express.static(path.join(__dirname, '../../client/build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});



const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listens on port ${port}.`));