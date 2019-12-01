<?php

require_once('functions.php');
set_exception_handler('handleExceptions');
require_once('mysql_connect.php');

if(empty($_GET['postID'])){
    throw new Exception('must supply an id');
}
$internalPostID = getIdFromExternalID( 'posts', $_GET['postID'] );

$data = getCommentsForPost( $internalPostID );
print(json_encode($data));

?>