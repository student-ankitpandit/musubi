import { toExpressHandler } from "corsair"
import express from "express"
import { corsair } from "./corsair"
import { auth } from "./auth"
import { fromNodeHeaders } from "better-auth/node"
import cors from "cors"
import { toNodeHandler } from "better-auth/node"

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.all("/api/auth/*anything", toNodeHandler(auth))

app.use(express.json())

app.use(
    "/api/corsair",
    toExpressHandler(corsair, { basePath: "/api/corsair" })
)

app.post("/api/integration/connect", async (req, res) => {
    const session = await auth.api.getSession({ 
        headers: fromNodeHeaders(req.headers) 
    })

    if(!session) return res.status(401).json({ success: false, message: "Not authenticated" })

    console.log("session object: ", session)

    const { provider } = req.body

    const { connectUrl } = await corsair.manage.connect.createLink({
        plugin: provider,
        tenantId: session.user.id,
    });

    return res.json({ connectUrl })
})

app.get("/health", (req, res) => {
    res.end("hi, there")
})

app.listen(8000, () => {
    console.log("server is up and running on port 8000")
})  