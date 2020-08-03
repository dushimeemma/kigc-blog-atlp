//get element
let articleForm = document.querySelector('#article-form');
let title = articleForm['title'];
let body = articleForm['body'];
let errors = document.querySelector('#errors');

//init firebase database ref
let db = firebase.database();
let articleRef = db.ref('article');

articleForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (title.value === '' || body.value === '') {
    errors.style.display = 'block';
    errors.innerHTML =
      '<p class="text-center capitalize danger">both fields are required</p>';
    setTimeout(() => errors.remove(), 5000);
  }
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
});
