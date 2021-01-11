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

    })
    .then(function() {
        console.log(body);
    })
}