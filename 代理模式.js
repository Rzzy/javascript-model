// 一个对象充当另一个对象的接口，代理介于客户端和对象本身之间，并且对该对象的访问进行保护
var proxy = {
    ids: [],
    delay: 50,
    timeout:null,
    callback:null,
    context:null,
    makeRquest: function(id,callback,context){
        // 加入队列中
        this.ids.push(id);

        this.callback = callback;
        this.context = context;

        // 设置超时时间
        if(!this.timeout){
            this.timeout = setTimeout(function(){
                proxy.flush()
            },this.delay)
        }
    },
    flush: function(){
        http.makeRquest(this.ids,'proxy.handler')
        
        // 清除超时时间和对列
        this.timeout = null
        this.ids = []
    },
    handler: function(data){
        var i, max;
        
        // 单个视频
        if(parseInt(data.query.count,10) === 1) {
            proxy.callback.call(proxy.context, data.query.result.Video)
            return 
        }
        // 多个视频
        for(i=0,max = data.query.result.Video.length;i<max;i++){
            proxy.callback.call(proxy.context, data.query.result.Video[i])
        }

    }
}