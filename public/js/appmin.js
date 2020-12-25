let header__burger = document.querySelector('.header__burger');
let header_menu = document.querySelector('.header__right');
let back = document.querySelector('body');
let header__list = document.querySelector('.header__list');
let header__logo = document.querySelector('.header__logo');
let products__item = document.querySelector('.products__item');

header__burger.onclick = function(){
    header__burger.classList.toggle('active');
	 header_menu.classList.toggle('active');
	 header__logo.classList.toggle('active');
    back.classList.toggle('lock');
}

header__list.onclick = function () {
	 header__logo.classList.remove('active');
    header__list.classList.remove('active');
    back.classList.toggle('lock');
}

products__item.onclick = function () {
	products__item.classList.toggle('active');
}

products__item.onclick = function(){
	products__item.classList.remove('active');
}
