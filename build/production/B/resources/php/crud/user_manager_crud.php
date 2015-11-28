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
	case "db_privilege":
	    switch($_REQUEST["crud"]){
		case "read":
		    $qry_sel="SELECT * FROM `privilege`";
		    echo json_encode($OBCrud->read($qry_sel));
		    break;
	    }
	    break;
	case "user":
	    switch($_REQUEST["crud"]){
		case "create":
		    $username=$bfurn_db->quote( strtolower($_REQUEST["username"]) );
		    $password=$bfurn_db->quote( 
			    get_enc_password($_REQUEST["password"], ENC_PASSWORD)
			);
		    $iduser_group=$_REQUEST["iduser_group"];
		    $fullname=$bfurn_db->quote($_REQUEST["fullname"]);
		    $email=$bfurn_db->quote(
			    !empty($_REQUEST["email"])?$_REQUEST["email"]:strtolower($_REQUEST["username"]).'@'.$_SERVER["HTTP_HOST"]
			);
		    $qry_ins="INSERT INTO `user`(`username`,`password`,iduser_group,email,fullname)
			VALUES($username,$password,$iduser_group,$email,$fullname)";
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
		    $iduser=$_REQUEST["iduser"]; $username=$bfurn_db->quote(strtolower($_REQUEST["username"]));
		    $password=empty($_REQUEST["password"])?
			'':
			$bfurn_db->quote( 
				get_enc_password( $_REQUEST["password"], ENC_PASSWORD) 
			);
		    $iduser_group_old=$_REQUEST["iduser_group_old"];
		    $iduser_group=$_REQUEST["iduser_group"];
		    $fullname=$bfurn_db->quote($_REQUEST["fullname"]);
		    $email=$bfurn_db->quote(
			    !empty($_REQUEST["email"])?$_REQUEST["email"]:strtolower($_REQUEST["username"]).'@'.$_SERVER["HTTP_HOST"]
			);
		    //BEGIN DELETE privilege_user_revoke FIRST===================================
		    if($iduser_group_old!=$iduser_group){
			$qry_del="DELETE FROM privilege_user_revoke WHERE iduser=$iduser";
			$ret_del=$OBCrud->destroy($qry_del);
			if(!$ret_del["success"]){
			    echo json_encode($ret_del);
			    break;
			}
		    }
		    //END DELETE privilege_user_revoke FIRST*****************************
		    $set_qry="SET `username`=$username, `iduser_group`=$iduser_group, `fullname`=$fullname, email=$email";
		    if(!empty($password)){
			$set_qry.=", `password`=$password";
		    }
		    $qry_upd="UPDATE `user` $set_qry
			WHERE `iduser`=$iduser LIMIT 1";
		    echo json_encode( $OBCrud->update($qry_upd) );
		    break;
		case "destroy":
		    $iduser=$_REQUEST["iduser"];
		    $ret_arr=array("success"=>true,"error_msg"=>"");
		    if(!empty($iduser)){
			//BEGIN DELETING privilege_user============
			$qry_del_pu="DELETE FROM privilege_user WHERE iduser=$iduser";
			$res_del_pu=$OBCrud->destroy($qry_del_pu);
			if($res_del_pu["success"]===true){
			    $qry_del_pur="DELETE FROM privilege_user_revoke WHERE iduser=$iduser";
			    $res_del_pur=$OBCrud->destroy($qry_del_pur);
			    if($res_del_pur["success"]===true){
				$qry_del_u="DELETE FROM `user` WHERE iduser=$iduser";
				$res_del_u=$OBCrud->destroy($qry_del_u);
				if($res_del_u["success"]!==true){
				    $ret_arr["success"]=false; $ret_arr["error_msg"].=$res_del_u["error_msg"];
				}
			    }else{
				$ret_arr["success"]=false; $ret_arr["error_msg"].=$res_del_pur["error_msg"];
			    }
			}else{
			    $ret_arr["success"]=false; $ret_arr["error_msg"].=$res_del_pu["error_msg"];
			}
		    }
		    echo json_encode($ret_arr);
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
		case "create":
		    if( isset($_REQUEST["iduser"]) && isset($_REQUEST["privilege"]) ){
			$iduser=$_REQUEST["iduser"];
			$privilege=$_REQUEST["privilege"];
			$qry_ins="INSERT INTO privilege_user(`iduser`,`privilege`) VALUES ($iduser, '$privilege')";
			echo json_encode($OBCrud->create($qry_ins));
		    }
		    break;
		case "read":
		    if(isset($_REQUEST["iduser"])){
			$qry_sel="SELECT iduser, privilege AS privilege_user
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