let cart = {};

const cartBtn = document.querySelectorAll('.add-to-cart');

cartBtn.forEach(function(el) {
    el.addEventListener('click', addTocart)
})

function addTocart() {
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

function ajaxGetGoodsInfo () {
    return fetch('/get-goods-info', {
        method: 'POST',
        body: JSON.stringify({key: Object.keys(cart)}),
        header: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        }
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (body) {
        console.log('Body: ', body);
    })
}


