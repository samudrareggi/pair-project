const { User, Unit, Race, Class, Rarity, UnitClassRace } = require("../models")
const bcrypt = require("bcryptjs")
const combine = require("../helpers/combine")

class Controller {
  static home(req, res) {
    let data
    res.render("home", { data })
  }

  static registerForm(req, res) {
    res.render("register")
  }

  static register(req, res) {
    const { first_name, last_name, email, password } = req.body
    User.create({ first_name, last_name, email, password })
      .then(data => {
        res.redirect("/home")
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static loginForm(req, res) {
    const error = req.query.error
    res.render("login", { error })
  }

  static login(req, res) {
    const { email, password } = req.body

    User.findOne({
      where: {
        email
      }
    })
      .then(data => {
        if (data) {
          const isValidPassword = bcrypt.compareSync(password, data.password)
          if (isValidPassword) {
            req.session.userId = data.id
            req.session.role = data.role

            return res.render("home", { data })
          } else {
            const error = "Invalid Password"
            return res.redirect(`/login?error=${error}`)
          }
        } else {
          const error = "Invalid Email"
          return res.redirect(`/login?error=${error}`)
        }
      })
      .catch(err => {
        return res.send(err.message)
      })
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        res.send(err.message)
      } else {
        res.redirect("/")
      }
    })
  }

  static listAll(req, res) {
    let dataUnit
    let dataClass
    let dataRace

    Unit.findAll({
      order: [["name", "ASC"]],
      include: [UnitClassRace, Rarity]
    })
      .then(data => {
        dataUnit = data
        return Class.findAll({ order: [["id", "ASC"]] })
      })
      .then(data => {
        dataClass = data
        return Race.findAll({ order: [["id", "ASC"]] })
      })
      .then(data => {
        dataRace = data
        const codex = combine(dataUnit, dataClass, dataRace)
        res.render("list-all", { codex, dataUnit })
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static tanker(req, res) {
    Unit.findAllTank()
      .then(data => {
        res.render("list-tank", { data })
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static listUnits(req, res) {
    Unit.findAll({ include: [Rarity] })
      .then(data => {
        res.render("list-units", { data })
      })
  }

  static addUnitForm(req, res) {
    Rarity.findAll()
      .then(data => {
        res.render("add-unit-form", { data })
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static addUnit(req, res) {
    const { name, hp, damage, RarityId } = req.body

    Unit.create({ name, hp, damage, RarityId })
      .then(data => {
        res.redirect("/list-all/units")
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static editUnitForm(req, res) {
    let dataUnit

    Unit.findByPk(+req.params.id)
      .then(data => {
        dataUnit = data
        return Rarity.findAll({ order: [["id", "ASC"]] })
      })
      .then(data => {
        res.render("edit-unit-form", { data, dataUnit })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static editUnit(req, res) {
    let unit = {
      name: req.body.name,
      hp: +req.body.hp,
      damage: +req.body.damage,
      RarityId: req.body.RarityId
    }

    Unit.update(unit, {
      where: {
        id: +req.params.id
      }
    })
      .then(data => {
        res.redirect("/list-all/units")
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static codexUnitForm(req, res) {
    let dataUnit
    let dataClass
    Unit.findOne({ where: { id: +req.params.id }, include: [UnitClassRace] })
      .then(data => {
        dataUnit = data
        return Class.findAll()
      })
      .then(data => {
        dataClass = data
        return Race.findAll()
      })
      .then(data => {
        res.render("codex-unit-form", { dataClass, dataUnit, dataRace: data })
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static codexUnit(req, res) {
    const data = {
      UnitId: +req.params.id,
      ClassId: +req.body.ClassId,
      RaceId: +req.body.RaceId,
    }

    UnitClassRace.create(data)
      .then(data => {
        res.redirect(`/list-all/${+req.params.id}/codex-unit`)
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static listClasses(req, res) {
    Class.findAll()
      .then(data => {
        res.render("list-classes", { data })
      })
  }

  static addClassForm(req, res) {
    res.render("add-class-form")
  }

  static addClass(req, res) {
    const { name } = req.body

    Class.create({ name })
      .then(data => {
        res.redirect("/list-all/classes")
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static listRaces(req, res) {
    Race.findAll()
      .then(data => {
        res.render("list-races", { data })
      })
  }

  static addRaceForm(req, res) {
    res.render("add-race-form")
  }

  static addRace(req, res) {
    const { name } = req.body

    Race.create({ name })
      .then(data => {
        res.redirect("/list-all/races")
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static listRarities(req, res) {
    Rarity.findAll({ order: [["id", "ASC"]], include: [Unit] })
      .then(data => {
        res.render("list-rarities", { data })
      })
  }

  static deleteUnit(req, res) {
    Unit.destroy({
      where: {
        id: +req.params.id
      }
    })
      .then(() => {
        res.redirect("/list-all/units")
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static deleteRace(req, res) {
    Race.destroy({
      where: {
        id: +req.params.id
      }
    })
      .then(() => {
        res.redirect("/list-all/races")
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static deleteClass(req, res) {
    Class.destroy({
      where: {
        id: +req.params.id
      }
    })
      .then(() => {
        res.redirect("/list-all/classes")
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static editClassForm(req, res) {
    Class.findByPk(+req.params.id)
      .then(data => {
        res.render("edit-class-form", { data })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static editClass(req, res) {
    const { name } = req.body
    Class.update({ name }, {
      where: {
        id: +req.params.id
      }
    })
      .then(data => {
        res.redirect("/list-all/classes")
      })
      .catch(err => {
        res.send(err.message)
      })
  }
  static editRaceForm(req, res) {
    Race.findByPk(+req.params.id)
      .then(data => {
        res.render("edit-race-form", { data })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static editRace(req, res) {
    const { name } = req.body
    Race.update({ name }, {
      where: {
        id: +req.params.id
      }
    })
      .then(data => {
        res.redirect("/list-all/races")
      })
      .catch(err => {
        res.send(err.message)
      })
  }
}




module.exports = Controller