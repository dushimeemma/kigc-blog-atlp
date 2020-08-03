//init firebase database
const db = firebase.database();

//init ref to firebase database
const queriesRef = db.ref('queries');

//retrieve queries from db and display it to a table
queriesRef.on('child_added', (snapshot) => {
  let email = snapshot.val().email;
  let queries = snapshot.val().message;
  let id = snapshot.key;
  let table = document.querySelector('#my-table');
  let row = table.insertRow(table.rows.length);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  cell1.innerHTML = email;
  cell2.innerHTML = queries;
  cell3.innerHTML =
    `<td><img src="./images/delete-2.jpg" class="m-icon pointer icon"onclick="onClickDelete('` +
    id +
    `')"/></td>`;
});

function onClickDelete(id) {
  queriesRef
    .child(id)
    .remove()
    .then(() => {
      window.location.href = 'dashboard.html';
    });
}
