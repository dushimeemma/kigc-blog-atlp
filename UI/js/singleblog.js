//get the id
let urlParams = new URLSearchParams(location.search);
let id = urlParams.get('id');

//reference to firebase
let db = firebase.database();
let articleRef = db.ref('article').child(id);

//display an article in html
articleRef.on('value', (snapshot) => {
  let article = document.createElement('article');
  article.classList.add('blog-content');
  article.classList.add('text-black');
  article.classList.add('border-radius');
  article.classList.add('p');
  article.classList.add('mt');
  article.innerHTML = `          <h3 class="m-bottom capitalize">${
    snapshot.val().title
  }</h3>
  <p class="m-bottom">
   ${snapshot.val().body}
  </p>
  <h6 class="text-center capitalize m-bottom">leave your comment here</h6>
  <form class="mb">
    <div class="form-group">
      <textarea name="" id="" cols="10" rows="3">
Your Comment Here ...</textarea
      >
    </div>
    <button class="float-right mb">Comment</button>
  </form>`;
  document.querySelector('#articles').appendChild(article);
});
