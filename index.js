const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")
// require(".env")

const router = require("./routes")

dotenv.config()

const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(morgan("dev"))
app.use(router)

app.listen(PORT, () => {
  console.log(
    `Server berjalan pada port : ${PORT}`
  )
})
