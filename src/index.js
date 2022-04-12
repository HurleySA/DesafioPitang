import dotenv from "dotenv";
import express from "express";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on Port: ${PORT}`)
})
app.get("/",(request, response) => {
    response.json({message: "Hello world"})
})

