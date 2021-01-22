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

document.querySelector('#order-form').onsubmit = function(event) {
	event.preventDefault();

	let username = document.querySelector('#name').value.trim();
	let usersurname = document.querySelector('#surname').value.trim();
	let phone = document.querySelector('#phone').value.trim();
	let mail = document.querySelector('#e-mail').value.trim();
	let nova = document.querySelector('#nova').value;
	let ukr = document.querySelector('#ukr').value;

	if (!document.querySelector('#ruleradio').checked) {
		//не згоден
		Swal.fire({
			title: 'Попередження',
			text: 'Прочитайте і підтвердіть правила.',
			type: 'info',
			confirmButtonText: 'Ок'
		});

		return false;
	}

	function ValidMail(mail) {
		let re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
		let valid = re.test(mail);
		if (valid) {
			Swal.fire({
				title: 'Попередження',
				text: 'Емейл введено не коректно.',
				type: 'info',
				confirmButtonText: 'Ок'
			});
	
			return false;
		} else {
			return valid;
		}
		
	}
	 
	function ValidPhone(phone) {
		let re = /^\d[\d\(\)\ -]{4,14}\d$/;
		let valid = re.test(phone);
		if (valid) {
			Swal.fire({
				title: 'Попередження',
				text: 'Номер телефона введено не коректно.',
				type: 'info',
				confirmButtonText: 'Ок'
			});
	
			return false;
		} else {
			return valid;
		}
	} 
	
	ValidPhone();
	ValidMail();
	 

	if (username == '' || usersurname == '' || (nova == '' && ukr == '')) {
		Swal.fire({
			title: 'Попередження',
			text: 'Заповніть усі поля.',
			type: 'info',
			confirmButtonText: 'Ок'
		});

		return false;
	}

	fetch('/finish-order', {
		method: 'POST',
		body: JSON.stringify({
			'username': username,
			'phone': phone,
			'usersurname': usersurname,
			'mail': mail,
			'nova': nova,
			'ukr': ukr,
			'key': JSON.parse(localStorage.getItem('cart'))
		}),
		headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        }
	})
	.then(function (response) {
		return response.text();
	})
	.then(function (body) {
		if (body == 1) {
			console.log('Success!');
			Swal.fire({
				title: 'Успіх',
				text: 'Замовлення успішно відправлено. Очікуйте поки з Вами зв\'яжеться менеджер.',
				type: 'info',
				confirmButtonText: 'Ok'
			});
		} else {
			console.log('Failed!');
			Swal.fire({
				title: 'Проблеми з емейлом',
				text: 'Помилка, спробуйте знову',
				type: 'error',
				confirmButtonText: 'Ok'
			});
		}
	})
}