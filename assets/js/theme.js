var enemyStreamline;
var enemyStreamFreq = 300;
var questionFreq = 10000;
var isSpawning = false;
var enemyPool = new Array();
var enemyCurvePool = new Array();
var mouseX = 0, mouseY = 0;
var g_agent;
var g_index;
var enemyTally = {"NWB":1, "SBQ":1, "BWG":1, "SWP":1, "SCO": 1}; //"SWP":0, "SCO":0,
var isWaitingAnswer = false; //the char that is right
//var words = ["Estonia", "science", "turtle", "street", "facilitated", "computer", "window", "sleep", "wonder", "restaurant", "accommodate"];
var qList = [   "What is the second letter of Estonia?",
    "What is the third letter of science?",
    "What is the first letter of turtle?",
    "What is the second last letter of street?",
    "What is the last letter of facilitated?",
    "What is the fifth letter of restaurant",
    "What is the second letter of Chevrolet",
    "What is the last letter of nostalgia?",
    "The capital of Poland starts with ___",
    "The circumference of a circle can be defined as ___ pi * r",
    "2 b or not 2 ___",
    "2 + 4 = __",
    "Luv our site? (y/n)",
    "John __ Kennedy",
    "Elizabeth is the Queen of the U.__.",
    "abc.xy__",
    "8 + 1 = __",
    "2 cubed = __"
];

var cList = ['s', 'i', "t", 'e', 'd', 'a', 'h','a', 'w', '2', 'b', '6', 'y', 'f', 'k', 'z', '9', '8'];
var timeout; // current timeout id to clear
var timeoutq;


//game pieces
function paintAgent(){
    g_agent.el.fillStyle = "yellow";
    //g_agent.el.drawImage("ufo");
    //g_agent.el.setOriginPosition("middle");
    g_agent.el.fillRect(0, 0, 30, 30);
}

function toggleEnemyGeneration(status){
    isSpawning = status;
}

//game start and over
function gameStart(){
    startTimer();
    toggleEnemyGeneration(true);
    playMusic();
    paintAgent();
    isWaitingAnswer = false;
    $('body').css('cursor', 'none');
}

function gameOver(){
    pauseTimer()
    toggleEnemyGeneration(false);
    $("#score").val(timerVal);
    $("#Q").html("");
    g_agent.el.fillStyle = "green";
    g_agent.el.fillRect(0, 0, 0, 0);
    canvas.Sound.stop("soundTrack");
    $(".highscore").fadeTo("slow", 1.0);
    $("#startbutton").html("RETRY");
    $("#startbutton").fadeIn("slow");
    $('body').css('cursor', 'url(assets/img/favicon.ico), auto');
}






//the game set up

var canvas = CE.defines("gameFrame").
extend(Input).
extend(Hit).
ready(function() {
    canvas.Scene.call("gameScene");
});

canvas.Scene.new({
    name: "gameScene",
    materials: {
        sounds: {
            soundTrack: "../assets/audio/SoundtrackGLHF.mp3"
        },
        images: {
            ufo: "../assets/img/ufo.gif"
        }
    },
    called: function(stage) {
        //$("#gameFrame").height($(window).height()).width($(window).width());
    },
    ready: function(stage) {
        var con = this;
        var thisCanvas = this.getCanvas();


        //add an enemy here
        function addEntities(x, y, self, type) {

            var entity = Class.New("Entity", [stage]);
            entity.rect(40); // square

            var entColor = "red";
            var speed = -1; //default
            //{"NWB":0, "SBQ":0, "BWG":0, "SWP":0, "SCO":0};

            //set color, direction, spawn location here
            switch(type){
                case "NWB":
                    entColor = "brown";
                    break;
                case "SBQ":
                    entColor = "blue";
                    break;
                case "BWG":
                    entColor = "green";
                    speed = 1;
                    x = 0;
                    break;
                case "SWP":
                    entColor = "purple";
                    break;
                case "SCO":
                    entColor = "orange";
                    break;
                default:
                    entColor = "white";
                    break;
            }

            enemyCurvePool.push([speed, 0]);
            entity.position(x, y);
            entity.el = self.createElement(40, 40);
            entity.el.fillStyle = entColor;
            entity.el.fillRect(0, 0, 40, 40);
            entity.el.T = type;

            stage.append(entity.el);
            enemyPool.push(entity);
            return entity;
        }



        //create agent
        updateMouse();
        this.agent = Class.New("Entity", [stage]);
        this.agent.rect(40); // square
        this.agent.position(mouseX, mouseY);
        this.agent.el = this.createElement(40, 40);
        g_agent = this.agent;
        stage.append(this.agent.el);

        //multi thread
        $(document).keypress(function(e) {
            if(String.fromCharCode(e.which)!= cList[g_index]){
                isWaitingAnswer = false;
                gameOver();
            }else{ //correct
                isWaitingAnswer = false;
                $("#Q").html("");
            }
        });

        function come(){

            var top = Math.floor(Math.random() * $(window).height()) + 0;
            var left = $(window).width();
            var distrubution = new Array();
            var total = 0;

            for (var i in enemyTally){
                total += enemyTally[i];
                for(var j = 0; j < enemyTally[i]; j++){
                    distrubution.push(i);
                }
            }
            var rand = Math.floor(Math.random() * total);
            addEntities(left, top, con, distrubution[rand]);

        }

        function ask(){
            if (isWaitingAnswer){ //taking too long
                isWaitingAnswer = false;
                gameOver();
            }else{
                isWaitingAnswer = true;
                g_index = Math.floor(Math.random() * (qList.length-1));
                $("#Q").html(qList[g_index]);
            }

        }

        //secondary game loop
        (function repeatE() {
            if(isSpawning){
                come();
            }
            timeout = setTimeout(repeatE, enemyStreamFreq);
        })();


        (function repeatQ() {
            if(isSpawning){
                ask();
            }
            timeoutq = setTimeout(repeatQ, questionFreq);
        })();



    },

    render: function(stage){
        updateMouse();
        this.agent.position(mouseX, Math.pow(mouseY, 1));

        var self = this;
        //alert(enemyCurvePool.length);
        for (var i = 0; i < enemyCurvePool.length; i++){

            var curvePath = Math.floor(Math.random() * 3.14) + 0;
            var speed = 0.3;
            var update = curve(enemyCurvePool[i][0], enemyCurvePool[i][1], curvePath, speed, false);

            //set curve, speed
            switch(enemyPool[i].el.T){
                case "NWB":
                    break;
                case "SBQ":
                    curvePath = 3.1415/2;
                    speed = 1;
                    update = curve(enemyCurvePool[i][0], enemyCurvePool[i][1], curvePath, speed, false);
                    break;
                case "BWG":
                    update = curve(enemyCurvePool[i][0], enemyCurvePool[i][1], curvePath, speed, true);
                    x = 0;
                    break;
                case "SWP":
                    var speed = 0.1;
                    var amp = Math.floor(Math.random() * 20.0) + 15.0;
                    update = curveWithFunction(enemyCurvePool[i][0], enemyCurvePool[i][1], amp, speed, "sin", false, false);
                    break;
                case "SCO":
                    var speed = 0.01;
                    update = curveWithFunction(enemyCurvePool[i][0], enemyCurvePool[i][1], 30.0, speed, "normal", false, true);
                    break;
                default:
                    break;
            }


            enemyCurvePool[i][0] = update[0];
            enemyCurvePool[i][1] = update[1];
            enemyPool[i].move(update[0], update[1]); // x += 5;
            enemyPool[i].hit([this.agent], function(state, el) {
                if (state == "over") {

                    enemyTally[el.T]++; //learning
                    gameOver();
                }
            });
        }

        stage.refresh();
    }
});




//mechs
function updateMouse(){
    $(document).mousemove(function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
    }).mouseover();
}

function curve(x, y, p_curve, rate, reverse){
    var g_track = new Array();

    if(!reverse){
        g_track[0] = x - Math.sin(p_curve) * rate;
    }else{
        g_track[0] = x + Math.sin(p_curve) * rate;
    }

    if((Math.floor(Math.random() * 2) + 1) > 1){
        g_track[1] = y + Math.cos(p_curve) * rate;
    }else{
        g_track[1] = y - Math.cos(p_curve) * rate;
    }


    return g_track;

}

function curveWithFunction(x, y, amp, speed, func, reverse, speedChange){
    var g_track = new Array();

    if(speedChange){
        if(!reverse){
            g_track[0] = x - (speed * (Math.floor(Math.random() * amp) + 1));
        }else{
            g_track[0] = x + (speed * (Math.floor(Math.random() * amp) + 1));
        }
    }else{
        if(!reverse){
            g_track[0] = x - speed;
        }else{
            g_track[0] = x + speed;
        }
    }

    switch (func) {
        case "sin":
            g_track[1] = amp *  Math.sin(x);
            break;
        default:
            g_track[1] = y;
            break;
    }

    return g_track;
}
var stopwatch;

function startTimer(){
    $('#timer').find('.value').text(0);
    stopwatch = setInterval(updateDisplay, 1);
}

function pauseTimer(){
    clearInterval(stopwatch);
}


window.timerVal;
function updateDisplay() {
    timerVal = parseInt($('#timer').find('.value').text(), 10);
    if(isSpawning){
        timerVal++;
    }
    }
    $('#timer').find('.value').text(timerVal);
}

function playMusic(){
    canvas.Sound.playLoop("soundTrack");
}



var countDownClock;
var second = 0;
var TIMEFORQ = 5;
function startCountDownClock(){
    second = 0;
    countDownClock = setInterval(updateCountDown, 1000);
}
function updateCountDown(){
    second++;
}
function stopCountDownClock(){
    clearInterval(countDownClock);
}

function storeDataInCookie(){

}
