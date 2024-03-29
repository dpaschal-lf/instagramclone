<?php

require_once('functions.php');
set_exception_handler('handleExceptions');
require_once('mysql_connect.php');

if(!empty($_GET['id'])){
    $query = "SELECT p.`id`, p.`userID`, p.`externalID`, p.`likes`, p.`commentCount`, p.`extension`, p.`originalName`, p.`caption`, p.`added`,
    u.`externalID` as userExternalID, u.`displayName`
    FROM `posts` AS p
        JOIN `users` AS u
            ON u.`id` = p.`userID`
    WHERE p.`externalID`=? AND p.`status`='active'";
    $result = prepare_statement($query, [$_GET['id']]);
    if(!$result){
        throw new Exception('problem with query: '.$db->error);
    }
    if($result->num_rows===0){
        throw new Exception('invalid ID: '. $_GET['id'] );
    }
    $postData = $result->fetch_assoc();
    $postData['imagePath'] = generateImageURL($postData['userExternalID'], "{$postData['externalID']}.{$postData['extension']}");
    //"images/{$postData['userExternalID']}/{$postData['externalID']}.{$postData['extension']}";
    print(json_encode($postData));
    exit();
}



$query = "SELECT p.`userID`, p.`externalID`, p.`likes`, p.`commentCount`, p.`extension`, p.`originalName`,
    u.externalID as userExternalID, u.displayName,
    l.`added` AS likeAdded
    FROM `posts` AS p
        JOIN `users` AS u
            ON u.`id` = p.`userID`
        LEFT JOIN `likes` AS l
            ON u.`id` = l.`userID` AND p.`id` = l.`postID`
    WHERE p.`status`='active'";

$result = $db->query($query);

if(!$result){
    throw new Exception('query error '.$db->error);
}
$data = [];

while($row = $result->fetch_assoc()){
    $row['imagePath'] = "images/{$row['userExternalID']}/{$row['externalID']}.{$row['extension']}";
    $data[] = $row;
}

print(json_encode($data));


?>
