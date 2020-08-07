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
