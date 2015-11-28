var enemyStreamline;
var enemyStreamNum = 1; 
var enemyPool = new Array();
var enemyCurvePool = new Array();
 
var canvas = CE.defines("gameFrame").
    extend(Input).
    extend(Hit).
	ready(function() {
		canvas.Scene.call("gameScene");
});	

canvas.Scene.new({
    name: "gameScene",
    materials: {
        // Usually put relatives links
    	images: {
            "bg": {path: "../assets/img/background.png", index: 0}
		},
		sounds: {
		    soundTrack: "../assets/audio/SoundtrackGLHF.mp3"
		}
	},
	called: function(stage) { 
		$("#gameFrame").height($(window).height()).width($(window).width());
	},/*
	preload: function(stage, pourcent, material){
		
	},*/
	ready: function(stage) {
	    var con = this;
		function addEntities(x, y, self) {
	        var entity = Class.New("Entity", [stage]);
	        entity.rect(10); // square
	        entity.position(x, y);
            entity.el = self.createElement(10, 10);
	        entity.el.fillStyle = "red";
	        entity.el.fillRect(0, 0, 10, 10);
	        entity.el.on("mouseover", function(e){
                alert("lol");
                //ahhhhhhhhh
            });
            stage.append(entity.el);
            var speed = Math.floor(Math.random() * 10) + 1;
            enemyCurvePool.push([-1, 0]);
            enemyPool.push(entity);
	        return entity;
	     }
	     
	     for(var i = 0; i < 30; i++){
	        var top = Math.floor(Math.random() * 200) + 1;
	        var left = $(window).width();
	        enemyStreamline = setInterval(addEntities(300, top, con), 100);
	     }
	     
	     //clearInterval(enemyStreamline);
	},
	
	render: function(stage){
	    //alert(enemyCurvePool.length);
	    for (var i = 0; i < enemyCurvePool.length; i++){
	       var curvePath = Math.floor(Math.random() * 3.14) + 0;
	       var update = curve(enemyCurvePool[i][0], enemyCurvePool[i][1], curvePath, 0.1);
	       enemyCurvePool[i][0] = update[0];
	       enemyCurvePool[i][1] = update[1];
    	   enemyPool[i].move(update[0], update[1]); // x += 5;
    	   //alert(update[0]+","+ update[1]);
    	}
    	
    	stage.refresh();
	}
});



function curve(x, y, p_curve, rate){
    var g_track = new Array();
    
    g_track[0] = x - Math.sin(p_curve) * rate;
    if((Math.floor(Math.random() * 2) + 1) > 1){
        g_track[1] = y + Math.cos(p_curve) * rate;
    }else{
        g_track[1] = y - Math.cos(p_curve) * rate;
    }
    
    
    return g_track;
    
}



function gameStart(){
    startTimer();
    enemyGenerate();
    playMusic();
    
}

function spawnAnEnemy(){
    var difficulty = 3;
    var randNum = Math.floor(Math.random() * difficulty) + 1;
    
    if (randNum == 1) {
        //Spawn number question
        var a, b, plusMinus, answer;
        var isOneDig = false;
        while (isOneDig == false){
        a = Math.floor(Math.random() * 20) + 1;
        b = Math.floor(Math.random() * 20) + 1;
        plusMinus = Math.floor(Math.random() * 2) + 1;
        if(plusMinus == 1){
            answer = a + b;
            if((a+b) < 9 && (a+b) > 0){
                isOneDig(true);
                //CHECK ANSWER
            }
        } else {
            answer = a - b;
            if((a-b) < 9 && (a-b) > 0){
                isOneDig(true);
                //CHECK ANSWER
            }
        }
        } 
    } else if (randNum == 2){
        //Spawn spelling question
        //Make array of words to use, a random integer will be selected for charAt
        var words = ["Estonia", "science", "turtle", "street", "facilitated", "computer", "window", "sleep", "wonder", "restaurant", "accommodate"];
        var chosen = (Math.floor(Math.random() * 10)) + 0;
        var limit = words[chosen].length;
        var character = Math.floor(Math.random() * limit) + 0;
        var answer = chosen[character];
        //STATE QUESTION
        //<h2> ("What is letter number " + character + " in the word " + chosen + "?") </h2> //DOES THIS WORK????
        //CHECK ANSWER, HOW DO YOU COMPARE USER INPUT?
    } else { 
        
    }
} 
    


function enemyGenerate(){
	var randomNum = Math.floor(Math.random()*3) + 1;
	var spawnRate;
	
	if(randomNum == 1){
		spawnRate = 1;
		
	} else if(randomNum == 2){
		spawnRate = 3;
		
	} else {
		spawnRate = 5;
	}
	
	//Calls spawnAnEnemy, where actual enemies are created
 	for(var i = 0; i < spawnRate; i++){
 	    spawnAnEnemy();
 	}
	
}

//enemyGenerate();

//timer

var stopwatch;

function startTimer(){
    stopwatch = setInterval(updateDisplay, 1);
}

function pauseTimer(){
    stopwatch = clearInterval(updateDisplay);
}

function updateDisplay() {
    var value = parseInt($('#timer').find('.value').text(), 10);
    value++;
    $('#timer').find('.value').text(value);
}

function playMusic(){
    canvas.Sound.playLoop("soundTrack");
}
