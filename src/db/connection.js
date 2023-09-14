import mongoose from "mongoose";
import models from '../models/index.js';

const insertData = async () => {
    const userData = {
        userName: "admin",
        fullName: "Admin",
        email: "admin@test.com",
        password: "admin@123",
        role: 1,
    }
    const userEmail = await models.User.findOne({ email: "admin@test.com" })
    if (!userEmail) {
        return await models.User.create(userData)
    }
}

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('Connected to the database successfully!');
    insertData()
}).catch(err => {
    console.log("err", err);
})
export default mongoose