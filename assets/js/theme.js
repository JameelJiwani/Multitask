 var canvas = CE.defines("gameFrame").
            extend(Input).
            extend(Hit).
    		ready(function() {
    			canvas.Scene.call("gameScene");
    });	
    
function gameStart(){
    //BEGIN POINTS
    //BEGIN SHAPES AND QUESTIONS
    //FIND WAY TO HAVE QUESTIONS AT THE START
}
    
function spawnAnEnemy(){
    var difficulty = 3;
    var randNum = Math.floor(Math.random() * difficulty) + 1;
    
    if (randNum == 1) {
        //Spawn number question
        var a, b, plusMinus, answer;
        var isOneDig = true;
        
        a = Math.floor(Math.random() * 20) + 1;
        b = Math.floor(Math.random() * 20) + 1;
        plusMinus = Math.floor(Math.random() * 2);
        if(plusMinus == 1){
            answer = a + b;
            if((a+b) > 9 || (a+b) < 0){
                isOneDig(false);
                //WHAT DOES FALSE DO? SHOULD COME UP WITH TWO NEW NUMBERS
            } else {
                //CHECK ANSWER
            }
        } else {
            answer = a - b;
            if((a-b) > 9 || (a-b) < 0){
                isOneDig(false);
            } else {
                //CHECK ANSWER
            }
        }
    } else if (randNum == 2){
        //Spawn spelling question
        //Make array of words to use, a random integer will be selected for charAt
        var words = ["Estonia", "drive", "turtle", "street", "facilitated", "computer", "window", "sleep", "wonder", "restaurant", "accommodate"];
        var chosen = (Math.floor(Math.random() * 10)) + 0;
        var limit = words[chosen].length;
        var character = Math.floor(Math.random() * limit) + 0;
        var answer = chosen[character];
        //STATE QUESTION
        document.write("What is letter number " + character + " in the word " + chosen + "?");
        //CHECK ANSWER
    } else { 
        //Spawn rectangle
    }
} 
    

    

canvas.Scene.new({
    name: "gameScene",
    materials: {
        // Usually put relatives links
    	images: {
            "bg": {path: "../assets/img/background.png", index: 0}
		}
	},/*
	called: function(stage) { 
		
	},
	preload: function(stage, pourcent, material){
		
	},*/
	ready: function(stage) {
		
		function addEntities(x, y) {
	        var entity = Class.New("Entity", [stage]);
	        entity.rect(10); // square
	        entity.position(x, y);
	        entity.el.fillStyle = "red";
	        entity.el.fillRect(0, 0, 10, 10);
	        stage.append(entity.el);
	        return entity;
	     }
	     
	     this.entityA = addEntities(0, 10);
	     this.entityB = addEntities(50, 10);
       
	},
	
	render: function(stage) {
		
	    this.entityA.move(5,1); // x += 5;
		this.getCan.onmousemove(function(e){
			alert("Yay");
		});
	    this.entityA.hit([this.entityB], function(state, el) {
	        if (state == "over") {
	          el.fillStyle = "green";
	          el.fillRect(0, 0, 10, 10);
	        }
	    });
	    stage.refresh();
	  }
});
    
function enemyGenerate(){
	var randomNum = Math.floor(Math.random()*3);
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
    
