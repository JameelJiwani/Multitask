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
            <p id="gameName">M U L T I T A S K</p>
            <div id="timer"><span class="value">0</span></div>
            <p id="Q"></p>
        <div class="buttonContainer">
            <button type="button" id="startbutton" onclick="gameStart()">BEGIN</button>
        </div>
        <div id="leaderboard" class=""></div>
        <div class="highscore">
            <h4>Submit your highscore!</h4>
            <form name="highScoreSubmit" id="highScoreSubmit" method="POST" action="submitScore.php">
                <span id="result"></span>
                <input type="text" name="highscoreName" id="highscoreName" required>
                <input id="score" type="hidden" name="score">
                <button type="submit" id="submit" onclick"leaderboard()">SUBMIT</button>
            </form>
        </div>
        <h3 id="synopsis">For an enhanced experience, wear headphones.</h3>
        <a href="aboutUs.php" id="aboutUs">A B O U T&nbsp;&nbsp;&nbsp;T H E&nbsp;&nbsp;&nbsp;D E V E L O P E R S</a>
    </div>
    
    <script type="text/javascript" src="assets/js/theme.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script>
        $(document).ready(function(){
            $("button").click(function(){
                $("#startbutton").fadeOut("slow");
                $("#synopsis").fadeOut("slow");
                $(".highscore").fadeOut("slow");
                $("#gameName").fadeOut("slow");
                $("#aboutUs").fadeOut("slow");
                $("#timer").css("opacity", "1");
               // $('body').css('cursor', 'url(assets/img/favicon.ico), auto');
            });
        });

        $("#submit").click( function() {
            $.post( $("#highScoreSubmit").attr("action"),
                $("#highScoreSubmit :input").serializeArray(),
                function(info){
                    $("#result").html(info);
                });
            leaderboard();
            clearInput();
        });

        $("#highScoreSubmit").submit( function() {
            return false;
        });
        function clearInput() {
            $("#highScoreSubmit :input").each( function() {
                $(this).val('');
            });
        }

        function leaderboard() {
            if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            } else {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    document.getElementById("leaderboard").innerHTML = xmlhttp.responseText;
                }
            };
            xmlhttp.open("POST","getScores.php",true);
            xmlhttp.send();
        }

    </script>
</body>
</html>
