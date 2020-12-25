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


class Cart {
    constructor(cartContainer) {
      this.cartContainer = cartContainer;
      this.cart = JSON.parse(localStorage['cart'] || '{}');
      this.addEventListeners();
      this.updateBadge();
    }
    
    addEventListeners() {
      this.cartContainer.on('show.bs.modal', () => this.renderCart());
      this.cartContainer.find('.order').click(ev => this.order(ev));
    }
    addProduct(id) {
      this.cart[id] = (this.cart[id] || 0) + 1;
      this.saveCart();
      this.updateBadge();
    }
    deleteProduct(id) {
      if (this.cart[id] > 1) {
        this.cart[id] -= 1;
      } else {
        delete this.cart[id];
      }
      this.saveCart();
      this.updateBadge();
    }
    saveCart() {
      localStorage['cart'] = JSON.stringify(this.cart);
    }
    renderCart() {
      let total = 0;
      let cartDomSting = `<div class="container">
                  <div class="row">
                      <div class="col-5"><strong>Product</strong></div>
                      <div class="col-3"><strong>Price</strong></div>
                      <div class="col-2"><strong>Quantity</strong></div>
                  </div>`;
      for (const id in this.cart) {
        const product = productList.getProductById(id);
        total += product.price * this.cart[id];
        cartDomSting += `<div class="row" data-id="${id}"> 
                      <div class="col-5">${product.title}</div>
                      <div class="col-3">${product.price}</div>
                      <div class="col-2">${this.cart[id]}</div>
                      <div class="col-1"><button class="btn btn-sm plus">+</button></div>
                      <div class="col-1"><button class="btn btn-sm minus">-</button></div>
                  </div>`;
      }
      total = total.toFixed(2);
      cartDomSting += `
                  <div class="row">
                      <div class="col-5"><strong>TOTAL</strong></div>
                      <div class="col-3"><strong>$${total}</strong></div>
                  </div>            
          </div>`;
      this.cartContainer.find('.cart-product-list-container').html(cartDomSting);
      this.cartContainer
        .find('.plus')
        .click(ev => this.changeQuantity(ev, this.addProduct));
      this.cartContainer
        .find('.minus')
        .click(ev => this.changeQuantity(ev, this.deleteProduct));
    }
    changeQuantity(ev, operation) {
      const button = $(ev.target);
      const id = button
        .parent()
        .parent()
        .data('id');
      operation.call(this, id);
      this.renderCart();
    }
    updateBadge() {
      $('#cart-badge').text(Object.keys(this.cart).length);
    }
    order(ev) {
      const form = this.cartContainer.find('form')[0];
      if (form.checkValidity()) {
        ev.preventDefault();
        fetch('order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            clientName: document.querySelector('#client-name').value,
            clientEmail: document.querySelector('#client-email').value,
            cart: this.cart
          })
        })
          .then(response => response.text())
          .then(responseText => {
            form.reset();
            this.cart = {};
            this.saveCart();
            this.updateBadge();
            this.renderCart();
            window.showAlert('Thank you! ' + responseText);
            this.cartContainer.modal('hide');
          })
          .catch(error => showAlert('There is an error: ' + error, true));
      } else {
        window.showAlert('Please fill all fields', false);
      }
    }
  }
  


  class ProductList {
    constructor(productsUrl, renderContainer, cart) {
      this.cart = cart;
      fetch(productsUrl)
        .then(result => result.json())
        .then(products => {
          this.products = products;
          this.renderProducts(renderContainer, products);
          this.addEventListeners();
        });
    }
    getProductById(id) {
      return this.products.find(el => el.id === id);
    }
    renderProducts(container, products) {
      let productListDomString = '';
      products.forEach(product => {
        productListDomString += 
                  `<div class="carts-product__col">
                  <div class="carts-product__item">
                      <div class="carts-product__img">
                          <img src="${product.image}" alt="${product.image}">
                      </div>
                      <div class="carts-product__prod-name">${product.image}</div>
                      <div class="carts-product__text">
                          <p>
                            ${product.description}
                          </p>
                      </div>
                      <div class="carts-product__price">
                          <span>
                              ${product.cost} грн.
                          </span>
                      </div>
                      <button class="carts-product__button btn" type="button">Купити</button>
                  </div>
              </div>`;
      });
      container.html(productListDomString);
    }
    addEventListeners() {
      $('#productInfoModal').on('show.bs.modal', event => {
        const button = $(event.relatedTarget); // Button that triggered the modal
        const id = String(button.data('id')); // Extract info from data-* attributes
        const product = this.getProductById(id);
        const modal = $('#productInfoModal');
        modal
          .find('.modal-body .card-img-top')
          .attr('src', 'img/products/' + product.image)
          .attr('alt', product.title);
        modal.find('.modal-body .card-title').text(product.title);
        modal.find('.modal-body .card-text').text(product.description);
        modal
          .find('button.buy')
          .text(`${product.price} - Buy`)
          .data('id', id);
      });
      $('.card.product button.buy, #productInfoModal button.buy').click(event => {
        const button = $(event.target);
        const id = button.data('id');
        this.cart.addProduct(id);
        window.showAlert('Product added to cart');
      });
    }
  }
  


const cart = new Cart($('#cartModal'));

const productList = new ProductList(
	'../data/goods.json',
	$('.product-container'),
	cart
)	