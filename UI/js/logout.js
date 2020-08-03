//init firebase auth
const auth = firebase.auth();

auth.onAuthStateChanged((user) => {
  if (user) {
    document.querySelector('#username').innerText = `${user.email}`;
  } else {
    window.location.href = 'blog.html';
  }
});

document.querySelector('#logout').addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    window.location.href = 'index.html';
  });
});
