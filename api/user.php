<?php

require_once('functions.php');
set_exception_handler('handleExceptions');
require_once('mysql_connect.php');

if(empty($_GET['id'])){
    throw new Exception('must provide id');
}

$query = "SELECT `avatar`, `displayName` FROM `users` WHERE ?";

$result = prepare_statement($query, [$_GET['id']]);

if(!$result){
    throw new Exception('invalid user query '. $db->error);
}
if($result->num_rows===0){
    throw new Exception('invalid id ' . $_GET['id']);
}

print( json_encode( $result->fetch_assoc() ));

?>