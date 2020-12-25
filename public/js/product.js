new Swiper('.product-slider', {
	navigation: {
		nextEl: '.product-slider-button-next',
		prevEl: '.product-slider-button-prev'
	},

	slidesPerView: 1,

	simulateTouch: false,
	
	
	thumbs: {
		swiper: {
			el: '.product-mini-slider',
			slidesPerView: 3,
			spaceBetween: 11,
			slidesPerGroup: 1,
		}
	}
});