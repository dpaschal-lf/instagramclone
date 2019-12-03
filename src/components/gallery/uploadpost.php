<?php

require_once('functions.php');
set_exception_handler('handleExceptions');
require_once('mysql_connect.php');

if(empty($_FILES)){
    throw new Exception('no data uploaded');
}
$acceptableFileExtensions = ['jpg','jpeg','gif','png'];
$filePathInfo = pathinfo($fileToUpload['name']);
if(!in_array($filePathInfo['extension'], $acceptableFileExtensions)){
    throw new Exception("{$fileToUpload['name']} is an invalid file type.  Can only accept jpg/jpeg, gif, and png");
}

if(empty($_GET['postID'])){
    throw new Exception('must supply an id');
}
$internalPostID = getIdFromExternalID( 'posts', $_GET['postID'] );

$data = getCommentsForPost( $internalPostID );
print(json_encode($data));

?>