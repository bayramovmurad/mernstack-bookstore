import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import booksRoute from "./routes/bookRouter.js";


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }));

app.get("/", (req, res) => {
    console.log(req);
    res.status(234).send("Hello World!");
})

app.use("/books", booksRoute)

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(error => console.error(error));