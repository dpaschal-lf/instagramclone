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
$externalID = generateRandomString(20);

if(!$db->query('START TRANSACTION')){
    throw new Exception('problem with transaction start');
}

$query = "INSERT INTO `comments` SET
        `userID` = ?,
        `postID` = ?,
        `added` = NOW(),
        `message` = ?,
        `externalID` = ?,
        `status` = 'visible',
        `edited` = NULL
    ";
$result = prepare_statement($query, [
    $internalUserID,
    $internalPostID,
    $postData['commentMessage'],
    $externalID
]);

if(!$result || $db->affected_rows===0){
    throw new Exception('error with query ' . $db->error);
}

$query = "UPDATE `posts` SET `commentCount` = (`commentCount` + 1) WHERE `id`= $internalPostID";
print($query);
$result = $db->query($query);

if(!$result){
    throw new Exception('error with post query');
}
var_dump(mysqli_error($db));
if($db->affected_rows!==1){
    throw new Exception('error with post Update query'.$db->error);
}

if(!$db->query('COMMIT')){
    throw new Exception('problem with transaction start');
}

print( json_encode( ['success'=>true]));

?>