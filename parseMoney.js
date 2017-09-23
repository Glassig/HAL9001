function ParseMoney(rawString) {
  var groups = /^(@?)([-\d]+)\s*([\s\wåäö]+)$/.exec(rawString)
  if (groups === null || groups.length !== 4) {
    throw new Error("Could not parse string " + rawString + ", result became " + groups)
  }
  return {
    amount: parseInt(groups[2]),
    owedDontSplit: groups[1] === "@"
  }
}

// Should pass
console.log(ParseMoney("@100 Test test"))
console.log(ParseMoney("100 Middag åäö test"))
console.log(ParseMoney("0 Test"))
console.log(ParseMoney("-10 Test"))

/*
// Should fail
ParseMoney("");
ParseMoney("Cooking");
ParseMoney("Cooking 100");
ParseMoney("Cooking @ 100");
ParseMoney("100");
*/
