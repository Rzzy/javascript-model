// 工厂模式
/**
 * 1.通常在类的静态方法中实现 
 * 2.当创建对象时执行重复操作
 * 3.在编译不知道具体类型的类的情况下，为工厂客户提供一种创建对象的接口
 */
 // 父构造函数
 function CarMaker(){}
 // 父类的一个方法 
 CarMaker.prototype.drive = function(){
     return 'Vroom, I have ' + this.doors + ' doors'
 }
 // 静态工厂方法
 CarMaker.factory = function(type){
    var constr = type,
        newCar;
    // 如果构造函数不存在，则发生错误
    if(typeof CarMaker[constr] !== 'function') {
        throw {
            name:'erroe',
            message: constr + 'doesn`t exist'
        }
    }
    // 在这里，构造函数是已知存在的，我们使得原型继承父类，但仅继承一次
    if(typeof CarMaker[constr].prototype.drive !== 'function') {
        CarMaker[constr].prototype = new CarMaker()
    }

    // 创建一个新的实例
    newCar = new CarMaker[constr]
    return newCar
 }

 // 定义特定的汽车制造商
 CarMaker.Compact = function(){
     this.doors = 4
 } 
 CarMaker.Convertible = function(){
     this.doors = 2
 }
 CarMaker.Suv = function(){
     this.doors = 24
 }

