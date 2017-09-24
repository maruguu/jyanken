enchant();

var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 640;

var HAND_SIZE = 480;
var BUTTON_SIZE = 80;

var game;
var BG_COLOR = '#404040';

// audio
var SOUND_FILES = {
    'jyanken': 'sound/jyanken.wav', 
    'pon':    'sound/pon.wav',
    'aiko':   'sound/aiko.wav',
    'syo':    'sound/syo.wav',
    'yatta':  'sound/yatta.wav',
    'zuko':   'sound/zuko.wav'
};

var jyanken_audio = {};
for(scene in SOUND_FILES) {
    jyanken_audio[scene] = new Audio(SOUND_FILES[scene]);
    jyanken_audio[scene].load();
}

// image
var GUU = [{x: 180, y: 400}, {x: 260, y: 400}, {x: 180, y: 380}, {x: 260, y: 380}, {x: 190, y: 360}, {x: 210, y: 360}, {x: 230, y: 360}, {x: 250, y: 360}, {x: 170, y: 360},  {x: 150, y: 355}, {x: 140, y: 350}, {x: 130, y: 340}, {x: 130, y: 330}, {x: 140, y: 320}, {x: 150, y: 305}, {x: 140, y: 295}, {x: 125, y: 285}, {x: 110, y: 275}, {x: 95, y: 265}, /*ここから親指*/ {x: 85, y: 250}, {x: 80, y: 230}, {x: 75, y: 210},/*ここまで親指*/ {x: 80, y: 190}, {x: 90, y: 180}, {x: 105, y: 165}, {x: 110, y: 145}, /* ここから人差し指 */ {x: 120, y: 135}, {x: 130, y: 125}, {x: 150, y: 115}, {x: 170, y: 105},/*人差し指ここまで*/ {x: 180, y: 95}, {x: 200, y: 90}, /*ここから中指*/ {x: 220, y: 92}, {x: 240, y: 93}, {x: 260, y: 94},/*ここまで中指*/ {x: 276, y: 95}, {x: 295, y: 105}, /*ここから薬指*/ {x: 310, y: 110}, {x: 330, y: 120}, {x: 345, y: 130},/*ここまで薬指*/ {x: 367, y: 135}, {x: 385, y: 145}, /*ここから小指*/ {x: 388, y: 165}, {x: 390, y: 185}, {x: 387, y: 200}, /*ここまで小指*/ {x: 383, y: 215}, {x: 375, y: 230},{x: 370, y: 250}, {x: 357, y: 265}, {x: 345, y: 280}, {x: 333, y: 293}, {x: 317, y: 305}, {x: 300, y: 317}, {x: 310, y: 320},  {x: 310, y: 340}, {x: 300, y: 350}, {x: 290, y: 355}, {x: 270, y: 360}, /* ここから手の甲 */ {x: 200, y: 185}, {x: 205, y: 203}, {x: 207, y: 223}, {x: 210, y: 240}, {x: 213, y: 257}, {x: 255, y: 259}, {x: 260, y: 240}, {x: 265, y: 220}, {x: 273, y: 205}, {x: 275, y: 185}];
var CHO = [{x: 180, y: 400}, {x: 260, y: 400}, {x: 180, y: 380}, {x: 260, y: 380}, {x: 190, y: 360}, {x: 210, y: 360}, {x: 230, y: 360}, {x: 250, y: 360}, {x: 170, y: 360},  {x: 150, y: 355}, {x: 140, y: 350}, {x: 130, y: 340}, {x: 130, y: 330}, {x: 140, y: 320}, {x: 150, y: 305}, {x: 140, y: 295}, {x: 125, y: 285}, {x: 110, y: 275}, {x: 95, y: 265}, /*ここから親指*/ {x: 85, y: 250}, {x: 80, y: 230}, {x: 75, y: 210}, /*ここまで親指*/ {x: 80, y: 190}, {x: 90, y: 180}, {x: 105, y: 165}, {x: 110, y: 145}, /* ここから人差し指 */ {x: 100, y: 125}, {x: 100, y: 110}, {x: 95, y: 95}, {x: 95, y: 75}, {x: 94, y: 53}, {x: 104, y: 32}, {x: 115, y: 15}, {x: 132, y: 14}, {x: 155, y: 20}, {x: 165, y: 35}, {x: 170, y: 55}, {x: 175, y: 75}, /*人差し指ここまで*/ {x: 180, y: 95}, {x: 200, y: 90}, /*ここから中指*/ {x: 210, y: 75}, {x: 215, y: 55}, {x: 225, y: 30}, {x: 235, y: 20}, {x: 255, y: 10}, {x: 275, y: 18}, {x: 284, y: 35}, {x: 282, y: 55}, {x: 280, y: 78}, /*ここまで中指*/ {x: 276, y: 95}, {x: 295, y: 105}, /*ここから薬指*/ {x: 310, y: 110}, {x: 330, y: 120}, {x: 345, y: 130},/*ここまで薬指*/ {x: 367, y: 135}, {x: 385, y: 145}, /*ここから小指*/ {x: 388, y: 165}, {x: 390, y: 185}, {x: 387, y: 200}, /*ここまで小指*/ {x: 383, y: 215}, {x: 375, y: 230},{x: 370, y: 250}, {x: 357, y: 265}, {x: 345, y: 280}, {x: 333, y: 293}, {x: 317, y: 305}, {x: 300, y: 317}, {x: 310, y: 320},  {x: 310, y: 340}, {x: 300, y: 350}, {x: 290, y: 355}, {x: 270, y: 360}, /* ここから手の甲 */ {x: 200, y: 185}, {x: 205, y: 203}, {x: 207, y: 223}, {x: 210, y: 240}, {x: 213, y: 257}, {x: 255, y: 259}, {x: 260, y: 240}, {x: 265, y: 220}, {x: 273, y: 205}, {x: 275, y: 185}];
var PAA = [{x: 180, y: 400}, {x: 260, y: 400}, {x: 180, y: 380}, {x: 260, y: 380}, {x: 190, y: 360}, {x: 210, y: 360}, {x: 230, y: 360}, {x: 250, y: 360}, {x: 170, y: 360},  {x: 150, y: 355}, {x: 140, y: 350}, {x: 130, y: 340}, {x: 130, y: 330}, {x: 140, y: 320}, {x: 150, y: 305}, {x: 140, y: 295}, {x: 125, y: 285}, {x: 110, y: 275}, {x: 95, y: 265}, /*ここから親指*/ {x: 75, y: 265}, {x: 55, y: 260}, {x: 40, y: 250}, {x: 25, y: 240}, {x: 10, y: 225}, {x: 12, y: 210}, {x: 22, y: 195}, {x: 40, y: 185}, {x: 60, y: 188}, /*ここまで親指*/ {x: 80, y: 190}, {x: 90, y: 180}, {x: 105, y: 165}, {x: 110, y: 145}, /* ここから人差し指 */ {x: 100, y: 125}, {x: 100, y: 110}, {x: 95, y: 95}, {x: 95, y: 75}, {x: 94, y: 53}, {x: 104, y: 32}, {x: 115, y: 15}, {x: 132, y: 14}, {x: 155, y: 20}, {x: 165, y: 35}, {x: 170, y: 55}, {x: 175, y: 75}, /*人差し指ここまで*/ {x: 180, y: 95}, {x: 200, y: 90}, /*ここから中指*/ {x: 210, y: 75}, {x: 215, y: 55}, {x: 225, y: 30}, {x: 235, y: 20}, {x: 255, y: 10}, {x: 275, y: 18}, {x: 284, y: 35}, {x: 282, y: 55}, {x: 280, y: 78}, /*ここまで中指*/ {x: 276, y: 95}, {x: 295, y: 105}, /*ここから薬指*/ {x: 312, y: 90}, {x: 325, y: 75}, {x: 340, y: 60}, {x: 355, y: 50}, {x: 375, y: 60}, {x: 382, y: 78}, {x: 375, y: 95}, {x: 370, y: 112}, /*ここまで薬指*/ {x: 367, y: 135}, {x: 385, y: 145}, /*ここから小指*/ {x: 403, y: 138}, {x: 420, y: 130}, {x: 435, y: 145}, {x: 435, y: 165}, {x: 427, y: 178}, {x: 415, y: 195}, {x: 400, y: 205}, /*ここまで小指*/ {x: 383, y: 215}, {x: 375, y: 230},{x: 370, y: 250}, {x: 357, y: 265}, {x: 345, y: 280}, {x: 333, y: 293}, {x: 317, y: 305}, {x: 300, y: 317}, {x: 310, y: 320},  {x: 310, y: 340}, {x: 300, y: 350}, {x: 290, y: 355}, {x: 270, y: 360}, /* ここから手の甲 */ {x: 200, y: 185}, {x: 205, y: 203}, {x: 207, y: 223}, {x: 210, y: 240}, {x: 213, y: 257}, {x: 255, y: 259}, {x: 260, y: 240}, {x: 265, y: 220}, {x: 273, y: 205}, {x: 275, y: 185}];

var createHandSurface = function(ary) {
    var surface = new Surface(HAND_SIZE, HAND_SIZE);
    var c = surface.context;
    c.fillStyle = "rgba(255, 16, 16, 0.8)";
    c.globalCompositeOperation = 'lighter';
    for(idx in ary) {
        c.fillStyle = "rgba(255, 16, 16, 0.8)";
        c.arc(ary[idx].x, ary[idx].y, 10, 0, Math.PI*2, false);
        c.fill();
        c.fillStyle = "rgba(255, 64, 64, 0.8)";
        c.beginPath();
        c.arc(ary[idx].x, ary[idx].y, 7.5, 0, Math.PI*2, false);
        c.fill();
    }
    return surface;
};

var Hand = enchant.Class.create(enchant.Sprite, {
    initialize: function(speed, count) {
        enchant.Sprite.call(this, HAND_SIZE, HAND_SIZE);
        this.speed = speed;
        this.x = 100; // (640-440)/2
        this.y = 80;
        this.guuSurface = createHandSurface(GUU);
        this.choSurface = createHandSurface(CHO);
        this.paaSurface = createHandSurface(PAA);
        this.surfaceCount = count;
        this.image = this.nextSurface();
        this.addEventListener('enterframe', this.move);
    },
    
    move: function() {
        if (this.speed == 0) return;
        if (game.frame % this.speed == 0) {
            this.image = this.nextSurface();
        }  
    },
    
    nextSurface: function(){
        if(this.surfaceCount == 0) {
            this.surfaceCount++;
            return this.guuSurface;
        } else if(this.surfaceCount == 1) {
            this.surfaceCount++;
            return this.choSurface;
        }
        this.surfaceCount = 0;
        return this.paaSurface;
    }
});

var GUU_BUTTON = [{x: 180, y: 400}, {x: 260, y: 400}, {x: 180, y: 380}, {x: 260, y: 380}, {x: 190, y: 360}, {x: 210, y: 360}, {x: 230, y: 360}, {x: 250, y: 360}, {x: 170, y: 360},  {x: 150, y: 355}, {x: 140, y: 350}, {x: 130, y: 340}, {x: 130, y: 330}, {x: 140, y: 320}, {x: 150, y: 305}, {x: 140, y: 295}, {x: 125, y: 285}, {x: 110, y: 275}, {x: 95, y: 265}, /*ここから親指*/ {x: 85, y: 250}, {x: 80, y: 230}, {x: 75, y: 210},/*ここまで親指*/ {x: 80, y: 190}, {x: 90, y: 180}, {x: 105, y: 165}, {x: 110, y: 145}, /* ここから人差し指 */ {x: 120, y: 135}, {x: 130, y: 125}, {x: 150, y: 115}, {x: 170, y: 105},/*人差し指ここまで*/ {x: 180, y: 95}, {x: 200, y: 90}, /*ここから中指*/ {x: 220, y: 92}, {x: 240, y: 93}, {x: 260, y: 94},/*ここまで中指*/ {x: 276, y: 95}, {x: 295, y: 105}, /*ここから薬指*/ {x: 310, y: 110}, {x: 330, y: 120}, {x: 345, y: 130},/*ここまで薬指*/ {x: 367, y: 135}, {x: 385, y: 145}, /*ここから小指*/ {x: 388, y: 165}, {x: 390, y: 185}, {x: 387, y: 200}, /*ここまで小指*/ {x: 383, y: 215}, {x: 375, y: 230},{x: 370, y: 250}, {x: 357, y: 265}, {x: 345, y: 280}, {x: 333, y: 293}, {x: 317, y: 305}, {x: 300, y: 317}, {x: 310, y: 320},  {x: 310, y: 340}, {x: 300, y: 350}, {x: 290, y: 355}, {x: 270, y: 360}];
var CHO_BUTTON = [{x: 180, y: 400}, {x: 260, y: 400}, {x: 180, y: 380}, {x: 260, y: 380}, {x: 190, y: 360}, {x: 210, y: 360}, {x: 230, y: 360}, {x: 250, y: 360}, {x: 170, y: 360},  {x: 150, y: 355}, {x: 140, y: 350}, {x: 130, y: 340}, {x: 130, y: 330}, {x: 140, y: 320}, {x: 150, y: 305}, {x: 140, y: 295}, {x: 125, y: 285}, {x: 110, y: 275}, {x: 95, y: 265}, /*ここから親指*/ {x: 85, y: 250}, {x: 80, y: 230}, {x: 75, y: 210}, /*ここまで親指*/ {x: 80, y: 190}, {x: 90, y: 180}, {x: 105, y: 165}, {x: 110, y: 145}, /* ここから人差し指 */ {x: 100, y: 125}, {x: 100, y: 110}, {x: 95, y: 95}, {x: 95, y: 75}, {x: 94, y: 53}, {x: 104, y: 32}, {x: 115, y: 15}, {x: 132, y: 14}, {x: 155, y: 20}, {x: 165, y: 35}, {x: 170, y: 55}, {x: 175, y: 75}, /*人差し指ここまで*/ {x: 180, y: 95}, {x: 200, y: 90}, /*ここから中指*/ {x: 210, y: 75}, {x: 215, y: 55}, {x: 225, y: 30}, {x: 235, y: 20}, {x: 255, y: 10}, {x: 275, y: 18}, {x: 284, y: 35}, {x: 282, y: 55}, {x: 280, y: 78}, /*ここまで中指*/ {x: 276, y: 95}, {x: 295, y: 105}, /*ここから薬指*/ {x: 310, y: 110}, {x: 330, y: 120}, {x: 345, y: 130},/*ここまで薬指*/ {x: 367, y: 135}, {x: 385, y: 145}, /*ここから小指*/ {x: 388, y: 165}, {x: 390, y: 185}, {x: 387, y: 200}, /*ここまで小指*/ {x: 383, y: 215}, {x: 375, y: 230},{x: 370, y: 250}, {x: 357, y: 265}, {x: 345, y: 280}, {x: 333, y: 293}, {x: 317, y: 305}, {x: 300, y: 317}, {x: 310, y: 320},  {x: 310, y: 340}, {x: 300, y: 350}, {x: 290, y: 355}, {x: 270, y: 360}];
var PAA_BUTTON = [{x: 180, y: 400}, {x: 260, y: 400}, {x: 180, y: 380}, {x: 260, y: 380}, {x: 190, y: 360}, {x: 210, y: 360}, {x: 230, y: 360}, {x: 250, y: 360}, {x: 170, y: 360},  {x: 150, y: 355}, {x: 140, y: 350}, {x: 130, y: 340}, {x: 130, y: 330}, {x: 140, y: 320}, {x: 150, y: 305}, {x: 140, y: 295}, {x: 125, y: 285}, {x: 110, y: 275}, {x: 95, y: 265}, /*ここから親指*/ {x: 75, y: 265}, {x: 55, y: 260}, {x: 40, y: 250}, {x: 25, y: 240}, {x: 10, y: 225}, {x: 12, y: 210}, {x: 22, y: 195}, {x: 40, y: 185}, {x: 60, y: 188}, /*ここまで親指*/ {x: 80, y: 190}, {x: 90, y: 180}, {x: 105, y: 165}, {x: 110, y: 145}, /* ここから人差し指 */ {x: 100, y: 125}, {x: 100, y: 110}, {x: 95, y: 95}, {x: 95, y: 75}, {x: 94, y: 53}, {x: 104, y: 32}, {x: 115, y: 15}, {x: 132, y: 14}, {x: 155, y: 20}, {x: 165, y: 35}, {x: 170, y: 55}, {x: 175, y: 75}, /*人差し指ここまで*/ {x: 180, y: 95}, {x: 200, y: 90}, /*ここから中指*/ {x: 210, y: 75}, {x: 215, y: 55}, {x: 225, y: 30}, {x: 235, y: 20}, {x: 255, y: 10}, {x: 275, y: 18}, {x: 284, y: 35}, {x: 282, y: 55}, {x: 280, y: 78}, /*ここまで中指*/ {x: 276, y: 95}, {x: 295, y: 105}, /*ここから薬指*/ {x: 312, y: 90}, {x: 325, y: 75}, {x: 340, y: 60}, {x: 355, y: 50}, {x: 375, y: 60}, {x: 382, y: 78}, {x: 375, y: 95}, {x: 370, y: 112}, /*ここまで薬指*/ {x: 367, y: 135}, {x: 385, y: 145}, /*ここから小指*/ {x: 403, y: 138}, {x: 420, y: 130}, {x: 435, y: 145}, {x: 435, y: 165}, {x: 427, y: 178}, {x: 415, y: 195}, {x: 400, y: 205}, /*ここまで小指*/ {x: 383, y: 215}, {x: 375, y: 230},{x: 370, y: 250}, {x: 357, y: 265}, {x: 345, y: 280}, {x: 333, y: 293}, {x: 317, y: 305}, {x: 300, y: 317}, {x: 310, y: 320},  {x: 310, y: 340}, {x: 300, y: 350}, {x: 290, y: 355}, {x: 270, y: 360}];

var createButtonSurface = function(ary, bcolor) {
    var surface = new Surface(HAND_SIZE, HAND_SIZE);
    var c = surface.context;
    c.fillStyle = bcolor;
    for(idx in ary) {
        c.globalCompositeOperation = 'source-over';
        c.beginPath();
        c.arc(ary[idx].x / 6 + 2, ary[idx].y / 6 + 8, 4, 0, Math.PI*2, false);
        c.fill();
        c.globalCompositeOperation = 'lighter';
        c.beginPath();
        c.arc(ary[idx].x / 6 + 2, ary[idx].y / 6 + 8, 2, 0, Math.PI*2, false);
        c.fill();
    }
    return surface;
};

var HandButton = enchant.Class.create(enchant.Sprite, {
    initialize: function(hand) {
        enchant.Sprite.call(this, BUTTON_SIZE, BUTTON_SIZE);
        this.x = 120 + hand * 160; // (640-80)/2 if hand = 1
        this.y = 520;
        if(hand == 0) {
            this.surface = createButtonSurface(GUU_BUTTON, "rgba(128, 255, 128, 1.0)");
        } else if(hand == 1) {
            this.surface = createButtonSurface(CHO_BUTTON, "rgba(255, 128, 128, 1.0)");
        } else {
            this.surface = createButtonSurface(PAA_BUTTON, "rgba(128, 128, 255, 1.0)");
        }
        this.image = this.surface;
        this.hand = hand;
        this.addEventListener('touchstart', this.push);
    },
    
    push: function() {
        if(this.isTouch) return;
        this.isTouch = true;
        game.popScene();
        var r = new ResultScene(this.hand);
        game.pushScene(r);
    }
});

var BlackCircle = enchant.Class.create(enchant.Sprite, {
    initialize: function(hand) {
        enchant.Sprite.call(this, SCREEN_WIDTH, SCREEN_HEIGHT);
        this.x = 0;
        this.y = 0;
        var surface = new Surface(SCREEN_WIDTH, SCREEN_HEIGHT);
        var c = surface.context;
        c.fillStyle = "rgba(0, 0, 0, 1.0)";
        c.globalCompositeOperation = 'source-over';
        c.beginPath();
        c.arc(SCREEN_WIDTH / 2, 50 + HAND_SIZE / 2, HAND_SIZE / 2 * 1.1, 0, Math.PI*2, false);
        c.fill();
        this.image = surface;
    }
});


var MainScene = enchant.Class.create(enchant.Scene, {
    initialize: function() {
        enchant.Scene.call(this);
        game.frame = 0;
        this.isTouch = false;
        this.backgroundColor = BG_COLOR;
        var bg = new Sprite(game.width,game.height);
		bg.image = game.assets['img/background.jpg'];
		bg.x = 0;
		bg.y = 0;
		this.addChild(bg);
        var circle = new BlackCircle();
        this.addChild(circle);
        
        var hand = new Hand(1, 0);
        this.addChild(hand);
        for(var i = 0; i < 3; i++) {
            var button = new HandButton(i);
            this.addChild(button);
        }
    }
});

var RESULT_STRING = ["かち", "あいこ", "まけ"];
var RESULT_TABLE = [[1, 0, 2], [2, 1, 0], [0, 2, 1]];

var ResultScene = enchant.Class.create(enchant.Scene, {
    initialize: function(yourhand) {
        enchant.Scene.call(this);
        game.frame = 0;
        this.isTouch = false;
        this.backgroundColor = BG_COLOR;
        var bg = new Sprite(game.width,game.height);
		bg.image = game.assets['img/background.jpg'];
		bg.x = 0;
		bg.y = 0;
		this.addChild(bg);
        var circle = new BlackCircle();
        this.addChild(circle);
        
        var enemyhand = Math.floor( Math.random() * 3);
        var hand = new Hand(0, enemyhand);
        this.addChild(hand);
        
        this.result = RESULT_TABLE[yourhand][enemyhand];
        var size = 128;
        var resultString = RESULT_STRING[this.result];
        var sprite = new enchant.Sprite(game.width, size * 1.5);
        sprite.y = (game.height - size) / 4;
        sprite.image = new enchant.Surface(game.width, size * 1.5);
        sprite.image.context.fillStyle = '#fff';
        sprite.image.context.font = 'bold ' + (size - 2) + 'px sans-serif';
        var width = sprite.image.context.measureText(resultString).width;
        sprite.image.context.fillText(resultString, (game.width - width) / 2, size - 2);
        this.addChild(sprite);
        
        this.addEventListener('enterframe', this.move);
        jyanken_audio["pon"].play();
    
    },
    
    move: function() {
        if (game.frame == Math.floor(game.fps / 2)) {
            if(this.result == 0) {
                jyanken_audio["yatta"].play();
            } else if (this.result == 2){
                jyanken_audio["zuko"].play();
            }
        }
        if (game.frame > game.fps * 2) { // wait 2 sec
            game.popScene();
            var scene;
            if(this.result == 1) {
                jyanken_audio["aiko"].play();
                scene = new MainScene();
            } else {
                scene = new TitleScene();
            }
            game.pushScene(scene);
        }
    }
});

var TitleScene = enchant.Class.create(enchant.Scene, {
    initialize: function() {
        enchant.Scene.call(this);
        game.frame = 0;
        this.isTouch = false;
        this.backgroundColor = BG_COLOR;
        var bg = new Sprite(game.width,game.height);
		bg.image = game.assets['img/background.jpg'];
		bg.x = 0;
		bg.y = 0;
		this.addChild(bg);
        var circle = new BlackCircle();
        this.addChild(circle);
        
        var hand = new Hand(15, 1);
        this.addChild(hand);
        
        var size = 128;
        var titleString = 'じゃんけん';
        var sprite = new enchant.Sprite(game.width, size * 1.5);
        sprite.y = (game.height - size) / 8;
        sprite.image = new enchant.Surface(game.width, size * 1.5);
        sprite.image.context.fillStyle = '#fff';
        sprite.image.context.font = 'bold ' + (size - 2) + 'px sans-serif';
        var width = sprite.image.context.measureText(titleString).width;
        sprite.image.context.fillText(titleString, (game.width - width) / 2, size - 2);
        this.addChild(sprite);
        
        this.addEventListener('touchstart', function() {
            if(this.isTouch) return;
            this.isTouch = true;
            jyanken_audio["jyanken"].play();
            game.popScene();
            var m = new MainScene();
            game.pushScene(m);
        });
    }
});

window.onload = function(){
    enchant.Sound.enabledInMobileSafari = false;
    game = new enchant.Core(SCREEN_WIDTH, SCREEN_HEIGHT);
    game.fps = 15;
    game.preload('img/background.jpg');
    game.onload = function() {
        var title = new TitleScene();
        game.pushScene(title);
    }
    game.start();
    //game.debug();
}
