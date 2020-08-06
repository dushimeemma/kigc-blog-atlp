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
//get it to update
let urlParams = new URLSearchParams(location.search);
let id = urlParams.get('id');
//get form and input fields
let updateProfile = document.querySelector('#update-form');
let fname = updateProfile['fname'];
let lname = updateProfile['lname'];
let image = updateProfile['file'];
let errors = document.querySelector('#errors');

//get profile to update
firebase
  .database()
  .ref(`users/${id}`)
  .on('value', (snapshot) => {
    fname.value = snapshot.val().firstName;
    lname.value = snapshot.val().lastName;
  });

updateProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  firebase
    .database()
    .ref(`users/${id}`)
    .set({
      firstName: fname.value,
      lastName: lname.value,
    })
    .then(() => {
      errors.style.display = 'block';
      errors.innerHTML =
        '<p class="text-center success">Updated Successfully</p>';
      setTimeout(() => errors.remove(), 5000);
    })
    .catch((err) => {
      errors.style.display = 'block';
      errors.innerHTML = '<p class="text-center danger">Updated failed</p>';
      setTimeout(() => errors.remove(), 5000);
    });
});
