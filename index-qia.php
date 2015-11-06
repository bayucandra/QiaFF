<?php
    require_once("resources/php/config.php");
    $app_detail = unserialize(APP_DETAIL);
?>
<!DOCTYPE HTML>
<html manifest="">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <title><?php echo $app_detail["title"];?></title>
    <link rel="stylesheet" type="text/css" href="resources/css/interface.css"/>
    <link rel="stylesheet" type="text/css" href="resources/css/bdata-view.css"/>
    <link rel="stylesheet" type="text/css" href="resources/css/desktop.css"/>

    <!-- The line below must be kept intact for Sencha Cmd to build your application -->
    <script id="microloader" type="text/javascript" src="bootstrap.js"></script>
    <script type="text/javascript" src="resources/bjs/bfunctions.js"></script>

</head>
<body>
    <div id="bloading_indicator" style="margin-top:-70px;position:absolute;top:50%;width:95%;text-align:center;z-index:-999999;">
	<img src="resources/bimages/loading.gif" alt="Loading..." />
	<h3 style="color:#004AB8;text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.3);" class="farial">Loading...</h3>
    </div>
</body>
</html>
