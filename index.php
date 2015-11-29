<!DOCTYPE html>
<html>
<head>
    <script src="./assets/canvasengine/canvasengine-1.3.2.all.min.js"></script>
    <link rel=stylesheet type=text/css href="assets/css/theme.css">
    <link rel="icon" type="image/png" href="assets/img/favicon.ico">
    <title>M U L T I T A S K</title>
</head>
<body>
    <div id="gameContainer">
        <canvas id="gameFrame" width="1440" height="1080"></canvas>
        <div id="topBar">
            <p id="gameName">M U L T I T A S K</p>
            <a href="aboutUs.php" id="aboutUs">About Us</a>
        </div>
        <div id="timer"><span class="value">0</span></div>
        <div class="buttonContainer"><button type="button" id="startbutton" onclick="gameStart()">BEGIN</button></div>
        <h3 id="synopsis">Best experienced with headphones.</h3>
    </div>
    
    <script type="text/javascript" src="assets/js/theme.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script>
        $(document).ready(function(){
            $("button").click(function(){
                $("#startbutton").fadeOut("slow");
                $("#synopsis").fadeOut("slow");
                $("#timer").css("opacity", "1");
                $('body').css('cursor', 'url(assets/img/favicon.ico), auto');
                $("#aboutUs").fadeOut("slow");
                $("#gameName").fadeOut("slow");
            });
        });
    </script>
</body>
</html>


<!--$( "#dialog" ).dialog({-->
<!--                    autoOpen: false,-->
<!--                    show: {-->
<!--                        effect: "blind",-->
<!--                        duration: 1000-->
<!--                    },-->
<!--                    hide: {-->
<!--                        effect: "explode",-->
<!--                        duration: 1000-->
<!--                    }-->
<!--                });-->
<!--                $( "#opener" ).click(function() {-->
<!--                    $( "#dialog" ).dialog( "open" );-->
<!--                });-->
