const add = (cart, req) => {
    cart.contents.push(req.body);
    return JSON.stringify(cart, null, 4);
};
const change = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += 1;
    return JSON.stringify(cart, null, 4);

};
const del = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    if(find.quantity > 1){
        find.quantity--;
        return JSON.stringify(cart, null, 4);
    }else{
        if(find !== undefined){
            let number = cart.contents.indexOf(find);
            cart.contents.splice(number, 1);
            return JSON.stringify(cart, null, 4);
        }
    }

};

module.exports = {
    add,
    change,
    del
};
