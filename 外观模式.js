// 包装重复的方法
var myevent = {
    stop: function(e){
        if(typeof e.preventDefalut === 'function') {
            e.preventDefalut()
        }
        if(typeof e.stopProppagation === 'function'){
            e.stopProppagation()
        }
        // ie 浏览器
        if(typeof e.returnValue === 'boolean') {
            e.returnValue = false
        }
        if(typeof e.cancelBubble === 'boolean') {
            e.cancelBubble = false
        }
    }
}