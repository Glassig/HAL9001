let tests = []
function Test(description, callback, shouldSucceed = true) {
  function Result(flip) {
    tests.push(flip)
    if (flip) {
      console.log(description + "... OK!")
      return true
    } else {
      console.log(description + "... FAIL!")
      return false
    }
  }
  try {
    callback()
    return Result(shouldSucceed)
  } catch (exception) {
    if (Result(!shouldSucceed))
      return true
    else {
      console.error(exception)
      return false
    }
  }
}

function Assert(test) {
  if (!test) throw Error("Assert!")
}

function AssertEqual(a, b) {
  if (a !== b) throw Error(`Assert! ${a} !== ${b}`)
}

Test("The testsuite should be greed", () => {})
Test("Testsuite should be able to fail", () => { Assert(false) }, false)
Test("AssertEqual", () => { AssertEqual(0, 0) })
Test("!AssertEqual", () => { AssertEqual(0, 1) }, false)
Test("Simple Andreas owes", () => {
  const booty = DivvyUpTheBooty(["167 Mat på coop", "150 Badskum"], ["100 Grönsaker"])
  AssertEqual(booty.whoOwe, "Andreas")
  AssertEqual(booty.amount, 108.5)
})
Test("Complex Angelina owes", () => {
  const booty = DivvyUpTheBooty(["167 Mat på coop", "150 Badskum"], ["100 Grönsaker", "@1000 Hyra"])
  AssertEqual(booty.whoOwe, "Angelina")
  AssertEqual(booty.amount, 1000 - 108.5)
})
Test("Failed parse", () => {
  DivvyUpTheBooty(["", "Cooking 100"], ["@@@"])
}, false)

const failedTests = tests.filter((test) => !test).length
if (failedTests === 0)
  console.log("All " + tests.length + " tests are green!")
else
  console.log(`Somethings up! ${failedTests} / ${tests.length} tests failed!`)
