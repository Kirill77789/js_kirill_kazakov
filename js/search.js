Vue.component('search', {
    data(){
        return {
            searchLine: '',
        };
    },
    props: ['products',],
    methods: {
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
    template: `<form action="#" class="search-form">
                    <input type="text" class="search-field" v-model="searchLine">
                    <button class="btn-search" type="submit" @click="searchProduct()">
                        <i class="fas fa-search"></i>
                    </button>
                </form>`,
});