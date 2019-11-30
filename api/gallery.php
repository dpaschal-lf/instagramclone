<?php

require_once('functions.php');
set_exception_handler('handleExceptions');
require_once('mysql_connect.php');

$query = "SELECT `externalID`, `likes`, `commentCount` FROM `posts` WHERE `status`='active'";

$result = $db->query($query);

if(!$result){
    throw new Exception('query error '.$db->error);
}
$data = [];

while($row = $result->fetch_assoc()){
    $data[] = $row;
}

print(json_encode($data));


?>
