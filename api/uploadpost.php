<?php

require_once('functions.php');
set_exception_handler('handleExceptions');

if($userData = validateUser()){
    throw new Exception('must be logged in');
}
$userExternalID = $userData['externalID'];

if(empty($_FILES)){
    throw new Exception('file data empty');
}
$acceptableFileExtensions = ['jpg','jpeg','gif','png'];
$filePathInfo = pathinfo($_FILES['uploadFile']['name']);
if(!in_array($filePathInfo['extension'], $acceptableFileExtensions)){
    throw new Exception("{$_FILES['uploadFile']['name']} is an invalid file type.  Can only accept jpg/jpeg, gif, and png");
}
$newFileName = generateRandomString(20);
$filePath = "../public/images/{$userExternalID}/{$newFileName}.{$filePathInfo['extension']}";
if(move_uploaded_file($_FILES['uploadFile']['tmp_name'], $filePath )){
    $uploadFiles[] = $_FILES['uploadFile']['name'];
} else {
    throw new Exception('failed to save '.$_FILES['uploadFile']['name']);
}
require_once('mysql_connect.php');

$internalUserID = $userData['id'];

$query = "INSERT INTO `posts` SET 
    `externalID`= ?, 
    `userID` = ?, 
    `caption` = ?, 
    `likes` = 0, 
    `added` = NOW(), 
    `updated` = NOW(), 
    `commentCount` = 0, 
    `status` = 
    'active', 
    `originalName` = ?,
    `extension` = ?";

$result = prepare_statement($query, [
    $newFileName,
    $internalUserID,
    'caption',
    $_FILES['uploadFile']['name'],
    $filePathInfo['extension']
]);

if($result->error){
    throw new Exception('error updating post entry ' . $db->error );
}
if($db->affected_rows===0){
    throw new Exception('error uploading data to db');
}
print( json_encode( ['success'=>true]));
?>