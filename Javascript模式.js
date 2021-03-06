// 通用命名空间函数
var MYAPP =  MYAPP || {}
MYAPP.namespace = function(ns,string){
    var parts = ns.split('.'),
        parent = MYAPP,
        i;
    if(parts[0]==='MYAPP'){
        parts = parts.slice(1)
    }
    for(i=0;i<parts.length;i++) {
        if(typeof parent[parts[i]]==='undefined') {
            parent[parts[i]] = {}
        }
        parent = parent[parts[i]]
    }

    return parent
}
var module2 = MYAPP.namespace("MYAPP.modules.module2")

// 私有属性和方法
// 方式 1
function GodGet(){
    var name = 'Rz'   // 私有成员，如果是对象，则复制一份返回
    this.getName = function(){  // 共有函数，特权方法
        return name   // 
    }
}
// 方式 2
var myObject;
(function(){
    var name = 'Rz'
    myObject = {
        getName:function(){
            return name
        }
    }
})()
// 方式 3
var myObj = (function(){
    var name = 'Rz'
    return {
        getName:function(){
            return name
        }
    }
})()

// 原型和私有性
function GodGet(){
    var name = 'Rz'
    this.getName = function(){  // 特权“own”方法
        return name
    }
}

GodGet.prototype = (function(){
    var browser = 'Mobile webkit'
    return {
        getBowser:function(){   // 特权原型方法
            return browser
        }
    }
}())

// test
var tag = new GodGet()
tag.getName() 
tag.getBowser()

// step-1：建立一个命名空间
MYAPP.namespace('MYAPP.untils.Array')


// step-2：定义模块（通过使用即时函数定义私有作用域）
MYAPP.untils.Array = (function(){
    // 依赖模块
    var uobj = MYAPP.untils.object,
        ulang = MYAPP.untils.lang;
    // 私有属性
    var arrSting = '[object Array]'
    var ops  = Object.prototype.toString;
    // 私有方法
    var helps = function(){}

    // 共有api
    return {
        isArray: function(arr) {},
        inArray: function(needle,hagStack){}
    }
}())


// 私有静态成员
// 构造函数
var GodGetet = (function(){
    // 静态变量/属性
    var counter = 0,
        NewGodGet;
    // 新的构造函数实现
    NewGodGet = function(){
        counter+=1
    }
    // 特权方法
    NewGodGet.prototype.getLastId = function(){
        return counter
    }

    // 覆盖构造函数
    return NewGodGet

}())

/**
 * 静态属性（共有或私有）使用会带来很多便利，他们可以包含非实例相关的方法和数据并且不会为每个实例重新创建静态属性
 */

 // 沙箱模式
 function SandBox(){
    var args = Array.prototype.slice.call(arguments),
        callback = args.pop(),
        modules = null,
        i;
    // 判断传入模块类型
    if(args.length!=0){
        modules = args.includes('*')? '*' : args 
    }
    // 确保该函数作为构造函数被调用
    if(!this instanceof SandBox) {
        return new SandBox(modules,callback)
    }
    // 需要向this添加的属性
    this.a = 1;
    this.b = 2;
    // 向核型的this对象添加模块，不指定模块名称或指定为*都表示使用所有模块
    if(!modules || modules === '*') {
        modules = []
        for(i in SandBox.modules){
            if(SandBox.modules.hasOwnProperty(i)){
                modules.push(i)
            }
        }
    }
    // 初始化所需的模块
    for(i=0;i<modules.length;i++){
        SandBox.modules[modules[i]](this)
    }
    // 调用回调方法
    callback(this)
}
// 需要的任何原型属性
SandBox.prototype = {
    name: 'my application',
    version: '1.0',
    getName: function(){
        return this.name
    }
}

// 定于模块功能
SandBox.modules = {}

SandBox.modules.dom = function(box){
    box.getElement = function(){
        return document.body
    }
    box.getStyle = function(){
        console.log('getStyle')
    }
    box.foo = 'bar'
}
SandBox.modules.event = function(box){
    box.constructor.prototype.m = 'mmm'
    box.attachEvent = function(){
        console.log('attachEvent')
    }
}

SandBox('dom','event',function(box){
    console.log(box.getElement())
    box.getStyle()
    box.attachEvent()
    console.log(box.m)
    // 
    SandBox('ajax','event',function(box){
        // 另一个沙箱画的box对象，这里的box对象与函数外部的box对象并不相同
    })
})
 
// 类式继承的5种模式

// #1 默认模式
function Parent(name){
    this.name = name || 'Adam'
}
Parent.prototype.say = function(){
    return this.name
}
function Child(name){}
// 继承函数
function inherit(C,P){
    C.prototype = new P()
}
inherit(Child,Parent)
// test
var kid = new Child()

kid.name = 'Adam'
kid.say()

/**
 * 缺点：继承了两个对象的属性（this的和prototype的）一般this的不需要继承过来
 * 每次创建一个新的对象，都需要重新执行这种继承，会重复创建对象，效率低下
 */

// #2 借用构造函数
function Parent(){
    this.tag = ['js','css']
}
var parent = new Parent()

function ChildA(){}
ChildA.prototype = parent

function ChildB(){
    Parent.call(this)
}

// test
var instanceParent = new Parent()
var instanceChildA = new ChildA()
var instanceChildB = new ChildB()

instanceParent.hasOwnProperty('tag')  // true
instanceChildA.hasOwnProperty('tag')  // false
instanceChildB.hasOwnProperty('tag')  // true  会复制一个tag的副本

// 修改继承tag时表现出来的差异
instanceChildA.tag.push('html')
instanceChildB.tag.push('php')

parent.tag.join(',')  // js,css,html


// 通过借用构造函数实现多重继承
function Cat(){
    this.legs = 4
    this.say = function(){
        return 'mm'
    }
}
function Bird(){
    this.wings = 2
    this.fly = true
}

function CatWings(){
    Cat.apply(this)
    Bird.apply(this)
}

var jane = new CatWings()
jane.fly // true
jane.legs // 4
jane.wings // 2
jane.say = function(){}

/**
 * 缺点：无法从原型继承任何东西
 * 优点：获得父对象自己成员的真实副本，不会存在子对象意外覆盖父对象属性的风险
 * */ 

 // #3 借用和设置原型
 function Parent(){}
 function Child(a,b,c,d){
     Parent.apply(this,a,b,c,d)
 }
 Child.prototype = new Parent()

 /**
  * 优点：能或得父对象本身的成员副本以及指向父对象中可复用功能（以原型成员方式实现的那些功能）引用
  *      子对象也能够将任意参数传递到父构造函数中
  * 缺点：父构造函数被调用了两次，导致效率低下
  */

// #4 共享原型
function Parent(){}
function Child(){}
function inherit(C,P){
    C.prototype = P.prototype  // 所有的方法和属性都定义在原型上，继承时将子对象和父对象都原型设置为同一个
}

/**
 * 缺点：继承链上的某处修改了原型他将会影响父对象和祖先对象
 */

 // #5 临时构造函数  这种模式称为代理函数或代理构造函数
 function Parent(){}
 function Child(){}
 function inherit(C,P){
     var F = function(){}
     F.prototype = P.prototype
     C.prototype = new F()
     C.uber = P.prototype // 超类 存储父类原型
     C.prototype.constructor = C // 重置构造函数指针
 }

 // Object.create(parent) 实现
function object(o){
    function F(){}
    F.prototype = o
    return new F()
}
function Person(){
    this.name = 'Adam'
}
Person.prototype.getName = function(){
    return this.name
}
var papa = new Person()
var kid = object(papa)
kid.getName()  // 'Adam'



