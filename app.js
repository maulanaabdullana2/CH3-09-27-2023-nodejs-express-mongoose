const express = require("express")
const morgan = require("morgan")

const tourRouter = require(`./routes/tourRoutes`)
const userRouter = require("./routes/userRoutes")

const app = express()

app.use(express.json())
app.use(morgan("dev"))

app.use((req, res, next) => {
  console.log(
    "hallo FSW2 di middleware kita sendiri"
  )
  next()
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  console.log(req.requestTime)
  next()
})

// ROUTING
// app.get("/api/v1/tours", getAllTours)
// app.get("/api/v1/tours/:id", getTourById)
// app.post("/api/v1/tours", createTour)
// app.patch("/api/v1/tours/:id", editTour)
// app.delete("/api/v1/tours/:id", removeTour)

app.use("/api/v1/tours", tourRouter)
app.use("/api/v1/users", userRouter)

module.exports = app
