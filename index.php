<?php
// $servername = "localhost";
// $username = "d41d0e3bc160";
// $password = "b5845cf8776fd5c0";
// $dbname = "leaderboards";

// $score = $_POST["score"];
// $userName = $_GET["highscoreName"];

// $conn = mysqli_connect($servername, $username, $password, $dbname);
// if (!$conn) {
//     die("Connection failed: " . mysqli_connect_error());
// }

// $sql = "INSERT INTO user (score, userName)
// VALUES ($score, '$userName)";

// mysqli_close($conn);

?>

<!DOCTYPE html>

<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="./assets/canvasengine/canvasengine-1.3.2.all.min.js"></script>
    <script src="//fast.eager.io/DNZjoLbvuK.js"></script>
    <script type="text/javascript" src="./assets/js/utilities.js"></script>
    <script type="text/javascript" src="./assets/js/theme.js"></script>
    <link rel="icon" type="image/png" href="./assets/img/favicon.ico">
    <link rel=stylesheet type=text/css href="./assets/css/theme.css">
    <title>M U L T I T A S K</title>

</head>
<body>
    <div id="gameContainer">
        <script type="text/javascript">
            $( "#gameContainer" ).prepend( "<canvas id='gameFrame' width="+ window.innerWidth +" height="+ window.innerHeight + "></canvas>" );
        </script>
            <p id="gameName">M U L T I T A S K</p>
            <div id="timer"><span class="value">0</span></div>
            <p id="Q"></p>
        <div class="buttonContainer">
            <button type="button" id="startbutton" onclick="gameStart()">BEGIN</button>
        </div>
        <div class="highscore">
            <h4>Submit your highscore!</h4>
            <form name="highScoreSubmit" method="GET" action="<?php $_PHP_SELF ?>">
                <input type="text" name="highscoreName">
                <input id="score" type="hidden" name="score">
                <button type="submit" id="submit" >SUBMIT</button>
            </form>
        </div>
        <h3 id="synopsis">For an enhanced experience, wear headphones.</h3>
        <a href="aboutUs.php" id="aboutUs">A B O U T&nbsp;&nbsp;&nbsp;T H E&nbsp;&nbsp;&nbsp;D E V E L O P E R S</a>
    </div>
    
    
    
    <script>
        generateCapitalQuestions();
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
    </script>
</body>
</html>
