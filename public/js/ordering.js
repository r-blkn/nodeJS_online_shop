let header__burger = document.querySelector('.header__burger');
let header_menu = document.querySelector('.header__right');
let back = document.querySelector('body');
let header__list = document.querySelector('.header__list');
let header__logo = document.querySelector('.header__logo');
let form_ordering__image = document.querySelector('.form-ordering__image');
let form_ordering__sublist = document.querySelector('.form-ordering__sublist');


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

form_ordering__image.onclick = function() {
	form_ordering__sublist.classList.toggle('active');
}

form_ordering__image.onclick = function(){
	form_ordering__sublist.classList.remove('active');
}
