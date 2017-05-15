var Game = function() {
    self = this;
    this.cursorPosition = {};
    
    this.init = function(){
        this.main = setInterval(function(){
            self.update();
        },1000/20);
        this.hat = document.querySelector('.hat');
        this.game = document.querySelector('.game');
        this.liveCount = document.querySelector('span.live-count');
        this.scoreCount = document.querySelector('span.score-count');
        this.mate = new Mate('.mate', this);
        this.lives = 3;
        this.score = 0;
    };
    this.update = function(){
        this.hat.style.left = this.cursorPosition.x -  this.hat.offsetWidth/2;
        this.mate.moveDown(5);
        this.liveCount.innerHTML = this.lives;
        this.scoreCount.innerHTML = ++this.score;
        if( this.lives == 0 ){
            document.querySelector('.endgame').style.display="block";
            document.querySelector('.startgame').style.display="block";
            clearInterval(this.main);
        }

    }
    this.setCoursorPosition = function(e) {
        var modX = 0;
        var modY = 0;
        /*if(e.target != self.game) {
            modX = e.hat.offsetLeft;
            modY = e.hat.offsetTop;
        }*/
        self.cursorPosition.x = e.pageX + modX;
        self.cursorPosition.y = e.pageY + modY;
        
    }
    
    document.querySelector('.game').addEventListener('mousemove',this.setCoursorPosition);

};

var Mate = function(selector, game) {
    var self = this;
    this.modiffer = 0;
    this.dom = document.querySelector(selector);
    this.position = {
        x:parseInt(Math.random()*450),
        y:0
    };
    
    var renderPosition = function() {
        this.dom.style.top = this.position.y;
        this.dom.style.left = this.position.x;
    }

    this.moveDown = function(y) {
        this.position.y += y + this.modiffer;
        
        if( this.position.y > (game.hat.offsetTop - 25) && 
            this.position.y < (game.hat.offsetTop + 100) && 
            this.position.x > (game.hat.offsetLeft - 25) && 
            this.position.x < (game.hat.offsetLeft + game.hat.offsetWidth + 25)
            || 
            this.position.y > game.game.offsetHeight
        ) {
            if(this.position.y > game.game.offsetHeight) {
                --game.lives;
            }
            this.position.y = 0;
            this.position.x = parseInt(Math.random()*450);
            this.modiffer += 2;
        }
        renderPosition.call(this);
    }
}
var MagicHat = new Game;

document.querySelector('button').addEventListener('click',function(){
    MagicHat.init();
    document.querySelector('.endgame').style.display="none";
    document.querySelector('.startgame').style.display="none";
})
