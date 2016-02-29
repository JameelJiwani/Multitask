<?php

include 'db.php';
$score = $_POST["score"];
$userName = $_POST["highscoreName"];

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "INSERT INTO user (score, userName)
VALUES ('$score', '$userName')";

if (mysqli_query($conn, $sql)) {
  header("Location: /");
  die();
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>
