import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY
const DB_PATH = process.env.DB_PATH


const server = express();
server.use(cors());
server.use(express.json());
server.use(bodyParser.json())

const connectionString = `${DB_PATH}`;
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

server.get('/', (req, res) =>
    res.json({ status: 'Server is up and running.' })
);

server.get('/ingredients', (req, res) => {
    axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=${API_KEY}&addChildren=true&sortDirection=desc&number=5&query=cheese`)
        .then(res => res.data)
        .then(ingredients => res.send(ingredients))
        .catch(error => res.json(error))
})


const port = 4000;
server.listen(port, () => console.log(`Server listens on port ${port}.`));