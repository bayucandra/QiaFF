<?php
$db_config=unserialize(BFURN_MYSQL_CONFIG);
$db_dsn="mysql:host=".$db_config['host'].";dbname=".$db_config['dbname'];
$bfurn_db;
try{
    $bfurn_db = new PDO($db_dsn,$db_config['username'],$db_config['password']);
    $bfurn_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
    die("{success:false, error_msg:\"Connection failed: ".$e->getMessage()."\"}");
}