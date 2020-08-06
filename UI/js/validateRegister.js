//reference auth firebase database
const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.database();
//function to validate email
function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
//get form element
let registerForm = document.querySelector('#register-form');
let errors = document.querySelector('#errors');
let fnameInput = registerForm['first-name'];
let lnameInput = registerForm['last-name'];
let emailInput = registerForm['email'];
let passwordInput = registerForm['password'];

//get errors div
let fnameErrors = document.querySelector('#fnameErrors');
let lnameErrors = document.querySelector('#lnameErrors');
let emailErrors = document.querySelector('#emailErrors');
let passwordErrors = document.querySelector('#passwordErrors');
let file = {};

//onchange first
//registerForm['file'].addEventListener('change', (e) => {
// file = e.target.files[0];
//form validation
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (
    fnameInput === '' ||
    lnameInput == '' ||
    emailInput.value === '' ||
    passwordInput.value === ''
  ) {
    lnameInput.style.border = '1px solid var(--danger)';
    fnameInput.style.border = '1px solid var(--danger)';
    emailInput.style.border = '1px solid var(--danger)';
    passwordInput.style.border = '1px solid var(--danger)';
    fnameErrors.style.display = 'block';
    lnameErrors.style.display = 'block';
    emailErrors.style.display = 'block';
    passwordErrors.style.display = 'block';
    lnameErrors.innerText = 'last name is required';
    fnameErrors.innerText = 'first name is required';
    emailErrors.innerText = 'email is required';
    passwordErrors.innerText = 'password is required';
  }
  if (fnameInput.value.length > 0 || lnameInput.value.length > 0) {
    fnameInput.style.border = '1px solid var(--success)';
    lnameInput.style.border = '1px solid var(--success)';
    fnameErrors.style.display = 'none';
    lnameErrors.style.display = 'none';
  }
  if (
    emailInput.value.length > 0 &&
    validateEmail(emailInput.value) === false
  ) {
    emailInput.style.border = '1px solid var(--danger)';
    emailErrors.innerText = 'please enter a valid email';
  }

  if (emailInput.value.length > 0 && validateEmail(emailInput.value) === true) {
    emailInput.style.border = '1px solid var(--success)';
    emailErrors.style.display = 'none';
  }
  if (passwordInput.value.length > 0 && passwordInput.value.length < 8) {
    passwordInput.style.border = '1px solid var(--danger)';
    passwordErrors.style.display = 'block';
    passwordErrors.innerText = 'password must contain atleast 8 characters';
  }
  if (passwordInput.value.length > 0 && passwordInput.value.length >= 8) {
    passwordInput.style.border = '1px solid var(--success)';
    passwordErrors.style.display = 'none';
  }
  auth
    .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then((auth) => {
      //storage.ref(`users/${auth.user.uid}/${file.name}`).put(file);
      db.ref(`users/${auth.user.uid}`).set({
        firstName: fnameInput.value,
        lastName: lnameInput.value,
        // image: file.name,
      });
      errors.style.display = 'block';
      errors.innerHTML =
        '<p class="text-center success capitalize">User created successfully</p>';
      window.location.href = 'dashboard.html';
    })
    .catch((err) => {
      errors.style.display = 'block';
      errors.innerHTML = `<p class="text-center danger capitalize">${err.message}</p>`;
      setTimeout(() => errors.remove(), 5000);
    });
});
//});
