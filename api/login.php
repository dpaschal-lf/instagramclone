<?php

require_once('functions.php');
set_exception_handler('handleExceptions');
require_once('mysql_connect.php');

$postData = getBodyData();

if(empty($postData['email'])){
    throw new Exception('must supply a email');
}
if(empty($postData['password'])){
    throw new Exception('must supply a password');
}
$query = "SELECT `id`, `externalID`, `password` FROM `users` WHERE `email`=?";

$result = prepare_statement( $query );

if(!$result){
    throw new Exception('error with user query');
}

if( $result->num_rows === 0){
    throw new Exception('invalid email or password');
}
$userData = $result->fetch_assoc();

if( password_verify( $postData['password'], $userData['password'])){
    
}

$data = getCommentsForPost( $internalPostID );
print(json_encode($data));

?>