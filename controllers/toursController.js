const fs = require("fs")
const Tour = require("../models/tourModel")

const getAllToursModels = async (req, res) => {
  try {
    const tours = await Tour.find()
    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      data: {
        tours,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message, // Menampilkan pesan kesalahan jika terjadi kesalahan
    })
  }
}

const getTourByIdModel = async (req, res) => {
  try {
    const tour = await Tour.findById(
      req.params.id
    )
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    })
  }
}

const createTourModel = async (req, res) => {
  try {
    const createTour = Tour.create(req.body)
    res.status(200).json({
      status: "Sucess",
      data: {
        createTour,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: error.message,
    })
  }
}

const updateTourModel = async (req, res) => {
  try {
    const id = req.params.id
    const newtour = await Tour.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    )
    if (!newtour) {
      res.status(400).json({
        status: "400",
        message: "id not found",
      })
    }
    res.status(200).json({
      status: "Sucess",
      data: {
        tour: newtour,
      },
    })
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    })
  }
}

const removeTourModel = async (req, res) => {
  try {
    const id = req.params.id
    const tour = await Tour.findByIdAndRemove(id)
    if (!tour) {
      return res.status(404).json({
        status: "failed",
        message: ` ${id} not found`,
        data: null,
      })
    }

    res.status(200).json({
      status: "sucess",
      message: "Sucess Delete",
      data: null,
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: err.message,
    })
  }
}

// const checkid = (req, res, next, val) => {
//   const tour = tours.find(
//     (el) => el.id === val * 1
//   )
//   if (!tour) {
//     return res.status(404).json({
//       status: "failed",
//       message: `data with ${val} this not found`,
//     })
//   }
//   next()
// }
// baca data dari file json
const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`
  )
)

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data: {
      tours,
    },
  })
}

const getTourById = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find((el) => el.id === id)

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  })
}

const createTour = (req, res) => {
  console.log(req.body.role)
  // generate id untuk data baru dari request api kita
  const newId = tours[tours.length - 1].id + 1
  const newData = Object.assign(
    { id: newId },
    req.body
  )

  tours.push(newData)
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // 201 = CREATED
      res.status(201).json({
        status: "success",
        data: {
          tour: newData,
        },
      })
    }
  )
}

const editTour = (req, res) => {
  const id = req.params.id * 1
  // findIndex = -1 (kalau data nya gk ada)
  const tourIndex = tours.findIndex(
    (el) => el.id === id
  )

  tours[tourIndex] = {
    ...tours[tourIndex],
    ...req.body,
  }

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "success",
        message: `tour with this id ${id} edited`,
        data: {
          tour: tours[tourIndex],
        },
      })
    }
  )
}

const removeTour = (req, res) => {
  // konversi string jadi number
  const id = req.params.id * 1
  const tourIndex = tours.findIndex(
    (el) => el.id === id
  )

  tours.splice(tourIndex, 1)

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "success",
        message: "berhasil delete data",
        data: null,
      })
    }
  )
}

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  editTour,
  removeTour,
  getTourById,
  getAllToursModels,
  getTourByIdModel,
  createTourModel,
  updateTourModel,
  removeTourModel,
}
