<?php
	function bjson_tree($p_arr_records,$p_str_id_field,$parent=0){
	    $branch=array();
	    foreach($p_arr_records AS $record){
		if($record['parent']==$parent){
		    $children=bjson_tree($p_arr_records,$p_str_id_field,$record[$p_str_id_field]);
		    if($children){
			$record["expanded"]=true;
			$record["children"]=$children;
		    }else{
			$record["leaf"]=true;
		    }
		    $branch[]=$record;
		}
	    }
	    return $branch;
	}
	function get_enc_password($p_input_password,$p_enc_password){
		switch($p_enc_password){
			case "md5":
				return md5($p_input_password);
				break;
			case "plain":
				return $p_input_password;
				break;
			case "sha1":
				return sha1($p_input_password);
				break;
			default:
				return false;
		}
	}
	function b_db_is_transactional(){
	    $db_config= unserialize(BFURN_MYSQL_CONFIG);
	    $is_transactional = $db_config["transactional"]?true:false;
	    return $is_transactional;
	}
	function urlGetReinsert($p_url_str,$p_str_get_var_name,$p_str_get_var_val){
		$url_reinserted="";
		$arr_each_get=explode('&',$p_url_str);
		//BEGIN VALIDATING====================
		if(count($arr_each_get)<1)return "";
		//END VALIDATING******************
		foreach($arr_each_get as $each_get){
			$arr_each_get_pair=explode("=",$each_get);
			if($arr_each_get_pair[0]!=$p_str_get_var_name){//IF NOT THE KEY NEED TO REINSERT
				$url_reinserted.=$each_get.'&';
			}
		}
		$url_reinserted.=$p_str_get_var_name.'='.$p_str_get_var_val;
		return $url_reinserted;/*
		for(var i=0;i<arr_each_get.length;i++){
			var arr_each_get_pair=explode("=",arr_each_get[i]);
			if(arr_each_get_pair[0]!=p_str_get_var_name){//IF NOT THE KEY NEED TO REINSERT
				url_reinserted=url_reinserted+arr_each_get[i]+'&';
			}
		}
		url_reinserted=url_reinserted+p_str_get_var_name+'='+p_str_get_var_val;
		return url_reinserted;*/
	}
	function getUrlReconstruct($p_arr_url_get){
		$get_url="";
		if(!isset($p_arr_url_get))
			return $get_url;
		foreach($p_arr_url_get AS $key=>$item){
			$get_url.=$key.'='.$item.'&';
		}
		$get_url=substr($get_url,0,strlen($get_url)-1);
		return $get_url;
	}
	function getUrlRemoveSelected($p_arr_url_get,$p_var_name){
		$url_removed_selected="";
		$arr_each_get=explode('&',$p_arr_url_get);
	
		//BEGIN VALIDATING====================
		if(count($arr_each_get)<1)return "";
		//END VALIDATING******************
		foreach($arr_each_get as $each_get){
			$arr_each_get_pair=explode("=",$each_get);
			if($arr_each_get_pair[0]!=$p_var_name){//IF NOT THE KEY NEED TO REMOVE
				$url_removed_selected.=$each_get.'&';
			}
		}
		$url_removed_selected=substr($url_removed_selected,0,strlen($url_removed_selected)-1);
		return $url_removed_selected;
	}
	function is_email_valid($p_email){
		if(eregi("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$", $p_email)){
			return true;
		}else{
			return false;
		}
	}
	function b_set_time_zone($p_time_zone){
		$php_version=phpversion();
		$php_version_sufix=explode(".",$php_version);
		if($php_version_sufix[0]>4){
			date_default_timezone_set($p_time_zone);
		}
	}
	function log_insert($p_db,$p_log_str,$p_driver="old"){
		$log_str=mysql_real_escape_string($p_log_str);
		$current_date=new DateTime();
		$current_date_str=$current_date->format("Y-m-d H:i:s");
		
		$qry_str_log="INSERT INTO `logs`(`date`,`message`)VALUES('$current_date_str','$log_str')";
		if($p_driver=="old"){
		    $res_log=mysql_query($qry_str_log,$p_db);
		}elseif($p_driver=="PDO"){
		    $p_db->query($qry_str_log);
		}
	}
	function delTree($dir) {
		$files = array_diff(scandir($dir), array('.','..'));
		foreach ($files as $file) {
			(is_dir("$dir/$file")) ? delTree("$dir/$file") : unlink("$dir/$file");
		}
		return rmdir($dir);
	} 
	//BEGIN URL FUNCTIONS==================================
	function path_base_script(){
		$script_file_name=$_SERVER['SCRIPT_FILENAME'];
		$last_hash_pos=strrpos($script_file_name,'/');
		$path_base=substr($script_file_name,0,$last_hash_pos);
		return $path_base;
	}
	function url_base($p_no_com_protocol=false,$p_up_dir=0){
		$url_base=$_SERVER["HTTP_HOST"].url_dir_base();
		//BEGIN UP DIR=============
		if($p_up_dir!=0){
			$exp_url_base=explode('/',$url_base);
			$tmp_url_base="";
			if($p_up_dir<count($exp_url_base)){
				$num_url=count($exp_url_base)-$p_up_dir;
				for($i=0;$i<$num_url;$i++){
					$tmp_url_base.=$exp_url_base[$i];
					$tmp_url_base.="/";
				}
				$url_base=$tmp_url_base;
			}
		}
		//END UPDIR****************
		if(!$p_no_com_protocol)
			$url_base=COM_PROTOCOL.$url_base;
		return $url_base;
	}
	function url_dir_base($p_no_first_slash=false){
		$str_php_self=$_SERVER['PHP_SELF'];
		$str_self_trim=substr($str_php_self,1,strlen($str_php_self)-1);
		$exp_self_trim=explode("/",$str_self_trim);
		$dir_base="";
		$count_exp_self_trim=count($exp_self_trim);
		if($count_exp_self_trim>1){
			for($i=0;$i<$count_exp_self_trim-1;$i++){
				if(!(($i==0)&&$p_no_first_slash))$dir_base.='/';
				$dir_base.=$exp_self_trim[$i];
			}
		}
		return $dir_base;
	}
	function arr_request(){
		$str_request_uri=$_SERVER['REQUEST_URI'];
//		$str_request_uri_trim=substr($str_request_uri,1,strlen($str_request_uri)-1);
		$str_request_uri_trim=trim($str_request_uri,"/");
//		echo $str_request_uri.'-'.$str_request_uri_trim."<br/>";
		$exp_request_uri_trim=explode("/",$str_request_uri_trim);
		$count_request_uri_trim=count($exp_request_uri_trim);
		$arr_request=array();
		for($i=0;$i<$count_request_uri_trim;$i++){
			$request_val=$exp_request_uri_trim[$i];
			if(($i==0)&&($request_val==url_dir_base(true)))continue;
			if($i==$count_request_uri_trim-1)$request_val=preg_replace("/.html$/i","",$request_val);
			$arr_request[]=urldecode($request_val);
		}
		if(count($arr_request)===0){
		    $arr_request[]="";
		}
//		print_r($arr_request);
//		echo "<br/>";
		return $arr_request;
	}
	function url_current(){
	    $str_request_uri=$_SERVER['REQUEST_URI'];
	    $str_request_uri_fin=  str_replace(url_dir_base(), "", $str_request_uri);
	    return url_base().$str_request_uri_fin;
	}
	function check_lang_set($p_db){
	    $app_detail=unserialize(APP_DETAIL);
	    $lang=$app_detail["default_language"];
	    $last_request=last_request();
	    if(!empty($last_request)){
		$qry_check="SELECT COUNT(`idlanguage`) FROM `language` WHERE `country_id`='$last_request'";
		$res_check=mysql_query($qry_check,$p_db);
		if($res_check!==false){
		    $fa_check=mysql_fetch_array($res_check,MYSQL_NUM);
		    if($fa_check[0]==1){
			$lang=$last_request;
		    }
		}
	    }
	    return $lang;
	}
	function get_idlanguage($p_country_id,$p_db){
	    $idlanguage=-1;
	    $qry_get_idlanguage="SELECT idlanguage FROM language WHERE country_id='$p_country_id' LIMIT 1";
	    $res_get_idlanguage=mysql_query($qry_get_idlanguage,$p_db);
	    if($res_get_idlanguage!==false){
		$fa_get_idlanguage=  mysql_fetch_array($res_get_idlanguage,MYSQL_ASSOC);
		$idlanguage=$fa_get_idlanguage["idlanguage"];
	    }
	    return $idlanguage;
	}
	function set_lang_session($p_session_name,$p_db){
	    $country_id=check_lang_set($p_db);
	    $_SESSION[$p_session_name]["lang"]=$country_id;
	    $idlanguage=get_idlanguage($country_id,$p_db);
	    if($idlanguage!==-1){
		$_SESSION[$p_session_name]["idlanguage"]=$idlanguage;
	    }
	}
	function last_request(){
	    $request="";
	    $arr_request= arr_request();
	    if($arr_request!=array()){
		$request=$arr_request[count($arr_request)-1];
	    }
	    return $request;
	}
	function first_request(){//GET FIRST $_GET REQUEST
		$page="";
		$arr_request=arr_request();
		if(isset($arr_request[0])){
			$page=$arr_request[0];
		}
		return $page;
	}
	function url_request($last_request=false){//$last_request=> if only take one last request
		$str_request_uri=$_SERVER['REQUEST_URI'];
		$str_request_uri_trim=substr($str_request_uri,1,strlen($str_request_uri)-1);
		$exp_request_uri_trim=explode("/",$str_request_uri_trim);
		$count_request_uri_trim=count($exp_request_uri_trim);
		$url_request="";
		
		if($last_request){
			$url_request=$exp_request_uri_trim[$count_request_uri_trim-1];
		}else{
			for($i=0;$i<$count_request_uri_trim;$i++){
				$request_val=$exp_request_uri_trim[$i];
				if(($i==0)&&($request_val==url_dir_base(true)))continue;
				$url_request.=$request_val;
				if($i<$count_request_uri_trim-1)
					$url_request.="/";
			}
		}
		return urldecode($url_request);
	}
	function url_encode_path_reconstruct($p_url){
		$exp_url=explode("/",$p_url);
		$exp_url_len=count($exp_url);
		$url_encoded="";
		$inc=0;
		foreach($exp_url as $url){
			$url_encoded.=urlencode($url);
			if($inc<($exp_url_len-1)){
				$url_encoded.="/";
			}
			$inc++;
		}
		return $url_encoded;
	}
	function array_search_compat($p_key,$p_arr){
		$res=array_search($p_key,$p_arr);
		$is_not_found=(is_null($res))||($res===false);
		if($is_not_found)return false;
		else return true;
	}
	//END URL FUNCTIONS*************************
	function get_image_upload_error($p_error_no,$p_arr_exception_no=array()){//$p_arr_exception_no is array of exception number.
	//Return empty if no error
		if(empty($p_error_no))return "";
		
		$image_error="";
		switch($p_error_no){
			case '1':
				if(!array_search_compat($p_error_no,$p_arr_exception_no))
					$error_msg=$image_error = 'The uploaded file exceeds the upload_max_filesize directive in php.ini';
				break;
			case '2':
				if(!array_search_compat($p_error_no,$p_arr_exception_no))
					$image_error = 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form';
				break;
			case '3':
				if(!array_search_compat($p_error_no,$p_arr_exception_no))
					$image_error = 'The uploaded file was only partially uploaded';
				break;
			case '4':
				if(!array_search_compat($p_error_no,$p_arr_exception_no))
					$image_error = 'No file was uploaded.';
				break;

			case '6':
				if(!array_search_compat($p_error_no,$p_arr_exception_no))
					$image_error = 'Missing a temporary folder';
				break;
			case '7':
				if(!array_search_compat($p_error_no,$p_arr_exception_no))
					$image_error = 'Failed to write file to disk';
				break;
			case '8':
				if(!array_search_compat($p_error_no,$p_arr_exception_no))
					$image_error = 'File upload stopped by extension';
				break;
			case '999':
				if(!array_search_compat($p_error_no,$p_arr_exception_no))
					$image_error = "Unknown error of image";
				break;
			default:
				$image_error = "Unknown error image";
				break;
		}
		return $image_error;
	}
	function bmysql_insert_id($p_db_link){
		$qry_sel_ai="SELECT LAST_INSERT_ID() AS b_insert_id";
		$res_sel_ai=mysql_query($qry_sel_ai,$p_db_link);
		if(!$res_sel_ai){
			return false;
		}else{
			$fa_sel_ai=mysql_fetch_assoc($res_sel_ai);
			return $fa_sel_ai['b_insert_id'];
		}
	}
	function burl_to_db($p_str){
		return str_replace("-"," ",$p_str);
	}
	function bdb_to_url($p_str){
		return str_replace(" ","-",$p_str);
	}
	function burl_product_group($p_group_name){
		return url_base()."/".URL_DIRECTORY_PRODUCT."/".bdb_to_url($p_group_name).URL_PAGE_EXT;
	}

	function image_product_html($p_arr){
		$rand=mt_rand();
		$group_name=$p_arr["group_name"];
		$product_name=$p_arr["product_name"];
		$sz=$p_arr["sz"];
		return "<img src=\"".url_base()."/imagep.php?gname=$group_name&&pname=$product_name&&sz=$sz&&dmy=Bamboo furniture&&rand=$rand\" alt=\"Bamboo $group_name - $product_name\" />";
	}
//	function arr_product_img_dirs(){
//	    return array("orig"=>"orig", "disp"=>"disp" ,"thumb"=>"thumb","thumb_detail"=>"thumb_detail");
//	}
//	function arr_product_img_sizes(){
//	    return array("orig"=>-1, "disp"=>700 ,"thumb"=>300,"thumb_detail"=>100);
//	}
//	function arr_product_group_img_dirs(){
//	    return array("orig"=>"orig", "disp"=>"disp" ,"thumb"=>"thumb");
//	}
//	function arr_product_group_img_sizes(){
//	    return array("orig"=>-1, "disp"=>1200 ,"thumb"=>400);
//	}
    function rrmdir($dir) { 
	if (is_dir($dir)) { 
	    $objects = scandir($dir); 
	    foreach ($objects as $object) { 
		if ($object != "." && $object != "..") { 
		    if (filetype($dir."/".$object) == "dir") rrmdir($dir."/".$object); else unlink($dir."/".$object); 
		} 
	    } 
	    reset($objects); 
	    rmdir($dir); 
	} 
    }

    function lang_content_exist($p_db,$p_table_name,$p_msg_id,$p_country_id){
	$is_exist=false;
	$qry_check="SELECT COUNT(`language`.`idlanguage`) FROM `$p_table_name`
		    LEFT JOIN `language` ON($p_table_name.idlanguage=`language`.`idlanguage`)
		WHERE `$p_table_name`.`msg_id`='$p_msg_id' AND `language`.`country_id`='$p_country_id'";
	$res_check=mysql_query($qry_check,$p_db);
	if($res_check!==false){
	    $fa_check=mysql_fetch_array($res_check,MYSQL_NUM);
	    if($fa_check[0]==1){
		$is_exist=true;
	    }
	}else{
	    log_insert($p_db,"Error check lang_content_exist:".mysql_error($p_db));
	    $is_exist=true;//CONSIDER EXIT ON ERROR CHECK
	}
	return $is_exist;
    }
    function lang_content_ins_upd($p_db,$p_table_name,$p_msg_id,$p_country_id,$p_str_content){
	$success=true;
	$is_exist=false;
	if(lang_content_exist($p_db,$p_table_name, $p_msg_id,$p_country_id)){
	    $is_exist=true;
	}
	if($is_exist){//UPDATE
	    $qry_upd="UPDATE `$p_table_name` SET `content`='$p_str_content'
		    WHERE `msg_id`='$p_msg_id' AND `idlanguage`=(SELECT `idlanguage` FROM `language` WHERE `country_id`='$p_country_id' LIMIT 1)
		    LIMIT 1";
	    $res_upd=mysql_query($qry_upd,$p_db);
	    if(!$res_upd){
		log_insert($p_db,"Error update multilang table:".mysql_error($p_db));
		$success=false;
	    }
	}else{//INSERT
	    $qry_ins="INSERT INTO `$p_table_name`(`idlanguage`,`msg_id`,`content`)
		    VALUES ((SELECT `idlanguage` FROM `language` WHERE `country_id`='$p_country_id' LIMIT 1),
		    '$p_msg_id','$p_str_content')";
	    $res_ins=mysql_query($qry_ins,$p_db);
	    if(!$res_ins){
		log_insert($p_db,"Error insert multilang table:".mysql_error($p_db));
		$success=false;
	    }
	}
	return $success;
    }
    function lang_content_destroy($p_db,$p_table_name,$p_msg_id,$p_country_id){
	$success=true;
	$is_exist=false;
	if(lang_content_exist($p_db,$p_table_name, $p_msg_id,$p_country_id)){
	    $is_exist=true;
	}
	if($is_exist){
	    $qry_del="DELETE FROM `$p_table_name`
		WHERE `msg_id`='$p_msg_id'
		LIMIT 1";
	    $res_del=mysql_query($qry_del,$p_db);
	    if(!$res_del){
		log_insert($p_db, "Error when deleting multilang table:".  mysql_error($p_db));
		$success=false;
	    }
	}
	return $success;
    }
    function lang_content_get($p_db,$p_table_name,$p_msg_id,$p_idlanguage){
	$qry_sel="SELECT * FROM `$p_table_name` WHERE `msg_id`='$p_msg_id' AND `idlanguage`=$p_idlanguage LIMIT 1";
	$res_sel=mysql_query($qry_sel,$p_db);
	if(!$res_sel){
	    return "Error query multilang:".  mysql_error($p_db);
	}else{
	    $fa_sel=mysql_fetch_array($res_sel,MYSQL_ASSOC);
	    return $fa_sel['content'];
	}
    }
    function get_path_separator(){
	return (strstr(strtoupper(substr(PHP_OS, 0, 3)), "WIN")) ? "\\" : "/";
    }
    function bsession_life($p_path){
	$lifetime = 60 * 60 * 24 * 7;//7 days
	$separator=get_path_separator();
	$path_dir=$p_path."{$separator}BSession";
	$session_dir_ok=true;
	if(!file_exists($path_dir)){
	    if(!mkdir($path_dir, 0770, true)){
		$session_dir_ok=false;
	    }
	}
	if($session_dir_ok){
	    ini_set("session.cookie_lifetime", $lifetime);
	    ini_set("session.gc_maxlifetime", $lifetime);
	    ini_set("session.gc_divisor", "1000");
	    ini_set("session.gc_probability", "1");
	    ini_set("session.save_path", $path_dir);

	    //BEGIN STARTING SESSION================
	    if (!defined('PHP_VERSION_ID')) {
		$version = explode('.', PHP_VERSION);

		define('PHP_VERSION_ID', ($version[0] * 10000 + $version[1] * 100 + $version[2]));
	    }
	    if(PHP_VERSION_ID>=50400){
		if (session_status() == PHP_SESSION_NONE) {
		    session_start();
		}
	    }else{
		if(session_id() == '') {
		    session_start();
		}
	    }
	    //END STARTING SESSION*************
	}else{
	    echo "<h1><red>There is error with session directory</red></h1>";
	}
    }
    function bcurrency($p_num,$p_locale=BLOCALE){
//	    $this->currency_formatter=new NumberFormatter($p_locale, NumberFormatter::CURRENCY);
//	    $this->currency_formatter->setTextAttribute(\NumberFormatter::CURRENCY_SYMBOL,"USD");
//	    $this->currency_formatter->setAttribute(\NumberFormatter::GROUPING_USED, true);
//	    $this->currency_formatter->setAttribute(\NumberFormatter::MAX_FRACTION_DIGITS, 0);
//	    return $this->currency_formatter->format($p_num);
	setlocale(LC_MONETARY, $p_locale);
	return money_format('%(#10n', $p_num);
    }
    function get_db_key_val($p_db,$p_arr_var){//$p_arr_var[table,field_value, field_key,value_key,val_is_num]
	$field_value=$p_arr_var["field_value"];
	$field_key=$p_arr_var["field_key"];
	$value_key_num=$p_arr_var["value_key"];
	$value_key_str="\"{$p_arr_var["value_key"]}\"";
	$val_is_num=$p_arr_var["val_is_num"];
	$val_sql=($val_is_num==true)?$value_key_num:$value_key_str;
	
	$table=$p_arr_var["table"];
	$qry_sel="SELECT `$field_value` FROM `$table` WHERE `$field_key`=".$val_sql." LIMIT 1";
	$res_sel=  mysql_query($qry_sel,$p_db);
	if($res_sel!==false){
	    $fa_sel=  mysql_fetch_assoc($res_sel);
	    return $fa_sel[$field_value];
	}else{
	    return mysql_error($p_db);
	}
    }
    function gen_num_zero_fill($p_num,$p_total_length){
	$ret_zero_fill="";
	$diff_length=$p_total_length-strlen($p_num);
	$zero_char="";
	for($i=0;$i<$diff_length;$i++){
	    $zero_char.="0";
	}
	$ret_zero_fill=$zero_char.$p_num;
	return $ret_zero_fill;
    }
    function bcount_relative_level($p_relative_path,$p_separator="/"){
	$arr_relative_level = explode($p_relative_path,$p_separator);
	$int_ret=0;
	foreach($arr_relative_level as $item){
	    if($item=="..")$int_ret++;
	}
    }
?>