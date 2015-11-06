<?php

    require_once('../config.php');
    bsession_life(ROOT_PATH_SYSTEM);
    require_once('../db.php');
    require_once('../class/BLogin.php');
    require_once('../class/PrivilegeCrud.php');
    
    $OBLogin=new BLogin($bfurn_db);
    $OBLogin->login_protect();
    
    $OPrivilegeCrud=new PrivilegeCrud($bfurn_db);
    switch($_REQUEST["crud"]){
	case "read":
	    echo json_encode($OPrivilegeCrud->read());
	    break;
    }

