const tyrsta = "59abb93b56d8cfafda3b0e5f",
      angelinaListID = "59afa1724e02795f082f3d75",
      andreasListID = "59b5a67b07cfaf5ce036a978"

function authenticationFailure() {
  console.error("Failed authentication")
}

Trello.authorize({
  type: "popup",
  name: "Getting Started Application",
  scope: {
    read: "true",
    write: "true" },
  expiration: "never",
  success: getUserData,
  error: authenticationFailure
})

function getUserData() {
  Trello.get("/members/me", function dataInfo(data) {
    sessionStorage.setItem("id", data.id)
  }).then(function() {
    loadBoardLists(tyrsta)
  })
}

function loadList(id) {
  return new Promise((resolve, reject) => {
    Trello.get(`lists/${id}/cards`, cards => {
      resolve(cards.map(card => parseMoney(card.name)))
    })
  })
}

function renderTable(name, list, sum, container) {
  container.append(`
    <table class="primary">
      <thead>
        <tr>
          <th>${name}</th>
          <th>Split/Owed</th>
        </tr>
      </thead>
      <tbody>
        ${list.map(card => `
          <tr>
            <td>${card.amount} kr</td>
            <td>${card.owedDontSplit ? "Owed" : "Split"}</td>
          </tr>
        `).join("")}
        <tr>
          <td>${sum} kr</td>
          <td>Total Shared</td>
        </tr>
      </tbody>
    </table>
  `)
}

function loadBoardLists(boardId) {
  Promise.all([loadList(angelinaListID), loadList(andreasListID)]).then(lists => {
    const tables = $(".tables"),
          booty = divvyUpTheBooty(lists[0], lists[1])
    tables.empty()
    renderTable("Angelina", lists[0], booty.angelina, tables)
    renderTable("Andreas", lists[1], booty.andreas, tables)
    tables.append(`<div>${booty.whoOwe} owe ${booty.amount}</div>`)
  })
}
