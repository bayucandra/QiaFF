<?php
    require_once('config.php');
    bsession_life(SESSION_PATH);
    require_once('db.php');
    require_once('class/BLogin.php');
    $OBLogin=new BLogin($bfurn_db);
    if(isset($_REQUEST["login"])){
	echo $OBLogin->user_login($_REQUEST["username"],$_REQUEST["password"]);
    }
?>
