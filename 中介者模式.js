function Player(name){
    this.points = 0
    this.name = name
}
Player.prototype.play = function(){
    this.points++ 
    mediator.played()
}
var scoreboard = {
    element: document.getElementById('result'),
    update:  function(score){
        var i, msg = '';
        for(i in score){
            if(score.hasOwnproperty(i)){
                msg += '<p><strong>'+ i + '<\/strong>:'
                msg += score[i]
                msg +='<\/p>'
            }
        }
        this.element.innerHTML = msg
    }
}

var mediator = {
    players: {},
    setup: function(){
        var player = this.players
        player.home = new Player('Home')
        player.guest = new Player('Guest')
    },
    keypress: function(e){
        e= e || window.event
        if(e.which === 49) {
            mediator.players.home.play()
            return 
        }
        if(e.which === 48) {
            mediator.players.guest.play()
            return 
        }
    }
}

//test 
mediator.setup()
window.onkeypress = mediator.keypress()

setTimeout(function(){
    window.onkeypress = null
    alert('Game over')
},3000)
