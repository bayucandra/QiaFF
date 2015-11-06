<?php
    require_once('../config.php');
    bsession_life(ROOT_PATH_SYSTEM);
    require_once('../db.php');
    require_once('../class/BLogin.php');
    require_once('../class/BCrud.php');
    $OBLogin=new BLogin($bfurn_db);
    $OBLogin->login_protect();
    
    $OBCrud=new BCrud($bfurn_db);
    switch($_REQUEST["crud"]){
	case "read":
	    echo json_encode( $OBCrud->read("SELECT * FROM config", "SELECT COUNT(`key`) FROM config") );
	    break;
	case "update":
	    $json_request = file_get_contents('php://input');
	    $json = json_decode($json_request);
	    echo json_encode( $OBCrud->update("UPDATE `config` SET `value`='{$json->value}' WHERE `key`='{$json->key}' LIMIT 1") );
	    break;
    }
?>