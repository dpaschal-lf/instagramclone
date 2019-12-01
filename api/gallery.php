<?php

require_once('functions.php');
set_exception_handler('handleExceptions');
require_once('mysql_connect.php');

if(!empty($_GET['id'])){
    $query = "SELECT p.`userID`, p.`externalID`, p.`likes`, p.`commentCount`, p.`extension`, p.`originalName`, p.`caption`, p.`added`,
    u.`externalID` as userExternalID, u.`displayName`
    FROM `posts` AS p
        JOIN `users` AS u
            ON u.`id` = p.`userID`
    WHERE p.`id`=1 AND p.`status`='active'"
    $result = $db->query($query);
    if(!$result){
        throw new Exception('problem with query: '.$db->error);
    }
    if($result->num_rows===0){
        throw new Exception('invalid ID: .' $_GET['id'] );
    }
    $postData = $result->fetch_assoc();
    print(json_encode($postData));
}
JOIN `comments` AS c
ON p.`id` = c.`postID` AND c.`status` = 'active'
c.`userID` AS posterID, c.`added` AS messageAdded, c.`edited` AS messagedEdited, c.`message`


$query = "SELECT p.`userID`, p.`externalID`, p.`likes`, p.`commentCount`, p.`extension`, p.`originalName`,
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
