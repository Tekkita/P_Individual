var options = JSON.parse(localStorage.options||JSON.stringify(default_options));
var lastCard;
var pairs = options.pairs;
var points = 100;
var difficulty = options.difficulty;
var lost_points;
var time_shown;

export var game = function(){
    const back = '../resources/back.png';
    const resources = ['../resources/cb.png', '../resources/co.png',
                    '../resources/sb.png', '../resources/so.png', '../resources/tb.png', '../resources/to.png'];
    const card = {
        current: back,
        clickable: true,
        goBack: function() {
            setTimeout(() => {
                this.current = back;
                this.clickable = true;
                this.callback();
            }, time_shown);
        },
        goFront: function () {
            this.current = this.front;
            this.clickable = false;
            this.callback();
        }
    };

    switch (difficulty){
        case 'easy':
            lost_points=10;
            time_shown=2000;
            break;
        case 'normal':
            lost_points=15;
            time_shown=1000;
            break;
        case 'hard':
            lost_points=25;
            time_shown=500;
            break;
        default:
            lost_points=15;
            time_shown=1000;
            break;
    }

    return{
        init: function (call){
            var items = resources.slice(); //Copia array
            items.sort(()=> Math.random() - 0.5);
            items = items.slice(0, pairs);
            items = items.concat(items);
            items.sort(()=> Math.random() - 0.5);
            var cards = items.map(item => Object.create(card, {front: {value:item}, callback: {value:call}}));

            for(let i=0; i<cards.length;i++){
                cards[i].current=cards[i].front;
                setTimeout(() => {
                   cards[i].current= back;
                   cards[i].callback(); 
                }, time_shown);
            }

            return cards;
        },
        click: function(card){
            if(!card.clickable) return;
            card.goFront();
            if(lastCard){
                if(card.front === lastCard.front){
                    pairs--;
                    if(pairs <= 0){
                        alert("Has guanyat amb "+points+" punts! :)");
                        window.location.replace("../");
                    }
                }
                else{
                    [card, lastCard].forEach(c=>c.goBack());
                    
                    points-=lost_points;
                    if(points<=0){
                        alert("Has perdut :(");
                        window.location.replace("../");
                    }
                }
                lastCard = null;
            }
            else lastCard = card;
        }
    }
}();