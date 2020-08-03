const menu = document.getElementById('menu');
const closeBtn = document.getElementById('close');
const nav = document.getElementById('nav');
const main = document.getElementById('main');
const footer = document.getElementById('footer');
footer.innerHTML = `&copy; ${new Date().getFullYear()} KIGC Ltd.`;

menu.addEventListener('click', onClick);
closeBtn.addEventListener('click', onClose);
window.addEventListener('click', outsideClose);

function onClick() {
  nav.style.display = 'block';
}
function onClose() {
  nav.style.display = 'none';
}
/*function outsideClose(e) {
  if (e.target != menu) {
    nav.style.display = 'none';
  }
}*/
