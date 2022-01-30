import app from "./server.js"
import mongodb, { MongoAPIError } from "mongodb"
import dotenv from "dotenv"
import restaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
    })
    .then(async client => {
        await restaurantsDAO.injectDB(client)
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })
    .catch(err => {
        console.error("Something went wrong")
        console.error(err)
    })
