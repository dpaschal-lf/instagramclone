<?php

require_once('functions.php');
set_exception_handler('handleExceptions');
require_once('mysql_connect.php');

if(empty($_GET['postID'])){
    throw new Exception('must provide post id');
}

$userInternalID = getIdFromExternalID('users', $userExternalID);
$postInternalID = getIdFromExternalID('posts', $_GET['postID']);

$query = "SELECT id FROM `likes` WHERE `userID`={$userInternalID} AND `postID`={$postInternalID}";

$result = $db->query($query);
if(!$result){
    throw new Exception('invalid like query '. $db->error);
}
$transactionResult = $db->query('START TRANSACTION');
if(!$transactionResult){
    throw new Exception('error starting transaction');
}
if($result->num_rows===0){
    $direction = '+1';
    $query = "INSERT INTO `likes` SET 
        `userID` = {$userInternalID},
        `postID` = {$userInternalID},
        `added` = NOW()
    ";
} else {
    $direction = '-1';
    $query = "DELETE FROM `likes` WHERE `id` = " . $result->fetch_assoc()['id'];
}

$result = $db->query($query);
if(!$result){
    throw new Exception('invalid like query '. $db->error);
}
if($db->affected_rows===0){
    throw new Exception('error updating like count');
}

$aggregateAdjustQuery = "UPDATE `posts` SET `likes`=`likes`{$direction} WHERE `id`={$postInternalID}";

$result = $db->query($aggregateAdjustQuery);
if(!$result){
    throw new Exception('invalid like query '. $db->error);
}
if($db->affected_rows===0){
    throw new Exception('error updating like aggregate count');
}

$transactionResult = $db->query('COMMIT');
if(!$transactionResult){
    throw new Exception('error starting transaction');
}

$row =  $result->fetch_assoc();
$row['avatar'] = "images/{$_GET['id']}/{$row['avatar']}";

print( json_encode( ['alterAmount'=>intval($direction)] ));

?>