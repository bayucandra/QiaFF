<?php
//	session_start();
	require_once('config.php');
	bsession_life(ROOT_PATH_SYSTEM);
	$session="";
	if(isset($_SESSION[SESSION_NAME])){
	    $session=$_SESSION[SESSION_NAME];
	}
	$act=$_REQUEST["act"];
	switch($act){
	    case "get":
		echo json_encode($session);
		break;
	    case "destroy":
		$_SESSION=array();
		session_destroy();
		break;
	}
?>
