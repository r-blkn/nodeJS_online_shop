let header__burger = document.querySelector('.header__burger');
let header_menu = document.querySelector('.header__right');
let back = document.querySelector('body');
let header__list = document.querySelector('.header__list');
let header__logo = document.querySelector('.header__logo');

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

new Swiper('.image-slider', {
	navigation: {
		nextEl: '.image-slider-button-next',
		prevEl: '.image-slider-button-prev'
	},
	pagination: {
		el: '.swiper-pagination'
	},
	autoheight: true,
});

new Swiper('.news-slider',{
	slidesPerView: 1.4,
});

