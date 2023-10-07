const router = require("express").Router()

const Car = require("./carRouter")
const Admin = require("./adminRouter")

router.use("/api/v1/cars", Car)

router.use("/", Admin)

module.exports = router
