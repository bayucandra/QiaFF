<?php
    require_once('function/general.php');
    
    define("DEVELOPMENT_MODE",1);

    define("APP_DETAIL",serialize(array(
	"name"=>"FQIA",
	"version"=>"0.2",
	"title"=>"Furniture Quality integrated application | FQIA",
	"description"=>"Furniture integrated system application",
	"company"=>"BQSoft",
	"admin_contact"=>"bayucandra@gmail.com"
    )));
	
    define("ROOT_PATH_SYSTEM", dirname(__FILE__));
    define("OPENSHIFT_DB_HOST",getenv('OPENSHIFT_MYSQL_DB_HOST'));
    if(getenv('OPENSHIFT_MYSQL_DB_HOST')!==false){
	define("MYSQL_HOST",getenv('OPENSHIFT_MYSQL_DB_HOST'));
    }else{
	define("MYSQL_HOST","localhost");
    }
    
    define("BFURN_MYSQL_CONFIG",serialize(
	array(
	    "host" => MYSQL_HOST,
	    "username" =>"adminiLAdCuH",
	    "password" => "YJlPcGk6ibVc",
	    "dbname" => "qiaff",
	    "transactional" => true
	    )
    ));
    define("DB_PX","");//Database table prefix
    define("ENC_PASSWORD","md5");
    
    define("SESSION_NAME","bfurn");
    define("IDUSER_GROUP_ROOT",0);
?>