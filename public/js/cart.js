Vue.component('cart', {
    props: ['cart'],
    //props: ['cart', 'product', 'imgCatalog', 'postJson', 'putJson', 'deleteJson'],
    data(){
        return {
            //cart: [...this.cart],
            imgCatalog: 'https://placehold.it/200x150',
            isVisibleCart: true,
        }
    },
    computed: {
        totalCostCalculation(){
            this.totalCost = 0;
            for(let elem of this.cart){
                this.totalCost += elem.price * elem.quantity;
            }
            return this.totalCost
        },
    },
    template: ` <div>
                    <button class="btn-cart" type="button" @click="isVisibleCart=!isVisibleCart">Корзина</button>
                    <div v-show="isVisibleCart" class="cart">
                        <cart-item :cart="cart" 
                                :imgCatalog="imgCatalog" 
                                v-for="product of cart" 
                                :key="product.id_product" 
                                :product="product">       
                        </cart-item>
                        <div class="cost">Стоимость выбранных товаров: {{totalCostCalculation}} ₽</div>
                        <button class="by-btn cart-btn">Оформить</button>
                    </div>
                </div>`,


});

Vue.component('cart-item',{
    props: ['cart', 'product', 'imgCatalog'],
    //props: ['cart', 'product', 'imgCatalog', 'postJson', 'putJson', 'deleteJson'],
    template: `<div class="cart-item product-info" :data-id="product.id_product" >
                    <img class ="cartImg" :src="imgCatalog" alt="Some img">
                    <div class="desc">

                        <h3>{{product.product_name}}</h3>
                        <p>{{product.price}}₽</p>
                        <p>количество:&nbsp{{product.quantity}}&nbspшт. </p>
                    </div>
                    <div class="auxiliary">
                        <button class="by-btn item-btn btn-increase" @click="$parent.$emit('add', product)">добавить</button>
                        <button class="by-btn btn-del" @click="$parent.$emit('dell', product)">Удалить</button>
                    </div>
                </div>`,
    mounted() {
        console.log(this);
    }
});