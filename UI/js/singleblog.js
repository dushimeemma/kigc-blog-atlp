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
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      article.innerHTML = `          <h3 class="m-bottom capitalize">${
        snapshot.val().title
      }</h3>
      <p class="m-bottom">
       ${snapshot.val().body}
      </p>
      <h6 class="text-center capitalize m-bottom">leave your comment here</h6>
      <div class="errors text-center" id="errors"></div>
      <form class="mb" id="form-comment">
        <div class="form-group">
          <textarea name="comment" cols="10" rows="3" id="comment"></textarea
          >
        </div>
        <img src="./images/viewcomment.png" alt="view comment" class="icon m-icon i-class" id="view" /><img src="./images/close.png" alt="view comment" class="icon m-icon i-class errors" id="close-comment" /> <button class="float-right mb">Comment</button>
      </form>
<div class="comment text-black" id="comment-area">
    <h3 class="text-center">Comments</h3> <hr/>
</div>`;
    } else {
      article.innerHTML = `<h3 class="m-bottom capitalize">${
        snapshot.val().title
      }</h3>
      <p class="m-bottom">
       ${snapshot.val().body}
      </p>`;
    }
    //allow user to leave a comment
    let formComment = document.querySelector('#form-comment');
    let comment = formComment['comment'];
    let errors = document.querySelector('#errors');

    formComment.addEventListener('submit', (e) => {
      e.preventDefault();
      if (comment.value === '') {
        errors.style.display = 'block';
        errors.innerHTML = 'blank comment is not allowed';
        setTimeout(() => errors.remove(), 5000);
        formComment.reset();
      } else {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            firebase
              .database()
              .ref(`comments/${id}`)
              .push()
              .set({
                comment: comment.value,
                author: user.uid,
              })
              .then(() => {
                errors.style.display = 'block';
                errors.innerHTML = '<p class="success">comment send</p>';
                setTimeout(() => errors.remove(), 5000);
                formComment.reset();
              });
          }
        });
      }
    });
    //show comments
    document.querySelector('#view').addEventListener('click', (e) => {
      let com = document.querySelector('#comment-area');
      com.style.display = 'block';
      firebase
        .database()
        .ref(`comments/${id}`)
        .on('child_added', (snapshot) => {
          firebase.auth().onAuthStateChanged((user) => {
            firebase
              .database()
              .ref(`users/${user.uid}`)
              .on('value', (snapshotUser) => {
                let p = document.createElement('p');
                p.innerHTML = `&middot;${snapshot.val().comment} - by ${
                  snapshotUser.val().firstName
                } ${snapshotUser.val().lastName}<hr/>`;
                com.appendChild(p);
              });
          });
        });
      document.querySelector('#view').addEventListener('click', (e) => {
        com.style.display = 'none';
        window.location.href = 'singleblog.html?id=' + id;
      });
    });
  });

  document.querySelector('#articles').appendChild(article);
});
