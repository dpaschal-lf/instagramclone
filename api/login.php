<?php

require_once('functions.php');
set_exception_handler('handleExceptions');
require_once('mysql_connect.php');

$postData = getBodyData();

if(empty($postData['user'])){
    throw new Exception('must supply a user');
}
if(empty($postData['password'])){
    throw new Exception('must supply a password');
}
$internalPostID = getIdFromExternalID( 'posts', $_GET['postID'] );

$data = getCommentsForPost( $internalPostID );
print(json_encode($data));

?>