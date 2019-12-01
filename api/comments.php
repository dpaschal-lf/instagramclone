<?php

require_once('functions.php');
set_exception_handler('handleExceptions');
require_once('mysql_connect.php');

if(empty($_GET['postID'])){
    throw new Exception('must supply an id');
}

if(!empty($_GET['postID'])){
    $query = "SELECT p.`id`, p.`userID`, p.`externalID`, p.`likes`, p.`commentCount`, p.`extension`, p.`originalName`, p.`caption`, p.`added`,
    u.`externalID` as userExternalID, u.`displayName`
    FROM `posts` AS p
        JOIN `users` AS u
            ON u.`id` = p.`userID`
    WHERE p.`id`=1 AND p.`status`='active'";
    $result = $db->query($query);
    if(!$result){
        throw new Exception('problem with query: '.$db->error);
    }
    if($result->num_rows===0){
        throw new Exception('invalid ID: '. $_GET['id'] );
    }
    $postData = $result->fetch_assoc();
    $postData['imagePath'] = "images/{$postData['userExternalID']}/{$postData['externalID']}.{$postData['extension']}";
    $postData['comments'] = getCommentsForPost($postData['id']);
    print(json_encode($postData));
    exit();
}