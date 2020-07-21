/**
 * 策略模式支持在运行时选择算法，代码的客户端可以使用同一个接口来工作
 */

 var validator = {
     types:{},
     messages:[],
     config:{},
     validate:function(){
         var i, msg, type, checker, result_ok;
         // 重置所有消息
         this.messages = []

         for(i in data){
             if(data.hasOwnProperty(i)){
                 type = this.config[i]
                 checker = this.types[type]
                 if(!type){
                     continue // 不需要验证
                 }
                 if(!checker){
                    throw {
                        name:'ValidatorError',
                        message: 'No handle to validate type ' + type
                    }
                 }

                 result_ok = checker.validate(data[i])
                 if(!result_ok){
                     msg = 'Invalid value for *' + i + '*, ' + checker.instructions
                     this.messages.push(msg)
                 }
             }
         }
         return this.hasErrors()
     },
     hasErrors: function(){
         return this.messages.length!==0
     }
 }
 validator.types.isNonEmpty = {
     validate: function(value){
         return value!==''
     },
     instructions: 'the value cannot be empty'
 }
 validator.types.isNumber = {
     validate: function(value){
         return !isNaN(value)
     },
     instructions: 'the value can only be a valid number,e.g. 1, 3.14 or 2010'
 }

 validator.types.isAlphaNum = {
     validate: function(value){
         return !/[^a-z0-9]/i.test(value)
     },
     instructions: 'the value can only contain characters and numbers, no special symbols'
 }
 // 测试
 var data = {
    first_name: 'Super',
    last_name: 'Man',
    age: 'unknow',
    user_name:'o_0'
}

validator.config = {
    first_name: 'isNonEmpty',
    age: 'isNumber',
    user_name: 'isAlphaNum'
}
validator.validate(data);
if(validator.hasErrors()){
    console.log(validator.messages.join('\n'))
}