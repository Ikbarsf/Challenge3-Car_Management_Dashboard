const { car } = require("../models")

const getAllCars = async (req, res) => {
  try {
    const Cars = await car.findAll()
    res.status(200).json({
      status: "success",
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
  const { name, price, category } = req.body
  try {
    const newCar = await car.create({
      name,
      price,
      category,
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
  const { name, price, category } = req.body
  try {
    const Cars = await car.update(
      {
        name,
        price,
        category,
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
