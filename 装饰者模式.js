/**
 * 在运行时动态添加附加功能到对象中
 * 特征： 预期行为的可定制和可配置特性
 */

 function Sale(price){
     this.price = price || 100
 }
 Sale.prototype.getPrice = function(){
     return this.price
 }
Sale.decorators = {}

Sale.decorators.fedtax = {
    getPrice:function(){
        var price = this.uber.getPrice()
        price += price*5/100
        return price
    }
}

Sale.decorators.quebec = {
    getPrice:function(){
        var price = this.uber.getPrice()
        price += price*7.5/100
        return price
    }
}

Sale.decorators.money = {
    getPrice:function(){
        return '$' + this.uber.getPrice().toFixed(2)
    }
}

Sale.decorators.cdn = {
    getPrice:function(){
        return 'CDN$' + this.uber.getPrice().toFixed(2)
    }
}
Sale.prototype.decorate = function(decorater){
    var F = function(){},
        overrides = this.constructor.decorators[decorater],
        i,
        newobj;
    F.prototype = this                           
    newobj = new F()
    newobj.uber = F.prototype  // 此处继承了对象实例，所以每次 uber 都会继承过来
    for(i in overrides){
        if(overrides.hasOwnProperty(i)){
            newobj[i] = overrides[i]
        }
    }
    return newobj
}

// test
var sale = new Sale(100)
sale = sale.decorate('fedtax')
sale = sale.decorate('quebec')
sale = sale.decorate('money')
sale instanceof Sale
sale.getPrice()  // $112.88

// 使用列表实现
function Sale(price){
    this.price = price || 100
    this.decorators_list = []
}

Sale.decorators = {}

Sale.decorators.fedtax = {
    getPrice:function(price){
        var price = price += price*5/100
        return price
    }
}

Sale.decorators.quebec = {
    getPrice:function(price){
        return price += price*7.5/100
    }
}

Sale.decorators.money = {
    getPrice:function(price){
        return '$' + price
    }
}

Sale.decorators.cdn = {
    getPrice:function(price){
        return 'CDN$' + price
    }
}

Sale.prototype.decorate = function(decorater){
    this.decorators_list.push(decorater)
}
Sale.prototype.getPrice = function(){
    var price = this.price,
        i,
        max = this.decorators_list.length,
        name;
    for(i=0;i<max;i++){
        name = this.decorators_list[i]
        price = Sale.decorators[name].getPrice(price)
    }
    return price
}

var sale = new Sale(100)
sale.decorate('fedtax')
sale.decorate('quebec')
sale.decorate('money')
sale.getPrice()  // $112.88