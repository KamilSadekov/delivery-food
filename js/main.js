var cartButton = document.querySelector("#cart-button");
var modal = document.querySelector(".modal");
var close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

//day 1 
var buttonAuth = document.querySelector('.button-auth');
var modalAuth = document.querySelector('.modal-auth');
var closeAuth = document.querySelector('.close-auth');
var logInForm = document.querySelector('#logInForm');
var login = localStorage.getItem('logName');
var loginInput = document.querySelector('#login');
var userName = document.querySelector('.user-name');
var outAuth = document.querySelector('.button-out');

function toggleModalAuth(){
  modalAuth.classList.toggle('is-open');
}


function autorized(){
  function logOut() {
        login = null;
        localStorage.removeItem('logName');
        buttonAuth.style.display = '';
        userName.style.display = '';
        outAuth.style.display = '';
        outAuth.removeEventListener('click', logOut);
        checkAuth();
        
  }

    console.log('авторизован');
    userName.textContent = login;
    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    outAuth.style.display = 'block';
    outAuth.addEventListener('click', logOut);
}


function notAuthorized() {
  function logIn(event) {
    event.preventDefault();
    login = loginInput.value;
    localStorage.setItem('logName', login);

    toggleModalAuth();
    buttonAuth.removeEventListener('click', toggleModalAuth);
    closeAuth.removeEventListener('click', toggleModalAuth);
    logInForm.removeEventListener('submit', logIn);
    logInForm.reset();
    checkAuth();
  }
     console.log('не авторизован');
     buttonAuth.addEventListener('click', toggleModalAuth);
     closeAuth.addEventListener('click', toggleModalAuth);
     logInForm.addEventListener('submit' , logIn);
}
function checkAuth(){
  if (login) {
    autorized();
  } else {
    notAuthorized();
  }
}
checkAuth();

