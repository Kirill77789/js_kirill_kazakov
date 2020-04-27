/*const products = [
  {id: 1, title: 'Notebook', price: 20000},
  {id: 2, title: 'Mouse', price: 1500},
  {id: 3, title: 'Keyboard', price: 5000},
  {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = (title, price) => {
  return `<div class="product-item">
  					<div class="prod_img"></div>
            <h3>${title}</h3>
            <p>${price}</p>
            <button class="by-btn">Добавить в корзину</button>
          </div>`;
};

const renderProducts = (list) => {
  // const productList = list.map((good) => {
  //   return renderProduct(good.title, good.price);
  // });
  const productList = [];
  list.forEach(good => {
    productList.push(renderProduct(good.title, good.price));
  });
  console.log(productList);
  document.querySelector('.products').innerHTML = productList.join('');
};

renderProducts(products);*/

class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._fetchProducts();
    this._render();
  }

  _fetchProducts() {
    this.goods = [
      {id: 1, title: 'Notebook', price: 20000},
      {id: 2, title: 'Mouse', price: 1500},
      {id: 3, title: 'Keyboard', price: 5000},
      {id: 4, title: 'Gamepad', price: 4500},
    ]
  }

  _render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
}

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="by-btn">Купить</button>
                </div>
            </div>`;
  }
}
new ProductList();

//Домашнее задание №2

class Bascket {
  constructor(  ) {
    this.costs = 0;
    this.selectedProducts = [{id: 1, title: 'Notebook', price: 20000},
      {id: 2, title: 'Mouse', price: 1500},];
    this._cart();
  }
  _cart(){
    document.querySelector('.btn-cart').addEventListener('click', this._cartRender.bind(this))
  }
  _cartRender(){
    if(document.querySelector('.cart') == undefined){
      let cartProducts = `<div class="cart cart-on">`;
      for(let element of this.selectedProducts){
        let product = new BasketItem(element);
        cartProducts += product.render();
      }
      cartProducts += `<div class="cost">Стоимость выбранных товаров: ${this._cartCosts()} \u20bd</div>`;
      cartProducts += `<button class="by-btn cart-btn">Оформить</button></div>`;
      const block = document.querySelector('header');
      block.insertAdjacentHTML('beforeend', cartProducts);
    }else if (document.querySelector('.cart-on') == undefined) {
      document.querySelector('.cart').classList.add('cart-on');
      document.querySelector('.cart').classList.remove('cart-of');
    }else{
      document.querySelector('.cart').classList.add('cart-of');
      document.querySelector('.cart').classList.remove('cart-on');
    }

  }
  _cartCosts(){
    for(let element of this.selectedProducts){
      this.costs += element.price;
    }
    return this.costs;
  }
}

class BasketItem {
  constructor(element, img = 'https://placehold.it/200x150') {
    this.id = element.id;
    this.img = img;
    this.title = element.title;
    this.price = element.price;
  }
  render(){
    return `<div class="cart-item" data-id="${this.id}">
                <img class ="cartImg" src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                </div>
            </div>`;
  }
}
new Bascket();
