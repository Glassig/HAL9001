function divvyUpTheBooty(angelinaList, andreasList) {
  const angelina = handleList(angelinaList)
  const andreas = handleList(andreasList)
  const debt = andreas - angelina;
  return {
    angelina: angelina,
    andreas: andreas,
    whoOwe: debt === 0 ? "Even" : (debt > 0 ? "Angelina" : "Andreas"),
    amount: Math.abs(debt)
  }
}

function handleList(list) {
  let total = 0
  list.forEach((item) => {
    if (item.error)
      return
    if (item.owedDontSplit)
      total += item.amount
    else
      total += item.amount / 2
  })
  return total
}

function parseMoney(rawString) {
  var groups = /^(@?)([-\d]+)\s*([\s\wåäö]+)$/.exec(rawString)
  if (groups === null || groups.length !== 4)
    throw new Error(`Could not parse string "${rawString}" result became ${groups}`)
  return {
    amount: parseInt(groups[2]),
    owedDontSplit: groups[1] === "@"
  }
}
