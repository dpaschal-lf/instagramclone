<?php

require_once('functions.php');
set_exception_handler('handleExceptions');
require_once('mysql_connect.php');

if($userData = validateUser()){
    throw new Exception('must be logged in');
}
$userExternalID = $userData['externalID'];

$postData = getBodyData();

if(empty($postData['commentID'])){
    throw new Exception('must supply a comment id');
}
if(empty($postData['message'])){
    throw new Exception('must supply comment content');
}
$internalCommentID = getIdFromExternalID( 'comments', $postData['commentID'] );

$internalUserID = $userData['id'];
$externalID = generateRandomString(20);

if(!$db->query('START TRANSACTION')){
    throw new Exception('problem with transaction start');
}

$query = "UPDATE `comments` SET
        `message` = ?,
        `edited` = NOW()
        WHERE `id` = ? AND `userID`= ?
    ";
$result = prepare_statement($query, [
    $postData['message'],
    $internalCommentID,
    $internalUserID
]);

if(!$result || $db->affected_rows===0){
    throw new Exception('error with query ' . $db->error);
}

if(!$db->query('COMMIT')){
    throw new Exception('problem with transaction start');
}

print( json_encode( ['success'=>true]));

?>