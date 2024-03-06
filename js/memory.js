// game.js
$(document).ready(function () {
    const back = '../resources/back.png';
    const resources = ['../resources/cb.png', '../resources/co.png', '../resources/sb.png', '../resources/so.png', '../resources/tb.png', '../resources/to.png'];

    const card = {
        current: back,
        clickable: true,
        goBack: function () {
            const self = this; // Guardar una referencia al objeto para usar dentro de setTimeout
            setTimeout(function () {
                self.current = back;
                self.clickable = true;
                self.callback();
            }, 1000);
        },
        goFront: function () {
            this.current = this.front;
            this.clickable = false;
            this.callback();
        }
    };

    const game = {
        lastCard: null,
        pairs: 2,
        points: 100,

        init: function (call) {
            const items = resources.slice();
            items.sort(() => Math.random() - 0.5);
            const doubledItems = items.slice(0, this.pairs).concat(items.slice(0, this.pairs));
            doubledItems.sort(() => Math.random() - 0.5);
            return doubledItems.map(function (item) {
                return $.extend({}, card, { front: item, callback: call });
            });
        },

        click: function (clickedCard) {
            if (!clickedCard.clickable) return;
            clickedCard.goFront();

            if (this.lastCard) {
                if (clickedCard.front === this.lastCard.front) {
                    this.pairs--;
                    if (this.pairs <= 0) {
                        alert("Has guanyat amb " + this.points + " punts!");
                        window.location.replace("../");
                    }
                } else {
                    [clickedCard, this.lastCard].forEach(function (c) {
                        c.goBack();
                    });
                    this.points -= 25;
                    if (this.points <= 0) {
                        alert("Has perdut");
                        window.location.replace("../");
                    }
                }
                this.lastCard = null;
            } else {
                this.lastCard = clickedCard;
            }
        }
    };

    window.game = game;
});
