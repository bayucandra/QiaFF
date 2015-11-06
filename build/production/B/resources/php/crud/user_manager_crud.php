<?php
    require_once('../config.php');
    bsession_life(ROOT_PATH_SYSTEM);
    require_once('../db.php');
    require_once('../class/BLogin.php');
    require_once('../class/BCrud.php');
    $OBLogin=new BLogin($bfurn_db);
    $OBLogin->login_protect();
    
    $OBCrud=new BCrud($bfurn_db);
    switch($_REQUEST["section"]){
	case "user":
	    switch($_REQUEST["crud"]){
		case "create":
		    $username=strtolower($_REQUEST["username"]);
		    $password=$_REQUEST["password"];
		    $iduser_group=$_REQUEST["iduser_group"];
		    $fullname=$_REQUEST["fullname"];
		    $email=!empty($_REQUEST["email"])?$_REQUEST["email"]:$username.'@'.$_SERVER["HTTP_HOST"];
		    $qry_ins="INSERT INTO `user`(`username`,`password`,iduser_group,email,fullname)
			VALUES({$bfurn_db->quote($username)},{$bfurn_db->quote( get_enc_password($password, ENC_PASSWORD))},$iduser_group,
			    {$bfurn_db->quote($email)},{$bfurn_db->quote($fullname)})";
		    echo json_encode($OBCrud->create($qry_ins));
		    break;
		case "read":
		    $qry_sel="SELECT u.iduser,u.username, ug.`name` AS groupname, u.iduser_group, u.fullname, u.email
			FROM `user` u
			LEFT JOIN `user_group` ug
				ON(u.iduser_group = ug.iduser_group)";
		    echo json_encode( $OBCrud->read($qry_sel) );
		    break;
		case "update":
		    $json_request = file_get_contents('php://input');
		    $json = json_decode($json_request);
		    $set_qry="SET";
		    if(isset($json->username)){
			$set_qry.=" `username`='{$json->username}'";
		    }
		    if(isset($json->groupname)){
			if($set_qry!=="SET"){
			    $set_qry.=",";
			}
			$set_qry.=" `iduser_group`=(SELECT iduser_group FROM user_group WHERE `name`='{$json->groupname}')";
		    }
		    $qry_upd="UPDATE `user` $set_qry
			WHERE `iduser`='{$json->iduser}' LIMIT 1";
		    echo json_encode( $OBCrud->update($qry_upd) );
		    break;
		case "destroy":
		    break;
	    }
	    break;
	case "group_priv":
	    switch($_REQUEST["crud"]){
		case "create":
		    break;
		case "read":
		    if(isset($_REQUEST["iduser"])){
			$iduser=$_REQUEST["iduser"];
			$qry_sel="SELECT u.username,IFNULL(pg.privilege,'N/A') AS privilege
			    FROM `user` u
				LEFT JOIN (user_group ug
				    LEFT JOIN privilege_group pg
					ON(ug.iduser_group=pg.iduser_group)
				)ON(u.iduser_group=ug.iduser_group)
					LEFT JOIN privilege_user_revoke pur
						ON(u.iduser=pur.iduser AND pg.privilege=pur.privilege)
			    WHERE u.iduser=$iduser AND ISNULL(pur.privilege)";
			echo json_encode( $OBCrud->read($qry_sel) );
		    }
		    break;
		case "update":
		    break;
		case "destroy":
		    break;
	    }
	    break;
	case "group_priv_rev":
	    switch($_REQUEST["crud"]){
		case "create":
		    if(isset($_REQUEST["iduser"]) && isset($_REQUEST["privilege"])){
			$qry_ins="INSERT INTO privilege_user_revoke(`iduser`,`privilege`)
				VALUES({$_REQUEST['iduser']},'{$_REQUEST['privilege']}')";
			echo json_encode( $OBCrud->create($qry_ins) );
		    }
		    break;
		case "read":
		    if(isset($_REQUEST["iduser"])){
			$iduser=$_REQUEST["iduser"];
			$qry_sel="SELECT pur.privilege AS privilege_revoke
			    FROM privilege_user_revoke pur
			    WHERE pur.iduser=$iduser";
			echo json_encode( $OBCrud->read($qry_sel) );
		    }
		    break;
		case "update":
		    break;
		case "destroy":
		    if(isset($_REQUEST["iduser"]) && isset($_REQUEST["privilege"])){
			$qry_del="DELETE FROM privilege_user_revoke
			    WHERE iduser={$_REQUEST['iduser']} AND `privilege`='{$_REQUEST['privilege']}'
			    LIMIT 1";
			echo json_encode($OBCrud->destroy($qry_del));
		    }
		    break;
	    }
	    break;
	case "user_priv":
	    switch($_REQUEST["crud"]){
		case "read":
		    if(isset($_REQUEST["iduser"])){
			$qry_sel="SELECT privilege AS privilege_user
			    FROM privilege_user
			    WHERE iduser={$_REQUEST['iduser']}";
			echo json_encode($OBCrud->read($qry_sel));
		    }
		    break;
	    }
	    break;
	case "user_group":
	    switch($_REQUEST["crud"]){
		case "read":
		    $qry_sel="SELECT * FROM user_group";
		    echo json_encode($OBCrud->read($qry_sel));
		    break;
	    }
	    break;
    }
    switch($_REQUEST["crud"]){
	case "user_update":
	    break;
	case "group_priv_read":
	    break;
	case "group_priv_rev_create":
	    break;
	case "group_priv_rev_read":
	    break;
	case "group_priv_rev_destroy":
	    break;
	case "user_priv_read":
	    break;
	case "user_group_read":
	    break;
    }
?>