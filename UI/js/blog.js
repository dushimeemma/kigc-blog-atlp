//create reference to firebase
let articleRef = db.ref('article');

//display article on blog app
articleRef.on('value', (snapshot) => {
  snapshot.forEach((childsnapshot) => {
    let id = childsnapshot.key;
    let article = document.createElement('article');
    article.classList.add('blog-content');
    article.classList.add('text-black');
    article.classList.add('border-radius');
    article.classList.add('p');
    article.classList.add('mt');
    article.classList.add('mb');
    article.innerHTML =
      `    <h3 class="m-bottom capitalize">${childsnapshot.val().title}</h3>
    <p class="m-bottom">
     ${childsnapshot.val().body}
    </p>
   
      <button class="float-right mb" onclick="onClickRead('` +
      id +
      `')">Read More</button>
    `;
    document.querySelector('#articles').appendChild(article);
  });
});

//read more function
function onClickRead(id) {
  window.location.href = 'singleblog.html?id=' + id;
}
