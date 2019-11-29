<?php

$db = mysqli_connect('127.0.0.1', 'root','root','instagram');

if(!$db){
    print("database connection error");
    exit();
}

?>