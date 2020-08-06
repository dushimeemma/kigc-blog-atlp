//init firebase auth

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    firebase
      .database()
      .ref(`users/${user.uid}`)
      .on('value', (snapshot) => {
        document.querySelector('#username').innerHTML = `${
          snapshot.val().firstName
        } ${snapshot.val().lastName}`;
      });
  } else {
    window.location.href = 'login.html';
  }
});

document.querySelector('#logout').addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    window.location.href = 'login.html';
  });
});
//ref to firebase db
let db = firebase.database();
//get the id of article
let urlParams = new URLSearchParams(location.search);
let id = urlParams.get('id');

//get element
let updateForm = document.querySelector('#update-form');
let title = updateForm['title'];
let body = updateForm['body'];
let errors = document.querySelector('#errors');

//get article to update
db.ref('article')
  .child(id)
  .on('value', (snapshot) => {
    title.value = snapshot.val().title;
    body.value = snapshot.val().body;
  });

//update article
updateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.ref('article')
    .child(id)
    .update({
      title: title.value,
      body: body.value,
    })
    .then(() => {
      errors.style.display = 'block';
      errors.innerHTML =
        '<p class="text-center capitalize success">Updated successfully</p>';
      setTimeout(() => errors.remove(), 5000);
    })
    .catch((err) => {
      errors.style.display = 'block';
      errors.innerHTML = `<p class="text-center capitalize danger">${err.message}</p>`;
      setTimeout(() => errors.remove());
    });
});
