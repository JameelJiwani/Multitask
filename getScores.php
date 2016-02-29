<?php
/**
 * Created by IntelliJ IDEA.
 * User: jameeljiwani
 * Date: 2016-02-03
 * Time: 4:31 PM
 */

include 'db.php';

$rank = 1;

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql="SELECT * FROM `user` ORDER BY `userID` DESC limit 1";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_array($result);
$userID = $row['userID'];

$sql="SELECT * FROM `user` ORDER BY `score` DESC limit 10";
$result = mysqli_query($conn,$sql);

echo "<table>
<tr>
<th>Rank</th>
<th>Name</th>
<th>Score</th>
</tr>";

while($row = mysqli_fetch_array($result)) {
    echo "<tr>";
    echo "<td>" . $rank++ . "</td>";
    echo "<td>" . $row['userName'] . "</td>";
    echo "<td>" . $row['score'] . "</td>";
    echo "</tr>";
}

$sql = "SELECT * FROM (
                SELECT t.userID,
                  t.userName,
                  t.score,
                  @rownum := @rownum + 1 AS position
                FROM user t
                JOIN (SELECT @rownum := 0) r
                ORDER BY t.score DESC
          ) result
          WHERE result.userID = ' " . $userID . " ' ";
$result = mysqli_query($conn, $sql);

$row = mysqli_fetch_array($result);

    echo "<tr>";
    echo "<td>" . $row['position'] . "</td>";
    echo "<td>" . $row['userName'] . "</td>";
    echo "<td>" . $row['score'] . "</td>";
    echo "</tr>";

echo "</table>";

mysqli_close($conn);
?>