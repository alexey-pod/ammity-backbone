<?php
//$_GET['mnemonic']='index';
//include ("./inc/public.inc.php");
//$_GET = json_decode(file_get_contents('php://input'), true);
include ($_SERVER['DOCUMENT_ROOT']."/inc/public.inc.php");



$cat_obj= new catClassClient();
$cat_array=$cat_obj->getCatArray(array('id'=>0, 'bild_url'=>true, 'show_in_mane'=>true));
//loggerClass::writeLog($_SESSION);exit;
//loggerClass::writeLog($cat_array);exit;
$tpl->assign('cat_array', $cat_array);


$pr_ob=new presentationClassClient();
$pr_mane=$pr_ob->getPresentationArray(array('pp'=>3, 'page'=>1, 'show_in_mane'=>1, 'bild_url'=>true));
$tpl->assign('pr_mane', $pr_mane);
//loggerClass::writeLog($pr_mane);	exit;



//$tpl->display('client/tpl_index.tpl');

$result=array();
//$result['site_data']=$site_data;
$result['cat_array']=$cat_array;
$result['pr_mane']=$pr_mane;
$result['page_item']=$page_item;

//sleep(1);

echo json_encode($result);

?>