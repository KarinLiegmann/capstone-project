import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY
const DB_PATH = process.env.DB_PATH


const app = express();
app.use(cors());
app.use(express.json());


const connectionString = `${DB_PATH}`;
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get('/', (req, res) =>
    res.json({ status: 'Server is up and running.' })
);


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




const port = 4000;
app.listen(port, () => console.log(`Server listens on port ${port}.`));