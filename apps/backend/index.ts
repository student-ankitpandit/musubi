import { toExpressHandler } from "corsair"
import express from "express"
import { corsair } from "./corsair"

const app = express()

app.use(express.json())

app.use(
    "/api/corsair",
    toExpressHandler(corsair, { basePath: "/api/corsair" })
)

app.get("/health", (req, res) => {
    res.end("hi, there")
})

app.listen(8000, () => {
    console.log("server is up and running on port 8000")
})  