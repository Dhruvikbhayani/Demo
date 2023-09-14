import models from '../models/index.js';
import Jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {

        const token = req.headers['authorization'] ? req.headers['authorization'].split(" ").pop() : res.send("Please Enter Token")
        if (token) {
            const data = Jwt.verify(token, process.env.KEY)
            const user = await models.User.findOne({
                _id: data._id
            })
            req.user = user

            next()
        } else {
            res.status(404).send("you are not authorization")
        }
    } catch (e) {
        res.status(404).send(e.message)
    }
}

export default userAuth