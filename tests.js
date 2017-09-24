function DivvyRaw(person1, person2) {
  return DivvyUpTheBooty(person1.map(ParseMoney), person2.map(ParseMoney))
}

let suite = new Suite("Logic")
suite.test("The testsuite should be greed", () => {})
suite.test("Testsuite should be able to fail", () => { Assert(false) }, false)
suite.test("AssertEqual", () => { AssertEqual(0, 0) })
suite.test("!AssertEqual", () => { AssertEqual(0, 1) }, false)
suite.test("Simple Andreas owes", () => {
  const booty = DivvyRaw(["167 Mat på coop", "150 Badskum"], ["100 Grönsaker"])
  AssertEqual(booty.whoOwe, "Andreas")
  AssertEqual(booty.amount, 108.5)
})
suite.test("Complex Angelina owes", () => {
  const booty = DivvyRaw(["167 Mat på coop", "150 Badskum"], ["100 Grönsaker", "@1000 Hyra"])
  AssertEqual(booty.whoOwe, "Angelina")
  AssertEqual(booty.amount, 1000 - 108.5)
})
suite.test("Failed parse", () => {
  DivvyRaw(["", "Cooking 100"], ["@@@"])
}, false)
suite.finalize()
