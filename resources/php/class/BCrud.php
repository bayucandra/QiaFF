<?php
class BCrud{
    private $db_link;
    function __construct($p_db_link) {
	$this->db_link = $p_db_link;
    }
    public function read_advance(
	    $p_arr=array(
		"table"=>"", 
		"fields"=>array(), 
		"where"=>array( array( "field"=>"", "value"=>"", "operand"=>"", "type"=>"string" )), //type=>string/numeric
		"order"=>array("field"=>"","short"=>"")
	    )
    ){
	$select_fields="";
	foreach($p_arr["fields"] AS $field){
	    $select_fields.="`$field`,";
	}
	$select_fields_fix= substr($select_fields, 0, strlen($select_fields)-1);
	//BEGIN WHERE===================
	$where="";
	if(count($p_arr["where"]>0)){
	    $inc_where=0;
	    foreach($p_arr["where"] AS $where_arr){
		$value=$where_arr["type"]==="string"?"'{$where_arr['value']}'":$where_arr['value'];
		if($inc_where===0){
		    $where.=" WHERE `{$where_arr['field']}`=$value";
		}else{
		    $where.=" {$where_arr['operand']} `{$where_arr['field']}`=$value";
		}
		$inc_where++;
	    }
	}
	//END WHERE*************
	//BEGIN ORDER===========
	
	//END ORDER***********
	
	$qry_str="SELECT $select_fields_fix FROM {$p_arr['table']}$where";
	echo $qry_str;
    }
    public function create($p_qry){
	$ret_arr=array("success"=>true, "error_msg"=>"");
	try{
	    $res_ins=$this->db_link->exec($p_qry);
	    if($res_ins!=1){
		$ret_arr["success"]=false;
		$error_info=$this->db_link->errorInfo();
		$ret_arr["error_msg"].= "Error when insert to privilege_user_revoke table:".$error_info[2];
	    }
	}catch(PDOException $e){
	    $ret_arr["success"]=false;
	    $ret_arr["error_msg"].= $e->getMessage();
	}
	return $ret_arr;
    }
    public function read($p_qry, $p_qry_count=""){
	$ret_arr=array("success"=>true,"error_msg"=>"","data"=>array(), "totalCount"=>0);
	try{
	    if(!empty($p_qry_count)){
		$res_count=$this->db_link->query($p_qry_count);
		if($res_count!==false){
		    $fa_count=$res_count->fetch(PDO::FETCH_NUM);
		    $ret_arr["totalCount"]=$fa_count[0];
		}else{
		    $ret_arr["success"]=false;
		    $error_info=$this->db_link->errorInfo();
		    $ret_arr["error_msg"].=$error_info[2];
		}
	    }
	    if($ret_arr["success"]!==false){
		$res=$this->db_link->query($p_qry);
		if($res!==false){
		    $ret_arr["success"]=true;
		    $ret_arr["data"]=$res->fetchAll(PDO::FETCH_ASSOC);
		}else{
		    $ret_arr["success"]=false;
		    $error_info=$this->db_link->errorInfo();
		    $ret_arr["error_msg"].=$error_info[2];
		}
	    }
	}catch(PDOException $e){
	    $ret_arr["success"]=false;
	    $ret_arr["error_msg"].=$e->getMessage();
	}
	return $ret_arr;
    }
    public function update($p_qry){
	$ret_arr=array("success"=>true,"error_msg"=>"");
	try{
	    $res=$this->db_link->exec($p_qry);
	    if($res===false){
		$ret_arr["success"]=false;
		$error_info=$this->db_link->errorInfo();
		$ret_arr["error_msg"].=$error_info[2];
	    }
	}catch(PDOException $e){
	    $ret_arr["success"]=false;
	    $ret_arr["error_msg"].="Exception: ".$e->getMessage();
	}
	return $ret_arr;
    }
    public function destroy($p_qry){
	$ret_arr=array("success"=>true,"error_msg"=>"");
	try{
	    $res=$this->db_link->exec($p_qry);
	    if($res===false){
		$ret_arr["success"]=false;
		$error_info=$this->db_link->errorInfo();
		$ret_arr["error_msg"].=$error_info[2];
	    }
	}catch(PDOException $e){
	    $ret_arr["success"]=false;
	    $ret_arr["error_msg"].=$e->getMessage();
	}
	return $ret_arr;
    }
    
    
}

?>