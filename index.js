import 'dotenv/config';
import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from './src/db/connection.js';
import router from './src/router/index.js';

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", router)

const PROT = process.env.PROT || 2500
app.listen(PROT, () => {
    console.log("server is run " + PROT)
})