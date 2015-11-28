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
                // For CanvasEngine load "bar" first, we add index property
                "preloader": {path: "http://rsamaium.github.io/CanvasEngine/samples/preload/images/bar_full.jpg", index: 0},
                "1": "http://rsamaium.github.io/CanvasEngine/samples/preload/images/1.jpg",
                "2": "http://rsamaium.github.io/CanvasEngine/samples/preload/images/2.jpg",
                "3": "http://rsamaium.github.io/CanvasEngine/samples/preload/images/3.jpg"
    		}
    	},
    	called: function(stage) {
            // Initialize an element
    		this.el = this.createElement();
    		stage.append(this.el);
    	},
    	preload: function(stage, pourcent, material) {
    		this.el.drawImage("gameScene", 0, 0, pourcent + "%");
    	},
    	ready: function(stage) {
            this.element = this.createElement();
            this.element.drawImage("1");
            stage.append(this.element);
            canvas.Input.keyDown(Input.A, function(e) {
                console.log("A is pressed");
            });
            function addEntities(x, y) {
                var entity = Class.New("Entity", [stage]);
                entity.rect(100); // square
                entity.position(x, y);
                entity.el.fillStyle = "red";
                entity.el.fillRect(0, 0, 100, 100);
                stage.append(entity.el);
                return entity;
             }
        
             this.entityA = addEntities(0, 10);
             this.entityB = addEntities(300, 10);
    	},
    	render: function(stage){
    	    this.entityA.move(5, 10); // x += 5;
            this.entityA.hit([this.entityB], function(state, el) {
                if (state == "over") {
                  el.fillStyle = "green";
                  el.fillRect(0, 0, 100, 100);
                }
            });
            stage.refresh();
    	}
    });	
    
