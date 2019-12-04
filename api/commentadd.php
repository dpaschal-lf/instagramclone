<?php

require_once('functions.php');
set_exception_handler('handleExceptions');
require_once('mysql_connect.php');

$postData = getBodyData();

if(empty($postData['postID'])){
    throw new Exception('must supply a post id');
}
if(empty($postData['commentMessage'])){
    throw new Exception('must supply comment content');
}
$internalPostID = getIdFromExternalID( 'posts', $postData['postID'] );
$internalUserID = getIdFromExternalID( 'users', $userExternalID);

$query = "INSERT INTO `comments` SET
        `userID` = ?,
        `postID` = ?,
        `added` = NOW(),
        `message` = ?,
        `status` = 'visible',
        `edited` = NULL
    ";
$result = prepare_statement($query, [
    $internalUserID,
    $internalPostID,
    $postData['commentMessage']
]);

if(!$result || $db->affected_rows===0){
    throw new Exception('error with query ' . $db->error);
}

print( json_encode( ['success'=>true]));

?>