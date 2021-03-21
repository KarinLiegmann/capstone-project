import User from '../models/User.model.js'
import { saveToDatabase, findAll, findById } from '../library/databaseHelpers.js'


async function postUser(req, res) {
    const newUser = new User({
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email
    })
    try {
        const user = await saveToDatabase(newUser)
        res.json(user)
    } catch (error) {
        res.json(error)
    }
}

async function getUsers(_, res) {
    try {
        const users = await findAll(User);
        res.json(users);
    } catch (error) {
        res.json(error);
    }
}

async function getUser(req, res) {
    const userId = req.params.userId;
    try {
        const user = await findById(User, userId);
        res.json(user);
    } catch (error) {
        res.json(error);
    }
}


export { postUser, getUsers, getUser };