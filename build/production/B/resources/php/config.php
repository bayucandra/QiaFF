<?php
    require_once('function/general.php');
    
    define("DEVELOPMENT_MODE",1);

    define("APP_DETAIL",serialize(array(
	"name"=>"FQIA",
	"version"=>"0.2",
	"title"=>"QiaFF | Quality integrated application - for furniture company",
	"description"=>"Integrated system application - for furniture company",
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
	    "username" =>"adminEv4eDyN",
	    "password" => "biuI33CaMFIx",
	    "dbname" => "qiaff",
	    "transactional" => true
	    )
    ));
    define("DB_PX","");//Database table prefix
    define("ENC_PASSWORD","md5");
    
    define("SESSION_NAME","bfurn");
    define("IDUSER_GROUP_ROOT",0);
?>