<?php
include ($_SERVER['DOCUMENT_ROOT']."/inc/public.inc.php");

$result=array();
{// боковое меню каталога
	$cat_ob=new catClassClient();
	//$left_menu=$cat_ob->getCatDtree(array('get_ann'=>true));
	$left_menu=$cat_ob->getLeftMenu(array('get_ann'=>true));
	//$tpl->assign('left_menu', $left_menu);
	$result['left_menu']=$left_menu;
	
	//loggerClass::writeLog($left_menu[0]['child'][0]['ann_array']);
	//loggerClass::writeLog($left_menu);exit;
} 
{// боковая презентация
	$pr_ob=new presentationClassClient();
	$pr_left=$pr_ob->getPresentationArray(array('page'=>1, 'pp'=>3, 'show_in_mane'=>1, 'bild_url'=>true));
	$tpl->assign('pr_left', $pr_left);
	//loggerClass::writeLog($pr_left[0]);	exit;
	
	
	$result['pr_left']=$pr_left;
}

$result['config']=configClass::getAll();


$a_obj=new annClassClient();
$result['compare']=$a_obj->getCompareAll();

$b_obj=new basketClass();
$result['basket']=$b_obj->loadBasket();

//sleep(1);
echo json_encode($result);


?>