//init firebase database
const db = firebase.database();

//init ref to firebase database
const queriesRef = db.ref('article');

//retrieve queries from db and display it to a table
queriesRef.on('child_added', (snapshot) => {
  let title = snapshot.val().title;
  let body = snapshot.val().body;
  let id = snapshot.key;
  let table = document.querySelector('#my-table');
  let row = table.insertRow(table.rows.length);
  let cell1 = row.insertCell(0);
  // let cell2 = row.insertCell(1);
  let cell2 = row.insertCell(1);
  cell1.innerHTML = title;
  // cell2.innerHTML = body;
  cell2.innerHTML =
    `<img src="./images/update-1.png" class="m-icon icon pointer" onclick="onClickUpdate('` +
    id +
    `')"/><td><img src="./images/delete-2.jpg" class="m-icon pointer icon"onclick="onClickDelete('` +
    id +
    `')"/></td>`;
});
// delete article
function onClickDelete(id) {
  queriesRef
    .child(id)
    .remove()
    .then(() => {
      window.location.href = 'articles.html';
    });
}
//update article
function onClickUpdate(id) {
  window.location.href = 'updateArticle.html?id=' + id;
}
