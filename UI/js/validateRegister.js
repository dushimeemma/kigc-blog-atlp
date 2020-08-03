//function to validate email
function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
//get form element
let registerForm = document.querySelector('#register-form');
let nameInput = registerForm['name'];
let emailInput = registerForm['email'];
let passwordInput = registerForm['password'];

//get errors div
let nameErrors = document.querySelector('#nameErrors');
let emailErrors = document.querySelector('#emailErrors');
let passwordErrors = document.querySelector('#passwordErrors');

//form validation
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (
    nameInput.value === '' ||
    emailInput.value === '' ||
    passwordInput.value === ''
  ) {
    nameInput.style.border = '1px solid var(--danger)';
    emailInput.style.border = '1px solid var(--danger)';
    passwordInput.style.border = '1px solid var(--danger)';
    nameErrors.style.display = 'block';
    emailErrors.style.display = 'block';
    passwordErrors.style.display = 'block';
    nameErrors.innerText = 'name is required';
    emailErrors.innerText = 'email is required';
    passwordErrors.innerText = 'password is required';
  }
  if (nameInput.value.length > 0) {
    nameInput.style.border = '1px solid var(--success)';
    nameErrors.style.display = 'none';
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
});
