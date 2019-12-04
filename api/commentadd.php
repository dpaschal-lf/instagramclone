<?php

require_once('functions.php');
set_exception_handler('handleExceptions');
require_once('mysql_connect.php');

if(empty($_GET['postID'])){
    throw new Exception('must supply a post id');
}
if(empty($_GET['commentMessage'])){
    throw new Exception('must supply comment content');
}
$internalPostID = getIdFromExternalID( 'posts', $_GET['postID'] );
$internalUserID = getIdFromExternalID( 'users', $userExternalID);

$query = "INSERT INTO `comments` SET
        `userID` = ?,
        `postID` = ?,
        `added` = NOW(),
        `message` = ?,
        `status` = 'visible'
        `edited` = NULL
    ";
$result = prepare_statement($query, [
    $internalUserID,
    $internalPostID,
    $_GET['commentMessage']
]);

if(!$result || $db->affected_rows===0){
    throw new Exception('error with query ' . $db->error);
}

print( json_encode( ['success'=>true]));

?>