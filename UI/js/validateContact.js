//init ref to firebase database
const queriesRef = db.ref('queries');

//function to validate email
function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
//get form element
let contactForm = document.querySelector('#contact-form');
let emailInput = contactForm['email'];
let messageInput = contactForm['message'];
let errors = document.querySelector('#errors');

//get errors div
let emailErrors = document.querySelector('#emailErrors');
let messageErrors = document.querySelector('#messageErrors');

//form validation
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (emailInput.value === '' || messageInput.value === '') {
    emailInput.style.border = '1px solid var(--danger)';
    messageInput.style.border = '1px solid var(--danger)';
    emailErrors.style.display = 'block';
    messageErrors.style.display = 'block';
    emailErrors.innerText = 'email is required';
    messageErrors.innerText = 'message is required';
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
  if (messageInput.value.length > 0 && messageInput.value.length > 250) {
    messageInput.style.border = '1px solid var(--success)';
    messageErrors.style.display = 'block';
    messageErrors.innerText = 'question must not exceed 250 words';
  }
  if (messageInput.value.length > 0 && messageInput.value.length <= 250) {
    messageInput.style.border = '1px solid var(--success)';
    messageErrors.style.display = 'none';
  }
  if (
    emailInput.value.length > 0 &&
    validateEmail(emailInput.value) === true &&
    messageInput.value.length > 0 &&
    messageInput.value.length <= 250
  ) {
    queriesRef
      .push()
      .set({
        email: emailInput.value,
        message: messageInput.value,
      })
      .then(() => {
        errors.style.display = 'block';
        errors.innerHTML =
          '<p class="success capitalize text-center">Your question is successfully send</p>';
        contactForm.reset();
        setTimeout(() => errors.remove(), 5000);
      })
      .catch((err) => {
        errors.style.display = 'block';
        errors.innerHTML = `<p class="danger capitalize text-center">${err.message}</p>`;
        setTimeout(() => errors.remove(), 5000);
      });
  }
});
