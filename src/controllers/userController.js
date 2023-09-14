import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import models from '../models/index.js';
import nodeMailer from 'nodemailer';

const userSingup = async (req, res) => {
    try {
        const email = req.body.email
        const data = await models.User.findOne({ email })

        if (!data) {
            req.body.password = await bcrypt.hash(req.body.password, 10)
            const userData = await models.User.create({ ...req.body })
            res.json({
                status: 200,
                data: userData,
            })
        } else {
            res.json({
                status: 200,
                msg: "Email is already exits"
            })
        }
    } catch (e) {
        res.json({
            status: 404,
            msg: e.message
        })
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const data = await models.User.findOne({ email, isDeleted: false })
        if (!data) {
            res.json({
                status: 200,
                msg: "Email is Not valid"
            })
        } else {
            const match = await bcrypt.compare(password, data.password)
            if (!match) {
                res.json({
                    status: 200,
                    msg: "password is not valid"
                })
            } else {
                const token = jwt.sign({
                    _id: data._id
                }, process.env.KEY)
                res.json({ status: 200, status: 'login done', data: token })
            }
        }
    } catch (e) {
        res.json({
            status: 404,
            msg: e.message
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const user = await models.User.find({ isDeleted: false })

        res.json({ status: 200, data: user })
    } catch (e) {
        res.json({
            status: 404,
            msg: e.message
        })
    }
}

const getOneUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await models.User.find({ _id: id, isDeleted: false })
        res.json({ status: 200, data: user })
    } catch (e) {
        res.json({
            status: 404,
            msg: e.message
        })
    }
}

const userUpdate = async (req, res) => {
    try {
        const data = req.user
        const _id = req.params.id
        const result = await models.User.findOneAndUpdate({ _id, isDeleted: false }, { ...req.body, updatedBy: data._id }, { new: true })
        res.json({
            status: 200,
            data: result
        })
    } catch (e) {
        res.json({
            status: 404,
            msg: e.message
        })
    }
}

const userRemove = async (req, res) => {
    try {
        const _id = req.params.id
        const result = await models.User.findOneAndUpdate({ _id, isDeleted: false }, { $set: { isDeleted: true } }, { new: true })
        res.json({ status: 200, message: "User is deleted" })
    } catch (e) {
        res.json({
            status: 404,
            msg: e.message
        })
    }
}

const forgetPassword = async (req, res) => {
    try {
        const email = req.body.email
        const cPass = req.body.conformPassword
        const rePass = req.body.reCPassword

        if (cPass == rePass) {
            const updatePass = await models.User.findOneAndUpdate({ email }, { $set: { password: bcrypt.hash(cpass, 10) } }, { new: true })

            res.json({
                status: 200,
                msg: "password is successfully updated"
            })
        } else {
            res.json({
                status: 200,
                msg: "password is not Match"
            })
        }
    } catch (e) {
        res.json({
            status: 404,
            msg: e.message
        })
    }
}

const forgetMail = async (req, res) => {
    try {
        const reqData = await req.body.email

        const emailData = await models.User.findOne({ email: reqData })
        if (emailData) {
            var sotp = (Math.floor(100000 + Math.random() * 900000));
            let transort = nodeMailer.createTransport({
                service: "gmail",
                auth: {
                    user: 'pateldhruvik5522@gmail.com',
                    pass: 'kkhosdcdyjuljoxf',
                }
            });

            var mailOptions = {
                from: 'pateldhruvik5522@gmail.com',
                to: emailData,
                subject: "Otp for forgot password ",
                text: `Otp for forgot password : ${sotp}`,
            }
            transort.sendMail(mailOptions, (error, result) => {
                if (error) {
                    res.status(200).json({
                        message: error,
                    })
                } else {
                    res.json({
                        status: 200,
                        msg: "email is sent "
                    })
                }
            })
        } else {
            res.json({
                status: 200,
                msg: "Email is Not found"
            })
        }
    } catch (e) {
        res.json({
            status: 200,
            msg: e.message
        })
    }
}

const userController = { userLogin, getAllUser, getOneUser, userUpdate, userRemove, userSingup, forgetPassword, forgetMail }
export default userController