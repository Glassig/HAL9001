var tyrsta = "59abb93b56d8cfafda3b0e5f",
    breakList = "59b69f8384c268984ad9d602",
    authenticationFailure = function() {
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
      resolve(cards.map(card => ParseMoney(card.name)))
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
  Trello.get(`boards/${boardId}/lists/`, function boardInfo(data) {
    Promise.all([loadList(data[4].id), loadList(data[5].id)]).then(lists => {
      const tables = $(".tables")
      tables.empty()
      const booty = DivvyUpTheBooty(lists[0], lists[1])
      renderTable("Angelina", lists[0], booty.angelina, tables)
      renderTable("Andreas", lists[1], booty.andreas, tables)
      tables.append(`<div>${booty.whoOwe} owe ${booty.amount}</div>`)
    })
  })
}
