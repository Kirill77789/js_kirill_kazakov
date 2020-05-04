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
  getRequest(`${API}/catalogData.json`, (data)=>{
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
    let testText = 'One: \'Hi Mary.\' <strong>aren\'t</strong> Two: \'Oh, hi.\'\n' +
        'One: \'How are you doing?\'\n' +
        'Two: \'I\'m doing alright. How about you?\'\n' +
        'One: \'Not too bad. The weather is great isn\'t it?\'\n' +
        'Two: \'Yes. It\'s absolutely beautiful today.\'\n' +
        'One: \'I wish it was like this more frequently.\'\n' +
        'Two: \'Me too.\'\n' +
        'One: \'So where are you going now?\'\n' +
        'Two: \'I\'m going to meet a friend of mine at the department store\'\n' +
        'One: \'Going to do a little shopping?\'\n' +
        'Two: \'Yeah, I have to buy some presents for my parents.\'\n' +
        'One: \'What\'s the occasion?\'\n' +
        'Two: \'It\'s their anniversary.\'\n' +
        'One: \'That\'s great. Well, you better get going. You don\'t want to be late.\'\n' +
        'Two: \'I\'ll see you next time.\'\n' +
        'One: \'Sure.\' Bye.\'\n' +
        '\n';
    let testText2 = `<div>${testText}</div><br>`;
    let testText3 = testText2.replace(/\s'|'\s/g, '\"');
    block.insertAdjacentHTML('afterend', testText3);
    block.insertAdjacentHTML('afterend', testText2);

  };
}

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item product-info" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="by-btn btn-increase">Добавить в корзину</button>
                </div>
            </div>`;
  }
}
//Домашнее задание №2

class Bascket {
  constructor(  ) {
    this.costs = 0;
    this.selectedProducts = [];
    this._cart();
    this._addToCart('.btn-increase');
  }

  _addToCart(obj){
    document.querySelectorAll(obj).forEach((element) => {
      element.addEventListener('click', (event)=>{
        let id = event.target.closest('.product-info').getAttribute('data-id');
        if(this.selectedProducts == undefined){
          getRequest(`${API}/catalogData.json`, (data) => {
            JSON.parse(data).forEach((elem) => {
              if(elem['id_product'] == id){
                this.selectedProducts[0] = elem;
                this.selectedProducts[0].amt = 1;
              }
            });
          })
        }else{
          getRequest(`${API}/catalogData.json`, (data) => {
            let washere = false;
            JSON.parse(data).forEach((elem) => {
              if(elem['id_product'] == id){
                this.selectedProducts.forEach((element) => {
                  if(element['id_product'] == id){
                    washere = true;
                  }else{
                  };
                });
              }
            });
            if(washere){
              this.selectedProducts.forEach((element) => {
                if(element['id_product'] == id){
                  element['amt'] += 1;
                  this._pererender();
                }
              });
            }else{
              JSON.parse(data).forEach((element2) => {
                if(element2['id_product'] == id){
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
          if(id != item['id_product']){
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
    this.id_product = element.id_product;
    this.img = img;
    this.product_name = element.product_name;
    this.price = element.price;
  }
  render(){
    return `<div class="cart-item product-info" data-id="${this.id_product}">
                <img class ="cartImg" src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
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
new ProductList();