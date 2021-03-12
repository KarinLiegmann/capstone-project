import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';


const server = express();
server.use(cors());
server.use(express.json());
server.use(bodyParser.json())

const connectionString = `http://localhost:27017/`;
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

server.get('/', (req, res) =>
    res.json({ status: 'Server is up and running.' })
);

const port = 4000;
server.listen(port, () => console.log(`Server listens on port ${port}.`));