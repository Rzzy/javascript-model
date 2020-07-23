/**
 * subscribers : 一个数组
 */
var publisher = {
    subscribers: {
        any:[] // 事件类型：订阅者
    },
    subscribe: function(fn,type){
        type = type || 'any'
        if(typeof this.subscribers[type] === 'undefined'){
            this.subscribers[type] = []
        }
        this.subscribers[type].push(fn)
    },
    unsubscribe: function(fn,type){
        this.visitSubscribers('unsubscribe',fn,type)
    },
    publish: function(publication, type){
        this.visitSubscribers('publish',publication,type)
    },
    visitSubscribers:  function(action,arg, type){
        var pubtype = type || 'any',
            subscribers = this.subscribers[pubtype],
            i,
            max = subscribers.length;
        for(i=0;i<max;i++){
            if(action === 'publish') {
                subscribers[i](arg)
            } else {
                if(subscribers[i] === arg) {
                    subscribers.splice(i,1)
                }
            }
        }
    }
}
/**
 * 
 * @param {*} o 普通对象
 * mkPublisher 函数通过把上述通用发布者的方法复制到 o 对象中，从而将其转换成为一个发布者
 */
function mkPublisher(o){
    var i;
    for( i in publisher){
        if(publisher.hasOwnProperty(i) && typeof publisher[i] === 'function') {
            o[i] = publisher[i]
        }
    }
    o.subscribers = {
        any: []
    }
}

// test

var paper = {
    daily: function(){
        this.publish('big news today')
    },
    monthly: function(){
        this.publish('interesting analysis', 'monthly')
    }
}

// 将paper构造成一个发布者
mkPublisher(paper)

// 普通对象
var joe = {
    drinkCoffee: function(paper){
        console.log('Just read ' + paper)
    },
    sundayPreNap: function(monthly) {
        console.log(' About to fall sleep reading this ' + monthly)
    }
}

// joe 向paper订阅
paper.subscribe(joe.drinkCoffee)
paper.subscribe(joe.sundayPreNap,'monthly')

paper.daily()  //  Just read big news today
paper.daily()  //  Just read big news today
paper.daily()  //  Just read big news today
paper.monthly() // About to fall sleep reading this interesting analysis
