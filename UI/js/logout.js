//init firebase auth
const auth = firebase.auth();
//const storage = firebase.storage();

auth.onAuthStateChanged((user) => {
  if (user) {
    firebase
      .database()
      .ref(`users/${user.uid}`)
      .on('value', (snapshot) => {
        document.querySelector('#username').innerHTML = `${
          snapshot.val().firstName
        } ${snapshot.val().lastName}`;
      });
    document.querySelector('#update-profile').addEventListener('click', (e) => {
      window.location.href = 'updateProfile.html?id=' + user.uid;
    });

    /*  firebase
      .database()
      .ref(`users/${user.uid}`)
      .on('value', (snapshot) => {
        const image = snapshot.val().image;
        storage
          .ref(`users/${user.uid}/${image}`)
          .getDownloadURL()
          .then((imgUrl) => {
            let img = document.createElement('img');
            img.classList.add('img-auth');
            img.addEventListener('click', (e) => {
              window.location.href = 'updateProfile.html?id=' + user.uid;
            });
            img.src = imgUrl;
            document.querySelector('#img').appendChild(img);
          });
      });*/
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
