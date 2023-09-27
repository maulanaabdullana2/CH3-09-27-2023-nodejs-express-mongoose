const app = require("./app")
const mongoose = require("mongoose")

const port = process.env.port || 3000

const database = "mongodb://127.0.0.1:27017/tours"

mongoose
  .connect(database, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connection")
  })

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})
