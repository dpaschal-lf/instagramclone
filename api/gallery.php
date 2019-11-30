<?php

require_once('functions.php');
set_exception_handler('handleExceptions');
require_once('mysql_connect.php');

$query = "SELECT `userID`, `externalID`, `likes`, `commentCount`, `extension` FROM `posts` WHERE `status`='active'";

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
