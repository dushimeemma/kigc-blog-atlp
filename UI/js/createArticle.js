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
//logout
document.querySelector('#logout').addEventListener('click', (e) => {
  e.preventDefault();
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = 'login.html';
    });
});
//get element
let articleForm = document.querySelector('#article-form');
let title = articleForm['title'];
let body = articleForm['body'];
let titleErrors = document.querySelector('#titleErrors');
let bodyErrors = document.querySelector('#bodyErrors');
//init firebase database ref
let db = firebase.database();
let articleRef = db.ref('article');

articleForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (title.value === '' && body.value === '') {
    title.style.border = 'var(--danger)';
    body.style.border = 'var(--danger)';
    titleErrors.style.display = 'block';
    bodyErrors.style.display = 'block';
    titleErrors.innerText = 'title field is required';

    bodyErrors.innerText = 'body field is required';
  } else {
    titleErrors.style.display = 'none';
    bodyErrors.style.display = 'none';
    title.style.border = 'var(--success)';
    body.style.border = 'var(--success)';
    articleRef
      .push()
      .set({
        title: title.value,
        body: body.value,
      })
      .then(() => {
        errors.style.display = 'block';
        errors.innerHTML =
          '<p class="text-center capitalize success">article successfully inserted</p>';
        articleForm.reset();
        setTimeout(() => errors.remove(), 5000);
      })
      .catch((err) => {
        errors.style.display = 'block';
        errors.innerHTML = `<p class="text-center capitalize danger">${err.message}</p>`;
        setTimeout(() => errors.remove(), 5000);
      });
  }
});
