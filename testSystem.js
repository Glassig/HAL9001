function Suite(name) {
  this.name = name
  this.tests = []
}

Suite.prototype.test = function(description, callback, shouldSucceed = true) {
  const Result = flip => {
    this.tests.push(flip)
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

Suite.prototype.finalize = function() {
  const failedTests = this.tests.filter((test) => !test).length
  if (failedTests === 0)
    console.log("All " + this.tests.length + " tests are green!")
  else
    console.log(`Somethings up! ${failedTests} / ${this.tests.length} tests failed!`)
}

function Assert(test) {
  if (!test) throw Error("Assert!")
}

function AssertEqual(a, b) {
  if (a !== b) throw Error(`Assert! ${a} !== ${b}`)
}
