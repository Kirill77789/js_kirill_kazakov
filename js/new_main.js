const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://placehold.it/200x150',
        searchLine: '',
        cart: [],
        isVisibleCart: true,
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
        searchProduct(){
            if(this.searchLine != ''){
                const regexp = new RegExp(this.searchLine, 'i');
                for(let elem of this.products){
                    if(!regexp.test(elem.product_name)){
                        document.querySelector(`[data-id="${elem.id_product}"]`).classList.add('off');
                    }else{
                        document.querySelector(`[data-id="${elem.id_product}"]`).classList.remove('off');
                    }
                }
            }else{
                for(let elem of this.products){
                    document.querySelector(`[data-id="${elem.id_product}"]`).classList.remove('off');
                }
            }
        },
    },
    computed: {
        totalCostCalculation(){
            this.totalCost = 0;
            for(let elem of this.cart){
                this.totalCost += elem.price*elem.quantity;
            }
            return this.totalCost
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
