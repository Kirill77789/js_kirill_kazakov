const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://placehold.it/200x150',
        cart: [],
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product){
            let wasAdd = false;
            for(let element of this.cart){
                if(element.id_product == product.id_product){
                    element.quantity++;
                    wasAdd = true;
                }
            }
            if(!wasAdd){
                let modProduct = Object.assign({quantity: 1}, product)
                this.cart.push(modProduct);
            }
        },

        dellProduct(product){
            if(product.quantity > 1){
                product.quantity--;
            }else{
                let toDelit = this.cart.indexOf(product);
                this.cart.splice(toDelit, 1)
            }
        },

    },
    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });
    }
});
