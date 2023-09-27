const mongoose = require("mongoose")

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Nama Harus Di isi"],
  },

  rating: {
    type: Number,
  },

  price: {
    type: Number,
    require: [true, "Price Harus Di isi"],
  },
})

const tour = mongoose.model("Tour", tourSchema)

// const tes = new tour({
//   name: "Main ke Banten",
//   rating: 5.5,
//   price: 2000,
// })

// tes.save()

module.exports = tour
