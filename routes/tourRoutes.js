const express = require("express")
const router = express.Router()
const toursController = require("../controllers/toursController")

// router.param("id", toursController.checkid)

router
  .route("/")
  .get(toursController.getAllToursModels)
  .post(
    toursController.checkBody,
    toursController.createTourModel
  )

router
  .route("/:id")
  .get(toursController.getTourByIdModel)
  .patch(toursController.updateTourModel)
  .delete(toursController.removeTourModel)

module.exports = router
