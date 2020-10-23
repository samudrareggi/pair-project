const express = require("express")
const session = require("express-session")
const routes = require("./routes")
const fileUpload = require("express-fileupload")
const app = express()
const port = process.env.PORT || 4000

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: "kopikap",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, sameSite: true }
}))

app.use(fileUpload())

app.use("/", routes)

app.listen(port, () => {
  console.log("http://localhost:" + port)
})