const router = require("express").Router()

const Admin = require("../controller/adminController")

const upload = require("../middlewares/uploader")

router.get("/dashboard/admin", Admin.carsPage)
router.get(
  "/dashboard/admin/create",
  Admin.createPage
)
router.get(
  "/dashboard/admin/edit/:id",
  Admin.editPage
)

router.post(
  "/dashboard/admin/edit/:id",
  upload.single("image"),
  Admin.editCar
)

router.post(
  "/dashboard/admin/create",
  upload.single("image"),
  Admin.createCar
)

router.post(
  "/dashboard/admin/:id",
  Admin.removeCar
)

module.exports = router
