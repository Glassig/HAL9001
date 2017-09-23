function ParseMoney(rawString) {
  var groups = /^(@?)([-\d]+)\s*([\s\wåäö]+)$/.exec(rawString)
  if (groups === null || groups.length !== 4)
    throw new Error("Could not parse string " + rawString + ", result became " + groups)
  return {
    amount: parseInt(groups[2]),
    owedDontSplit: groups[1] === "@"
  }
}

function DivvyUpTheBooty(angelinaList, andreasList) {
  let angelinaOwe = 0
  function handleList(list) {
    let total = 0
    list.forEach((item) => {
      let money = ParseMoney(item)
      if (money.owedDontSplit)
        total += money.amount
      else
        total += money.amount / 2
    })
    return total
  }
  angelinaOwe -= handleList(angelinaList)
  angelinaOwe += handleList(andreasList)
  return {
    whoOwe: angelinaOwe === 0 ? "Even" : (angelinaOwe > 0 ? "Angelina" : "Andreas"),
    amount: Math.abs(angelinaOwe)
  }
}
