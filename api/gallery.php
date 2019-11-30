<?php

require_once('functions.php');
set_exception_handler('handleExceptions');
require_once('mysql_connect.php');

$query = "SELECT p.`userID`, p.`externalID`, p.`likes`, p.`commentCount`, p.`extension`,
    u.externalID as userExternalID, u.displayName
    FROM `posts` AS p
        JOIN `users` AS u
            ON u.`id` = p.`userID`
    WHERE p.`status`='active'";

$result = $db->query($query);

if(!$result){
    throw new Exception('query error '.$db->error);
}
$data = [];

while($row = $result->fetch_assoc()){
    $row['imagePath'] = "images/{$row['userID']}/{$row['externalID']}.{$row['extension']}";
    $data[] = $row;
}

print(json_encode($data));


?>
