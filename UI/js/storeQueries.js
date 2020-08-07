//block unauthorized user
auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = 'login.html';
  }
});
let tableQuestions = document.querySelector('#my-table');
let tableArticles = document.querySelector('#table-article');
let articleArea = document.querySelector('#article');
let questionArea = document.querySelector('#question');
let viewA = document.querySelector('#viewA');
let viewQ = document.querySelector('#viewQ');
//init ref to firebase database
const queriesRef = db.ref('queries');

//retrieve queries from db and display it to a table
queriesRef.on('child_added', (snapshot) => {
  let email = snapshot.val().email;
  let queries = snapshot.val().message;
  let id = snapshot.key;
  let row = tableQuestions.insertRow(tableQuestions.rows.length);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  cell1.innerHTML = email;
  cell2.innerHTML = queries;
  cell3.innerHTML =
    `<td><img src="./images/delete-2.jpg" class="m-icon pointer icon"onclick="onClickDelete('` +
    id +
    `')"/></td>`;

  let count = tableQuestions.rows.length;
  let displayCount = document.querySelector('#count-questions');
  displayCount.innerHTML = `${count - 1} Questions`;
  displayCount.addEventListener('click', (e) => {
    articleArea.style.display = 'none';
    questionArea.style.display = 'block';
    tableQuestions.style.width = '100% !important';
  });
});
//retrieve articles
//init ref to firebase database
const articlesRef = db.ref('article');

//retrieve queries from db and display it to a table
articlesRef.on('child_added', (snapshot) => {
  let title = snapshot.val().title;
  let body = snapshot.val().body;
  let id = snapshot.key;
  let row = tableArticles.insertRow(tableArticles.rows.length);
  let cell1 = row.insertCell(0);
  // let cell2 = row.insertCell(1);
  let cell2 = row.insertCell(1);
  cell1.innerHTML = title;
  // cell2.innerHTML = body;
  cell2.innerHTML =
    `<img src="./images/update-1.png" class="m-icon icon pointer" onclick="onClickUpdate('` +
    id +
    `')"/><td><img src="./images/delete-2.jpg" class="m-icon pointer icon"onclick="onClickDeleteA('` +
    id +
    `')"/></td>`;
  cell1.style.cursor = 'pointer';
  cell1.addEventListener('click', (e) => {
    window.location.href = 'singleblog.html?id=' + id;
  });
  let count = tableArticles.rows.length;
  let displayCount = document.querySelector('#count-articles');
  displayCount.innerHTML = `${count - 1} Articles`;
  displayCount.addEventListener('click', (e) => {
    questionArea.style.display = 'none';
    articleArea.style.display = 'block';
    tableArticles.style.width = '100% !important';
  });
});
//delete questions
function onClickDelete(id) {
  auth.onAuthStateChanged((user) => {
    if (user.email === 'dushimeemma@gmail.com') {
      queriesRef
        .child(id)
        .remove()
        .then(() => {
          window.location.href = 'dashboard.html';
        });
    } else {
      alert('you are not system admin');
    }
  });
}
//delete articles
function onClickDeleteA(id) {
  auth.onAuthStateChanged((user) => {
    if (user.email === 'dushimeemma@gmail.com') {
      articlesRef
        .child(id)
        .remove()
        .then(() => {
          window.location.href = 'dashboard.html';
        });
    } else {
      alert('you are not system admin');
    }
  });
}
//update article
function onClickUpdate(id) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      window.location.href = 'updateArticle.html?id=' + id;
    } else {
      alert('you are not system admin');
    }
  });
}
//update profile
let updateBtn = document.querySelector('#update-profile');
updateBtn.addEventListener('click', (e) => {
  auth.onAuthStateChanged((user) => {
    window.location.href = 'updateProfile.html?id=' + user.uid;
  });
});
//view articles using links
viewA.addEventListener('click', (e) => {
  e.preventDefault();
  questionArea.style.display = 'none';
  articleArea.style.display = 'block';
  tableArticles.style.width = '100% !important';
});
viewQ.addEventListener('click', (e) => {
  e.preventDefault();
  articleArea.style.display = 'none';
  questionArea.style.display = 'block';
  tableQuestions.style.width = '100% !important';
});
//get user location
let clocation = document.querySelector('#locate-me');

if ('geolocation' in navigator) {
  navigator.geolocation.watchPosition(
    (postion) => {
      clocation.innerHTML = `<p class="text-black">Your current postion is:<br/> latitude:${postion.coords.latitude}&deg; <br/> longitude:${postion.coords.longitude}&deg;</p>`;
    },
    (err) => {
      console.log(err);
    }
  );
}
