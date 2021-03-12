import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY
const DB_USER = process.env.DB_USER
const DB_PW = process.env.DB_PW


const server = express();
server.use(cors());
server.use(express.json());
server.use(bodyParser.json())

const connectionString = `mongodb+srv://${DB_USER}:${DB_PW}@capstone-project.wvg8c.mongodb.net/`;
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