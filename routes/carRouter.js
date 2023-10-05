const router = require("express").Router()

const Car = require("../controller/carController")

router.get("/", Car.getAllCars)
router.get("/:id", Car.getCarById)
router.post("/", Car.createCar)
router.patch("/:id", Car.updateCar)
router.delete("/:id", Car.deleteCar)

module.exports = router
