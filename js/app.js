// This is the test-list (let's break some shit)
// const angelinaListID = "59b69f89148a908925bb2c0a",
//       andreasListID = "59b69f8bb20e0a6032f7e357",
//       historyListID = "59e7636c8360536f7ae35615"
// Production
const angelinaListID = "59afa1724e02795f082f3d75",
      andreasListID = "59b5a67b07cfaf5ce036a978",
      historyListID = "59e76e45a3cd4201c1ca724f"
var thereIsAnBrokenEntry = false

Trello.authorize({
  type: "popup",
  name: "Getting Started Application",
  scope: {
    read: "true",
    write: "true" },
  expiration: "never",
  success: getUserData,
  error: function authfail() {
    console.error("Failed authentication")
  }
})

function getUserData() {
  Trello.get("/members/me", function dataInfo(data) {
    sessionStorage.setItem("id", data.id)
  }).then(function() {
    loadBoardLists()
  })
}

function loadBoardLists() {
  Promise.all([loadList(angelinaListID), loadList(andreasListID)]).then(lists => {
    const tables = $(".tables"),
          booty = divvyUpTheBooty(lists[0], lists[1])
    tables.show()
    renderTable("Angelina", lists[0], booty.angelina, tables)
    renderTable("Andreas", lists[1], booty.andreas, tables)
    fixPayButton(booty.whoOwe, booty.amount)
  })
}

function loadList(id) {
  return new Promise((resolve, reject) => {
    Trello.get(`lists/${id}/cards`, cards => {
      resolve(cards.map(card => {
        try {
          return parseMoney(card.name)
        } catch (exception) {
          console.error(exception)
          thereIsAnBrokenEntry = true
          return {
            error: exception
          }
        }
      }
      ))
    })
  })
}

function renderTable(name, list, sum, container) {
  container.append(`
    <table class="money-table">
      <thead>
        <tr>
          <th>${name}</th>
          <th>Split/Owed</th>
        </tr>
      </thead>
      <tbody>
        ${list.map(card => `
          ${card.error ? `
            <tr class="error">
              <td colspan="2">${card.error}</td>
            </tr>
          ` : `
            <tr>
              <td>${card.amount} kr</td>
              <td>${card.owedDontSplit ? "Owed" : "Split"}</td>
            </tr>
          `}`).join("")}
        <tr>
          <td>${sum} kr</td>
          <td>Total Shared</td>
        </tr>
      </tbody>
    </table>
  `)
}

function fixPayButton(payer, debt) {
  if (thereIsAnBrokenEntry) {
    $(".debt-summary").html("ERROR!!!")
  } else {
    $(".debt-summary").html(`${payer} <br> owe ${debt}`)
    $(".circle.debt-summary").click(function() {
      createHistoryCard($(this).text().replace(/owe/, "payed"))
      Trello.post(`/lists/${angelinaListID}/archiveAllCards`, function() { console.log("success archive all cards") }, function() { console.log("failure archive all cardss") })
      Trello.post(`/lists/${andreasListID}/archiveAllCards`, function() { console.log("success archive all cards") }, function() { console.log("failure archive all cardss") })
      window.location.reload(true)
    })
  }
}

function createHistoryCard(historyText) {
  var date = (new Date()).toISOString().split(/T/)[0],
      newCard = {
        name: `${date}: ${historyText}`,
        desc: `${date}: ${historyText}`,
        pos: "top",
        idList: historyListID
      }
  Trello.post("/cards/", newCard, function() { console.log("success add history card") }, function() { console.log("failure add history card") })
}
