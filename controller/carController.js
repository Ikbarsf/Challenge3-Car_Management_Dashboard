const { car } = require("../models")
const imagekit = require("../lib/imagekit")

const getAllCars = async (req, res) => {
  try {
    const Cars = await car.findAll()
    res.status(200).json({
      status: "Success",
      data: {
        Cars,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    })
  }
}

const getCarById = async (req, res) => {
  try {
    const Cars = await car.findOne({
      where: {
        id: req.params.id,
      },
    })

    res.status(200).json({
      status: "Success",
      data: {
        Cars,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    })
  }
}

const createCar = async (req, res) => {
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

    const newCar = await car.create({
      name,
      price,
      category,
      description,
      imageUrl: img.url,
    })

    res.status(200).json({
      status: "Success",
      data: {
        newCar,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    })
  }
}

const updateCar = async (req, res) => {
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

    const Cars = await car.update(
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

    res.status(200).json({
      status: "Success",
      message: `Berhasil mengedit data id: ${Cars}`,
    })
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    })
  }
}

const deleteCar = async (req, res) => {
  try {
    const Cars = await car.destroy({
      where: {
        id: req.params.id,
      },
    })

    res.status(200).json({
      status: "Success",
      message: `Berhasil menghapus data`,
    })
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    })
  }
}

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
}
