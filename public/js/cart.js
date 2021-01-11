let cartBtnModal = document.querySelector('.header__basket-btn');
let cartBtnModalCon = document.querySelector('.baket-pop-pup__con');
let cartModal = document.querySelector('.basket-pop-pup');
let closeModalBtn = document.querySelector('.basket-pop-pup__close');

cartBtnModal.addEventListener('click', function() {
    cartModal.classList.toggle('basket-open');
});

cartModal.addEventListener('click', function(e) {
    if(e.target.classList.contains('basket-open')) {
        cartModal.classList.toggle('basket-open');
    }
});

cartBtnModalCon.addEventListener('click', function() {
    cartModal.classList.toggle('basket-open');
})

closeModalBtn.addEventListener('click', function() {
    cartModal.classList.toggle('basket-open');
})

let cart = {};

const cartBtn = document.querySelectorAll('.add-to-cart');

cartBtn.forEach(function(el) {
    el.addEventListener('click', addToCart);
})

function addToCart() {
    let goodsId = this.dataset.goods_id;
    console.log('goodsId: ', goodsId);

    if (cart[goodsId]) {
        cart[goodsId]++;
    } else {
        cart[goodsId] = 1;
    }

    console.log(cart);
    ajaxGetGoodsInfo();
}  

function ajaxGetGoodsInfo() {
    fetch('/get-goods-info', {
        method: 'POST',
        body: JSON.stringify({key: Object.keys(cart)}),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        }
    })
    .then(function(response) {
        return response.text();
    })
    .then(function(body) {
        // console.log(body);
        console.log(JSON.parse(body));
        showCart(JSON.parse(body));
    })
}

function showCart(data) {
    let out=` `;

    let total = 0;

    for (let key in cart) {
        out += `<div class="basket-pop-pup__item">
            <div class="basket-pop-pup__top">
            <div class="basket-pop-pup__img">
                <img src="${data[key]['image']}">
            </div>
            <div class="basket-pop-pup__content">
                <h2 class="basket-pop-pup__title">${data[key]['name']}</h2>
                <div class="basket-pop-pup__text">
                    <p>
                        ${data[key]['description']}
                    </p>
                </div>
            </div>
        </div>`;
        total += data[key]['price'] * cart[key];
        out += `<div class="basket-pop-pup-bottom">
            <div class="basket-pop-pup__count">
                <div class="basket-pop-pup__count-inner prod-count">
                    <button class="basket-pop-pup__btn-minus btn-minus" data-goods_id="${key}"></button>
                    <span class="basket-pop-pup__num num">${cart[key]}</span>
                    <button class="basket-pop-pup__btn-plus btn-plus" data-goods_id="${key}"></button>
                </div>
            </div>
            <div class="basket-pop-pup__price body-basket__price"><span>${data[key]['price']}</span> грн</div>
        </div>
    </div>`;
    }
    out += `<div class="basket-pop-up__total basket-full__text">Загальна вартість <span class="span-total">${total.toFixed(2)} грн.</span></div>`;
    document.querySelector('#basket-pop-pup__item').innerHTML = out;

}