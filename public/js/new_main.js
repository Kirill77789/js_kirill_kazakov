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
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    console.log(error);
                });
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    console.log(error);
                });
        },
        deleteJson(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    console.log(error);
                });
        },
        addProduct(product){
            let find = this.cart.find(el => el.id_product === product.id_product);
            if(find){
                this.putJson(`/api/cart/${find.id_product}`, product);
                find.quantity++;
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cart.push(prod);
                        }
                    });
            }
        },

        dellProduct(product){
            let find = this.cart.find(el => el.id_product === product.id_product);
            this.deleteJson(`/api/cart/${find.id_product}`, product);
            if(product.quantity > 1){
                product.quantity--;
            }else{
                let toDelit = this.cart.indexOf(product);
                this.cart.splice(toDelit, 1)
            }

        },


    },
    mounted(){
        this.getJson(`/api/products`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });
        this.getJson(`/api/inCart`)
            .then(data => {
                for(let el of data.contents){
                    this.cart.push(el);
                }
            });
    },

});
