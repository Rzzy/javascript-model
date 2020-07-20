/**
 * 通常有一个包含某种数据集合的对象，该数据可能存贮在一个复杂的数据结构内部，需要提供一些简单的方法能够访问数据结构中的每个元素 
 */

 var agg = (function(){
     var index = 0,
         data = [1,2,3,4,5],
         length = data.length;
     return {
        next:function(){
            var element;
            if(!this.hasNext()){
                return null
            }
            element = data[index]
            index = index + 1
            return element
        },
        hasNext:function(){
            return index < length
        }
     }
 }())