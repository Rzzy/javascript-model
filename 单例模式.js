// 单例模式
// 静态属性中的实例
function Universe(){
    // 检查是否已经有了一个实例
    if(typeof Universe.instance === 'object') {
        return Universe.instance
    }
    // 正常运行
    this.start_time = 0
    this.bang = 'Big'

    // 缓存
    Universe.instance = this
}

// 测试
var uni = new Universe()
var uni2 = new Universe()

uni == uni2 // true 

// 闭包中的实例 
function Universe(){   // 一旦创建 就不能再添加属性
    //缓存实例
    var instance = this
    // 正常进行
    this.start_time = 0
    this.bang = 'Big'

    // 重写构造函数
    Universe = function(){
        return instance
    }
}
// 测试
var uni = new Universe()
var uni2 = new Universe()

uni == uni2 // true 

function Universe(){  
    // 缓存实例
    var instance;
    // 重写构造函数
    Universe = function Universe(){
        return instance
    }
    // 保留原型属性
    Universe.prototype = this

    // 实例
    instance = new Universe()
    // 重置构造函数指针
    instance.constructor = Universe
    // 所有功能
    instance.start_time = 0;
    instance.bang = 'Big'

    return instance

}

Universe.prototype.nothing = true

var uni = new Universe()

Universe.prototype.eeverything = true

var uni2 = new Universe()

uni  === uni2  // true

uni.nothing && uni.eeverything && uni2.nothing && uni2.eeverything  // true

// 立即执行函数 方式
var Universe;
(function(){
    var instance;
    Universe = function Universe(){
        if(instance){
            return instance
        }
        instance = this

        // 所有功能
        instance.start_time = 0;
        instance.bang = 'Big'
    }
}())