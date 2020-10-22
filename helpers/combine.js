function combine(unit, kelas, race) {
  let nameClass = []
  let nameRace = []
  let result = []
  for (let i = 0; i < kelas.length; i++) {
    nameClass.push([kelas[i].id, kelas[i].name])
  }

  for (let i = 0; i < race.length; i++) {
    nameRace.push([race[i].id, race[i].name])
  }

  for (let i = 0; i < unit.length; i++) {
    let classes = []
    let races = []
    for (let j = 0; j < unit[i].UnitClassRaces.length; j++) {
      for (let k = 0; k < nameClass.length; k++) {
        if (unit[i].UnitClassRaces[j].ClassId === nameClass[k][0]) {
          classes.push(nameClass[k][1])
        }
      }
      for (let k = 0; k < nameRace.length; k++) {
        if (unit[i].UnitClassRaces[j].RaceId === nameRace[k][0]) {
          races.push(nameRace[k][1])
        }
      }
    }

    result.push({
      id: unit[i].id,
      name: unit[i].name,
      class: classes.join(", "),
      race: races.join(", "),
    })
  }

  return result
}

module.exports = combine