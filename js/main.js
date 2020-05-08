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
var restaurantTitle = document.querySelector('.restaurant-title');
var rating = document.querySelector('.rating');
var minPrice = document.querySelector('.price');
var category = document.querySelector('.category');

var getData = async function(url){
  var response = await fetch(url);
  if(!response.ok){
     throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}!`);
  }
  return await response.json();
};

getData('./db/partners.json');

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

function createCard(restaurant) {
  var { image, kitchen, name, price, products, stars, time_of_delivery: timeOfDelivery } = restaurant;

  var card = `<a class="card card-restaurant" data-products="${products}"
                  data-info="${[name, price, stars, kitchen]}">
						<img src="${image}" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">${name}</h3>
								<span class="card-tag tag">${timeOfDelivery} мин.</span>
							</div>
							<div class="card-info">
								<div class="rating">
									${stars}
								</div>
								<div class="price">От ${price} ₽</div>
								<div class="category">${kitchen}</div>
							</div>
						</div>
          </a>
          `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card);
}


function createCardGood(goods) {

  var { description, id, image, name, price } = goods;

  var card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `
						<img src="${image}" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">${name}</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">${description}</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">${price} ₽</strong>
							</div>
						</div>
  `);
  cardsMenu.insertAdjacentElement('beforeend', card);
}


function openGoods(event){
  var target = event.target;
  var restaurant = target.closest('.card-restaurant');
  if (restaurant){
     
     var info = restaurant.dataset.info.split(",");
    var [ name, price, stars, kitchen ] = info;



    cardsMenu.textContent = '';
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');
     
    restaurantTitle.textContent = name;
    rating.textContent = stars;
    minPrice.textContent = `От ${price} ₽`;
    category.textContent = kitchen;
   

    getData(`./db/${restaurant.dataset.products}`).then(function (data) {
      data.forEach(createCardGood);
    }); 
  }
}
    getData('./db/partners.json').then(function (data) {
      data.forEach(createCard);
    });



cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click', function(){
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
});