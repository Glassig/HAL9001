var tyrsta = "59abb93b56d8cfafda3b0e5f",
    breakList = "59b69f8384c268984ad9d602",
    authenticationFailure = function() {
      console.log("Failed authentication")
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
    loadTables()
  })
}

function loadTables() {
  var id = sessionStorage.getItem("id"), tableBody = $(".table_body")
  Trello.get(`members/${id}/boards`, function tableInfo(data) {
    data.forEach(function createOneRow(table) {
      if (!table.closed) {
        tableBody.append(`<tr><td>${table.name}</td><td>${table.id}</td></tr>`)
      }
    })
  }).then(function() {
    loadBoardLists(tyrsta)
  })
}

function loadBoardLists(boardId) {
  Trello.get(`boards/${boardId}/lists/`, function boardInfo(data) {
    Trello.get(`lists/${data[0].id}/cards`, function allCards(cards) {
      console.log(cards)
    })
  })
}
