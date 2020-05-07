var cartButton = document.querySelector("#cart-button");
var modal = document.querySelector(".modal");
var close = document.querySelector(".close");
var buttonAuth = document.querySelector('.button-auth');
var modalAuth = document.querySelector('.modal-auth');
var closeAuth = document.querySelector('.close-auth');
var logInForm = document.querySelector('#logInForm');
var login = localStorage.getItem('logName');
var loginInput = document.querySelector('#login');
var userName = document.querySelector('.user-name');
var outAuth = document.querySelector('.button-out');
var cardsRestaurants = document.querySelector('.cards-restaurants');
var containerPromo = document.querySelector('.container-promo');
var restaurants = document.querySelector('.restaurants');
var menu = document.querySelector('.menu');
var logo = document.querySelector('.logo');
var cardsMenu = document.querySelector('.cards-menu');


function toggleModalAuth(){
  modalAuth.classList.toggle('is-open');
}

function toggleModal() {
  modal.classList.toggle("is-open");
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

function createCard() {
  var card = `<a class="card card-restaurant">
						<img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">Тануки</h3>
								<span class="card-tag tag">60 мин</span>
							</div>
							<div class="card-info">
								<div class="rating">
									4.5
								</div>
								<div class="price">От 1 200 ₽</div>
								<div class="category">Суши, роллы</div>
							</div>
						</div>
          </a>
          `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

createCard();
createCard();
createCard();


function createCardGood() {
  var card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `
						<img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">Пицца Классика</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
									грибы.
								</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">510 ₽</strong>
							</div>
						</div>
  `);
  cardsMenu.insertAdjacentElement('beforeend', card);
}


function openGoods(event){
  var target = event.target;
  var restaurant = target.closest('.card-restaurant');
  if (restaurant){
    cardsMenu.textContent = '';
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');
    createCardGood();
    createCardGood();
    createCardGood();
  }
}
cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click', function(){
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
});