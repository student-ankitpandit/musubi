import express from "express"

const app = express()

app.listen(8000, () => {
    console.log("server is up and running on port 8000")
})