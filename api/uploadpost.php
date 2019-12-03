<?php

require_once('functions.php');
set_exception_handler('handleExceptions');

if(empty($_FILES)){
    throw new Exception('no data uploaded');
}
$acceptableFileExtensions = ['jpg','jpeg','gif','png'];
$filePathInfo = pathinfo($_FILES['uploadFile']['name']);
if(!in_array($filePathInfo['extension'], $acceptableFileExtensions)){
    throw new Exception("{$_FILES['uploadFile']['name']} is an invalid file type.  Can only accept jpg/jpeg, gif, and png");
}
print("from: ". $_FILES['uploadFile']['tmp_name']);
$filePath = "images/{$userExternalID}/{$_FILES['uploadFile']['tmp_name']}.{$filePathInfo['extension']}";
if(move_uploaded_file($_FILES['uploadFile']['tmp_name'], $filePath )){
    $uploadFiles[] = $_FILES['uploadFile']['name'];
} else {
    throw new Exception('failed to save '.$_FILES['uploadFile']['name']);
}
require_once('mysql_connect.php');

$internalUserID = getIdFromExternalID( 'users', $userExternalID );

$query = "INSERT INTO `posts` SET `externalID`= ?, `userID` = ?, `caption` = ?, `likes` = 0, `added` = NOW(), `updated` = NOW(), `commentCount` = 0, `status` = 'active', `extension` = ?";

$result = prepare_statement($query, [
    $_FILES['uploadFile']['tmp_name'],
    $internalUserID,
    'caption',
    $filePathInfo['extension']
]);

if(!$result){
    throw new Exception('error updating post entry ' . $db->error );
}
if($result->affected_row===0){
    throw new Exception('error uploading data to db');
}

?>