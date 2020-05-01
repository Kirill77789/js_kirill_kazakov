//ДЗ №3
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// Переделать в ДЗ
let getRequest = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    let objStatus = new Promise((resolve, reject) => { //У данного promise оставил только resolve т.к. xhr.readyState
      // проходит последовательные состояния 2, 3, 4, а на состояниях  2 и 3 происходит вывод reject
      if (xhr.readyState === 4) {
        resolve(
            new Promise( (resolve, reject) => {
                if (xhr.status == 200) {
                  resolve(cb(xhr.responseText));
                } else {
                  reject(`Ошибка: ${xhr.status}`);
                }
              })
      );
      }
    });
    objStatus.then((data) => {console.log(data)}).then((data) => {console.log(data)}).catch((data) => {console.log(data)});
  };
  xhr.send();
};



class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._fetchProducts();
  }

  _fetchProducts() {
  getRequest('./tel.json', (data)=>{
  console.log(data);
    this.goods = JSON.parse(data);
    this._render();
    new Bascket();
  });
  }


  _render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());

    }
  };
}

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item product-info" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="by-btn btn-increase">Добавить в корзину</button>
                </div>
            </div>`;
  }
}
new ProductList();

//Домашнее задание №2

class Bascket {
  constructor(  ) {
    this.costs = 0;
    this.selectedProducts = [{id: 1, title: 'Notebook', price: 20000, amt: 1},
      {id: 2, title: 'Mouse', price: 1500, amt: 2}];
    this._cart();
    this._addToCart('.btn-increase');
  }

  _addToCart(obj){
    document.querySelectorAll(obj).forEach((element) => {
      element.addEventListener('click', (event)=>{
        let id = event.target.closest('.product-info').getAttribute('data-id');
        if(this.selectedProducts == undefined){
          getRequest('./tel.json', (data) => {
            JSON.parse(data).forEach((elem) => {
              if(elem['id'] == id){
                this.selectedProducts[0] = elem;
                this.selectedProducts[0].amt = 1;
              }
            });
          })
        }else{
          getRequest('./tel.json', (data) => {
            let washere = false;
            JSON.parse(data).forEach((elem) => {
              if(elem['id'] == id){
                this.selectedProducts.forEach((element) => {
                  if(element['id'] == id){
                    washere = true;
                  }else{
                  };
                });
              }
            });
            if(washere){
              this.selectedProducts.forEach((element) => {
                if(element['id'] == id){
                  element['amt'] += 1;
                  this._pererender();
                }
              });
            }else{
              JSON.parse(data).forEach((element2) => {
                if(element2['id'] == id){
                  let newElem = element2;
                  newElem['amt'] = 1;
                  this.selectedProducts.push(newElem);
                  this._pererender();
                }
              });
            }
          })
        }
      })
    })
  };

  _delitFromCart(obj){
    document.querySelectorAll(obj).forEach((element) => {
      element.addEventListener('click', (event)=>{
        let id = event.target.closest('.product-info').getAttribute('data-id');
        let newProducts = new Array();
        this.selectedProducts.forEach((item) => {
          if(id != item['id']){
            newProducts.push(item);
          }
        });
        this.selectedProducts.splice(0, (this.selectedProducts.length + 1));
        this.selectedProducts = [...newProducts];
        this._pererender();
      })
    })
  };

  _cart(){
    document.querySelector('.btn-cart').addEventListener('click', this._cartRender.bind(this))
  }
  _cartDraw(){
    let cartProducts = `<div class="cart cart-on">`;
    for(let element of this.selectedProducts){
      let product = new BasketItem(element);
      cartProducts += product.render();
    }
    cartProducts += `<div class="cost">Стоимость выбранных товаров: ${this._cartCosts()} \u20bd</div>`;
    cartProducts += `<button class="by-btn cart-btn">Оформить</button></div>`;
    const block = document.querySelector('header');
    block.insertAdjacentHTML('beforeend', cartProducts);
    this._addToCart('.item-btn');
    this._delitFromCart('.btn-del');
  }
  _cartRender(){
    if(document.querySelector('.cart') == undefined){
      this._cartDraw();
    }else{
      document.querySelector('.cart').remove();
    }
  }
  _pererender(){
    if(document.querySelector('.cart') !== undefined){
      document.querySelector('.cart').remove();
      this._cartRender();
    }
  }
  _cartCosts(){
    this.costs = 0;
    for(let element of this.selectedProducts){
      this.costs += (element.price * element.amt);
    }
    return this.costs;
  }
}

class BasketItem {
  constructor(element, img = 'https://placehold.it/200x150') {
    this.amt = element.amt;
    this.id = element.id;
    this.img = img;
    this.title = element.title;
    this.price = element.price;
  }
  render(){
    return `<div class="cart-item product-info" data-id="${this.id}">
                <img class ="cartImg" src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <p>количество:&nbsp${this.amt}&nbspшт. </p>
                </div>
                <div class="auxiliary">
                    <button class="by-btn item-btn btn-increase">добавить</button>
                    <button class="by-btn btn-del">Удалить</button>
                </div>
            </div>`;
  }
}
