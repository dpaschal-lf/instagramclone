<?php

if(!function_exists('handleExceptions')){
    function handleExceptions( $error ){
        http_response_code(500);
        print( json_encode( ['error'=> $error->getMessage()] ));
    }
}
if(!function_exists('prepare_statement')){
    function prepare_statement($query, $params){
        global $db;
        if(strlen($query)===0){
            return false;
        }
        if(!is_array($params)){
            return false;
        }
        if(!is_object($db)){
            return false;
        } 
        $statement = $db->prepare($query);
        if(!$statement){
            throw new Exception('error with prepared statement: '.$query. ' : '.$db->error);
        }
        $paramTypes = '';
        foreach($params AS $value){
            if(is_string($value)){
                $paramTypes .= 's';
            } else if(is_integer($value)){
                $paramTypes .= 'i';
            } else if(is_double($value)){
                $paramTypes .= 'd';
            } else {
                $paramTypes .= 'b';
            }
        }
        array_unshift($params, $paramTypes );
        //warning: wanted 2nd param to be a reference var, but complained when I made it a reference var.  Shut up, warning.  TODO: why?
        @call_user_func_array([$statement, 'bind_param'], $params);
        $statementResult = $statement->execute();
        if(substr($query, 0, 6) === 'SELECT'){
            return $statement->get_result(); 
        }
    
        return $statement;
    }
}

if(!function_exists('getCommentsForPost')){
    function getCommentsForPost($postID){
        global $db;
        if(empty($postID)){
            throw new Exception('post ID must be supplied');
        }
        $postID = intval($postID);
        $query = "SELECT c.`id`, c.`added`, c.`message`, c.`edited`,
            u.`avatar`, u.`externalID`, u.`displayName`
            FROM `comments` AS c
            JOIN `users` AS u
                ON u.`id` = c.`userID`
            WHERE c.`id` = $postID
        ";
        $result = $db->query($query);
        if(!$result){
            throw new Exception('comment query failed ' . $db->error);
        }
        $data = [];
        while($row = $result->fetch_assoc()){
            $data[] = $row;
        }
        return $data;
    }
}

?>