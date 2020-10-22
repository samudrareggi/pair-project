const express = require("express")
const router = express.Router()
const Controller = require("../controllers")

router.get("/", Controller.home)

router.get("/register", Controller.registerForm)
router.post("/register", Controller.register)

router.get("/login", Controller.loginForm)
router.post("/login", Controller.login)

router.use(function (req, res, next) {
  console.log(req.session.role)
  if (req.session.userId && req.session.role === "gm" || req.session.role === "user") {
    next()
  } else {
    res.redirect("/login")
  }
})

router.get("/list-all", Controller.listAll)
router.get("/list-all/tanker", Controller.tanker)

router.use(function (req, res, next) {
  if (req.session.userId && req.session.role === "gm") {
    next()
  } else {
    res.redirect("/login")
  }
})

router.get("/list-all/units", Controller.listUnits)
router.get("/list-all/add-unit", Controller.addUnitForm)
router.post("/list-all/add-unit", Controller.addUnit)
router.get("/list-all/:id/edit-unit", Controller.editUnitForm)
router.post("/list-all/:id/edit-unit", Controller.editUnit)
router.get("/list-all/:id/codex-unit", Controller.codexUnitForm)
router.post("/list-all/:id/codex-unit", Controller.codexUnit)
router.get("/list-all/:id/delete-unit", Controller.deleteUnit)

router.get("/list-all/classes", Controller.listClasses)
router.get("/list-all/add-class", Controller.addClassForm)
router.post("/list-all/add-class", Controller.addClass)
router.get("/list-all/:id/edit-class", Controller.editClassForm)
router.post("/list-all/:id/edit-class", Controller.editClass)
router.get("/list-all/:id/delete-class", Controller.deleteClass)

router.get("/list-all/races", Controller.listRaces)
router.get("/list-all/add-race", Controller.addRaceForm)
router.post("/list-all/add-race", Controller.addRace)
router.get("/list-all/:id/edit-race", Controller.editRaceForm)
router.post("/list-all/:id/edit-race", Controller.editRace)
router.get("/list-all/:id/delete-race", Controller.deleteRace)

router.get("/list-all/rarities", Controller.listRarities)

router.get("/logout", Controller.logout)

module.exports = router