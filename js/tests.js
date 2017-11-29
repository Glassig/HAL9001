function divvyRaw(person1, person2) {
  return divvyUpTheBooty(person1.map(parseMoney), person2.map(parseMoney))
}

let results = []
results.push(test("The testsuite should be green", () => {}))
results.push(test("Testsuite should be able to fail", () => { assert(false) }, false))
results.push(test("AssertEqual", () => { assertEqual(0, 0) }))
results.push(test("!AssertEqual", () => { assertEqual(0, 1) }, false))
results.push(test("Simple Andreas owes", () => {
  const booty = divvyRaw(["167 Mat på coop", "150 Badskum"], ["100 Grönsaker"])
  assertEqual(booty.whoOwe, "Andreas")
  assertEqual(booty.amount, 108.5)
}))
results.push(test("Complex Angelina owes", () => {
  const booty = divvyRaw(["167 Mat på coop", "150 Badskum"], ["100 Grönsaker", "@1000 Hyra"])
  assertEqual(booty.whoOwe, "Angelina")
  assertEqual(booty.amount, 1000 - 108.5)
}))
results.push(test("Failed parse", () => {
  divvyRaw(["", "Cooking 100"], ["@@@"])
}, false))
results.push(test("Handles weird characters", () => {
  divvyRaw(["140 kr ica taco-kväll@^#$%"], [])
}))
finalize(results)