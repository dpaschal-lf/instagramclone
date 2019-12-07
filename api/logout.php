<?php

require_once('functions.php');
set_exception_handler('handleExceptions');
require_once('mysql_connect.php');

$postData = getBodyData();
$headers = apache_request_headers();
if(empty($headers['auth-token'])){
    throw new Exception('must supply a token');
}

$query = "DELETE FROM `sessions` WHERE `token` = ?";

$result = prepare_statement( $query , [$headers['auth-token']]);

if(!$result){
    throw new Exception('error with session query');
}

if( $db->affected_rows === 0){
    throw new Exception('invalid token');
}

print(json_encode([
    'success'=>true
]));

?>