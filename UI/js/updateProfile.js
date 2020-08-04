let uploadForm = document.querySelector('#update-form');
let file = document.querySelector('#file');
let image;
let storageRef = firebase.storage();
let dbRef = firebase.database().ref('profile');

file.addEventListener('change', (e) => {
  image = e.target.files[0];
  let imageRef = storageRef.ref('/images/' + image.name);
  imageRef.put(image).then((snapshot) => {
    uploadForm.addEventListener('click', (e) => {
      e.preventDefault();
      dbRef
        .push()
        .set({
          title: uploadForm['title'].value,
          body: uploadForm['body'].value,
          image: snapshot.metadata.fullPath,
        })
        .then(() => {
          uploadForm.reset();
          window.location.href = 'dashboard.html';
        });
    });
  });
});
