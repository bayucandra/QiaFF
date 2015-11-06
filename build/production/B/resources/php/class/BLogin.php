<?php
class BLogin{
    private $db_link;
    function __construct($p_db_link){
	$this->db_link = $p_db_link;
    }
    public function user_login($p_username, $p_password){
	$json_result=array("success"=>true, "iduser"=>-1, "username"=>"N/A", "fullname"=>"", "error_msg"=>"");
	if(empty($p_username)||empty($p_password)){
	    $json_result["error_msg"].="Error, please fill username and password.";
	    $json_result["success"]=false;
	}
	if($json_result["success"]){
	    $qry_count_str=
		"SELECT COUNT(`iduser`)
		FROM `".DB_PX."user`
		WHERE (`username` = ".$this->db_link->quote($p_username)." OR `email`=".$this->db_link->quote($p_username).")
		    AND `password`=".$this->db_link->quote( get_enc_password($p_password, ENC_PASSWORD) );
	    $qry_sel_str=
		"SELECT *
		FROM `".DB_PX."user`
		WHERE (`username` = ".$this->db_link->quote($p_username)." OR `email`=".$this->db_link->quote($p_username).")
		    AND `password`=".$this->db_link->quote( get_enc_password($p_password, ENC_PASSWORD) );
	    $res_count=$this->db_link->query($qry_count_str);
	    if($res_count!=false){
		$fa_count=  $res_count->fetch(PDO::FETCH_NUM);
		if($fa_count[0]==1){
		    $res_sel=  $this->db_link->query($qry_sel_str);
		    if($res_sel!=false){
			$fa_sel=$res_sel->fetch(PDO::FETCH_ASSOC);
			$json_result["success"]=true;
			$json_result["iduser"]=$fa_sel["iduser"];
			$json_result["username"]=$fa_sel["username"];
			$json_result["fullname"]=$fa_sel["fullname"];
			bsession_life(ROOT_PATH_SYSTEM);
			$_SESSION[SESSION_NAME]["iduser"] = $fa_sel["iduser"];
			$_SESSION[SESSION_NAME]["username"] = $fa_sel["username"];
			$_SESSION[SESSION_NAME]["fullname"] = $fa_sel["fullname"];
		    }else{
			$json_result["success"]=false;
			$tmp_error = $res_sel->errorInfo();
			$json_result["error_msg"]="Error:".$tmp_error[2];
		    }
		}else{
		    $json_result["success"]=false;
		    $json_result["error_msg"]="Username/password is invalid. Please try again.";
		}
	    }else{
		$json_result["success"]=false;
		$tmp_error = $res_count->errorInfo();
		$json_result["error_msg"]="Error:".$tmp_error[2];
	    }
	}
	return json_encode($json_result);
    }
    public function login_protect(){
	if(!isset($_SESSION[SESSION_NAME]["iduser"])){
	    die("Please login first");
	}
    }
}
?>