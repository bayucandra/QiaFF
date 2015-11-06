<?php
    require_once('config.php');
    bsession_life(ROOT_PATH_SYSTEM);
    require_once('db.php');
    require_once('class/BLogin.php');
    require_once('class/BCrud.php');
    $OBLogin=new BLogin($bfurn_db);
    $OBLogin->login_protect();
    
    $OBCrud=new BCrud($bfurn_db);
    $OBCrud->read(
	    array(
		"table"=>"config", 
		"fields"=>array("description","value"), 
		"where"=>array(array("field"=>"key","value"=>"currency","operand"=>"","type"=>"string")), 
		"order"=>array("field"=>"description","short"=>"ASC")
	    )
	);
    
?>
