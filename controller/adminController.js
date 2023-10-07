const { car } = require("../models")
const { Op } = require("sequelize")
const imagekit = require("../lib/imagekit")

const carsPage = async (req, res) => {
  try {
    const { category, search } = req.query

    const fullUrl =
      req.protocol +
      "://" +
      req.get("host") +
      req.originalUrl
    let cars

    const searchCriteria = {}

    if (
      category === "small" ||
      category === "medium" ||
      category === "large"
    ) {
      searchCriteria.category = category
    }

    if (search) {
      searchCriteria.name = {
        [Op.iLike]: `%${search}%`,
      }
    }

    cars = await car.findAll({
      where: searchCriteria,
    })

    res.render("index.ejs", {
      fullUrl,
      cars,
      message: req.flash("message", ""),
    })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    })
  }
}

const createPage = async (req, res) => {
  try {
    res.render("create.ejs")
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    })
  }
}

const createCar = async (req, res) => {
  const { name, price, category } = req.body
  const file = req.file

  // Get extension file
  const split = file.originalname.split(".")
  const extension = split[split.length - 1]

  // Upload file to imagekit
  const img = await imagekit.upload({
    file: file.buffer,
    fileName: `IMG-${Date.now()}.${extension}`,
  })

  try {
    await car.create({
      name,
      price,
      category,
      imageUrl: img.url,
    })
    req.flash("message", "Data Berhasil Disimpan")
    res.redirect("/dashboard/admin")
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    })
  }
}

const editPage = async (req, res) => {
  try {
    const dataCar = await car.findByPk(
      req.params.id
    )
    res.render("edit", {
      dataCar,
    })
  } catch (error) {
    console.log(error)
  }
}

const editCar = async (req, res) => {
  const { name, price, category, description } =
    req.body
  const file = req.file
  console.log(req.body)

  console.log(file)

  try {
    //dapatkan extension filenya
    const split = file.originalname.split(`.`)
    const extension = split[split.length - 1]
    //upload file ke imagekit
    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${extension}`,
    })

    await car.update(
      {
        name,
        price,
        category,
        description,
        imageUrl: img.url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )

    // const { name, price, category } = req.body
    // console.log(req.body)
    // const file = req.file

    // console.log(file)

    // // Get extension file
    // const splitName = file.originalname.split(".")
    // const extension =
    //   splitName[splitName.length - 1]

    // // Upload file to imagekit
    // const img = await imagekit.upload({
    //   file: file.buffer,
    //   fileName: `IMG-${Date.now()}.${extension}`,
    // })

    // try {
    //   const id = req.params.id
    //   const carUpdate = await car.update(
    //     {
    //       name,
    //       price,
    //       category,
    //       image: img.url,
    //     },
    //     { where: { id } }
    //   )
    req.flash("message", "Data Berhasil Diupdate")
    res.redirect("/dashboard/admin")
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    })
  }
}

const removeCar = async (req, res) => {
  try {
    const id = req.params.id
    await car.destroy({ where: { id } })
    req.flash("message", "Data Berhasil Dihapus")
    res.redirect("/dashboard/admin")
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    })
  }
}

module.exports = {
  carsPage,
  createPage,
  createCar,
  editPage,
  editCar,
  removeCar,
}
