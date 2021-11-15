<?php
if(strpos("?",$_GET["page"]) > -1){
  die("No");
}
if(strpos("&",$_GET["page"]) > -1){
  die("No");
}
header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');
echo file_get_contents("https://en.wikipedia.org/wiki/".$_GET["page"]);
?>
