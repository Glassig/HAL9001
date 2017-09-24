function divvyRaw(person1, person2) {
  return divvyUpTheBooty(person1.map(parseMoney), person2.map(parseMoney))
}

let suite = new Suite("Logic")
suite.test("The testsuite should be greed", () => {})
suite.test("Testsuite should be able to fail", () => { assert(false) }, false)
suite.test("AssertEqual", () => { assertEqual(0, 0) })
suite.test("!AssertEqual", () => { assertEqual(0, 1) }, false)
suite.test("Simple Andreas owes", () => {
  const booty = divvyRaw(["167 Mat på coop", "150 Badskum"], ["100 Grönsaker"])
  assertEqual(booty.whoOwe, "Andreas")
  assertEqual(booty.amount, 108.5)
})
suite.test("Complex Angelina owes", () => {
  const booty = divvyRaw(["167 Mat på coop", "150 Badskum"], ["100 Grönsaker", "@1000 Hyra"])
  assertEqual(booty.whoOwe, "Angelina")
  assertEqual(booty.amount, 1000 - 108.5)
})
suite.test("Failed parse", () => {
  DivvyRaw(["", "Cooking 100"], ["@@@"])
}, false)
suite.finalize()
