const express = require("express")
const morgan = require("morgan")
const flash = require("connect-flash")
const session = require("express-session")
const dotenv = require("dotenv")
const router = require("./routes")
const path = require("path")

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(__dirname + "/public"))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(morgan("dev"))
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
)
app.use(flash())

app.use(router)

app.listen(PORT, () => {
  console.log(
    `Server berjalan pada port : ${PORT}`
  )
})
