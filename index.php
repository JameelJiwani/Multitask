<!DOCTYPE html>
<html>
<head>
    <script src="./assets/canvasengine/canvasengine-1.3.2.all.min.js"></script>
    <link rel=stylesheet type=text/css href="assets/css/theme.css">
    <link rel="icon" type="image/png" href="assets/img/favicon.ico">
    <title>Learn from your Mistakes</title>
</head>
<body>
    <div id="gameContainer">
        <canvas id="gameFrame"></canvas>
        <button type="button" id="startbutton">START</button> <!-- onclick="startGame()" -->
    </div>

    <script type="text/javascript" src="assets/js/theme.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script>
        $(document).ready(function(){
            $("button").click(function(){
                $("#startbutton").fadeOut("slow");
                $('body').css('cursor', 'url(assets/img/favicon.ico), auto');

            });
        });
    </script>
</body>
</html>

<!--The point of this game is to avoid the objects flying at you while answering simple questions. Can you multitask as well as you think?-->
