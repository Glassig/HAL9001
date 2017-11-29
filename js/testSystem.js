function test(description, callback, shouldSucceed = true) {
  const Result = flip => {
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

function finalize(tests) {
  const failedTests = tests.filter((test) => !test).length
  if (failedTests === 0)
    console.log("All " + tests.length + " tests are green!")
  else
    console.log(`Somethings up! ${failedTests} / ${tests.length} tests failed!`)
}

function assert(test) {
  if (!test) throw Error("Assert!")
}

function assertEqual(a, b) {
  if (a !== b) throw Error(`Assert! ${a} !== ${b}`)
}
