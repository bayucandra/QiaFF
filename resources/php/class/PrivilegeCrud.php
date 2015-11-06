<?php
class PrivilegeCrud{
    private $db_link;
    function __construct($p_db_link) {
	$this->db_link = $p_db_link;
    }
    public function read(){
	$ret_arr=array("success"=>true,"error_msg"=>"","data"=>array(), "totalCount"=>0);
	$iduser=$_SESSION[SESSION_NAME]["iduser"];
	//BEGIN CHECK IF USER ROOT=================
	$is_root=false;
	try{
	    $qry_check_root="SELECT iduser_group FROM `user` WHERE iduser=$iduser LIMIT 1";
	    $res_check_root=$this->db_link->query($qry_check_root);
	    $fa_check_root=$res_check_root->fetch(PDO::FETCH_ASSOC);
	    if($fa_check_root["iduser_group"]==0){
		$is_root=true;
	    }
	}catch(PDOException $e){
	    $ret_arr["success"]=false;
	    $ret_arr["error_msg"]=$e->getMessage();
	}
	//END CHECK IF USER ROOT******************
	if($is_root){//IF ROOT===============================>>>>>>>>>>>>>>>>
	    try{
		$qry_sel_privilege="SELECT `privilege` FROM `privilege`";
		$res_sel_privilege=$this->db_link->query($qry_sel_privilege);
		$ret_arr["data"]=$res_sel_privilege->fetchAll(PDO::FETCH_ASSOC);
	    }catch(PDOException $e){
		$ret_arr["success"]=false;
		$ret_arr["error_msg"]=$e->getMessage();
	    }
	}else{
	    
	}
	return $ret_arr;
    }
}
