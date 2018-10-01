<?php
//$_GET = json_decode(file_get_contents('php://input'), true); 
include ($_SERVER['DOCUMENT_ROOT']."/inc/public.inc.php");

//loggerClass::writeLogA(	$_GET	);
//loggerClass::writeLog('<br></br><br></br><br></br>');
//exit;

$result=array();

if($_GET['mnemonic']=='cooperation'){//++
	//$tpl->display('client/tpl_cooperation.tpl');
}
else if($_GET['mnemonic']=='search_dealer'){//+
	{//diler_array
		$host=($_SERVER['DOCUMENT_ROOT']=='C:/home/loc_ammity.ru/www')?('http://loc_clear-fit.ru/admin/diler_export.php'):('http://clear-fit.ru/admin/diler_export.php');
		$diler_str=file_get_contents($host);
		$diler_array=json_decode($diler_str, true);
		//loggerClass::writeLog($diler_array);exit;
		foreach($diler_array as $key_1=>$val_1) {
			foreach($val_1 as $key_2=>$val_2) {
				//loggerClass::writeLog(	$val_2	);
				//loggerClass::writeLog(	substr($val_2['website1'], 0,7)	);
				
				$diler_array[$key_1][$key_2]['index_letter']=$key_1;
				
				if($val_2['website1']!=''){
					if(substr($val_2['website1'], 0,7)!='http://'){
						$diler_array[$key_1][$key_2]['website1_url']='http://'.$val_2['website1'];
					}
					else{
						$diler_array[$key_1][$key_2]['website1_url']=$val_2['website1'];
					}
				}
				if($val_2['website2']!=''){
					if(substr($val_2['website2'], 0,7)!='http://'){
						$diler_array[$key_1][$key_2]['website2_url']='http://'.$val_2['website2'];
					}
					else{
						$diler_array[$key_1][$key_2]['website2_url']=$val_2['website2'];
					}
				}
			}
			
			
			//loggerClass::writeLog(	substr($val['name'], 0,7)	);
			//$diler_array[$key] = $val;
		}
		//exit;
		//loggerClass::writeLog($diler_array);exit;
		$tpl->assign('diler_array', $diler_array);
		
	}//END diler_array
	
	{//diler_array_map
		$host=($_SERVER['DOCUMENT_ROOT']=='C:/home/loc_ammity.ru/www')?('http://loc_clear-fit.ru/admin/diler_export_map.php'):('http://clear-fit.ru/admin/diler_export_map.php');
		//loggerClass::writeLog('host', $host);
		$diler_str=file_get_contents($host);
		$diler_map_array=json_decode($diler_str, true);
		$tpl->assign('diler_map_array', $diler_map_array);
		//loggerClass::writeLog($result);exit;
	}//END diler_array_map
	
	//$tpl->display('client/tpl_search_dealer.tpl');
	$result['diler_array']=$diler_array;
	$result['diler_map_array']=$diler_map_array;
}
else if($_GET['mnemonic']=='search_dealer2'){// не используется
	{//diler_array
		$host=($_SERVER['DOCUMENT_ROOT']=='C:/home/loc_ammity.ru/www')?('http://loc_clear-fit.ru/admin/diler_export.php'):('http://clear-fit.ru/admin/diler_export.php');
		$diler_str=file_get_contents($host);
		$diler_array=json_decode($diler_str, true);
		//loggerClass::writeLog($diler_array);exit;
		foreach($diler_array as $key_1=>$val_1) {
			foreach($val_1 as $key_2=>$val_2) {
				//loggerClass::writeLog(	$val_2	);
				//loggerClass::writeLog(	substr($val_2['website1'], 0,7)	);
				if($val_2['website1']!=''){
					if(substr($val_2['website1'], 0,7)!='http://'){
						$diler_array[$key_1][$key_2]['website1_url']='http://'.$val_2['website1'];
					}
					else{
						$diler_array[$key_1][$key_2]['website1_url']=$val_2['website1'];
					}
				}
				if($val_2['website2']!=''){
					if(substr($val_2['website2'], 0,7)!='http://'){
						$diler_array[$key_1][$key_2]['website2_url']='http://'.$val_2['website2'];
					}
					else{
						$diler_array[$key_1][$key_2]['website2_url']=$val_2['website2'];
					}
				}
			}
			
			
			//loggerClass::writeLog(	substr($val['name'], 0,7)	);
			//$diler_array[$key] = $val;
		}
		//exit;
		//loggerClass::writeLog($diler_array);exit;
		$tpl->assign('diler_array', $diler_array);
		
	}//END diler_array
	
	{//diler_array_map
		$host=($_SERVER['DOCUMENT_ROOT']=='C:/home/loc_ammity.ru/www')?('http://loc_clear-fit.ru/admin/diler_export_map.php'):('http://clear-fit.ru/admin/diler_export_map.php');
		//loggerClass::writeLog('host', $host);
		$diler_str=file_get_contents($host);
		$diler_map_array=json_decode($diler_str, true);
		$result=array();
		$tpl->assign('diler_map_array', $diler_map_array);
		//loggerClass::writeLog($diler_map_array);exit;
	}//END diler_array_map
	
	$tpl->display('client/tpl_search_dealer2.tpl');
}
else if($_GET['mnemonic']=='product_registration'){//+
	$obj = new catClassClient();
	$cat_array=$obj->getCatArray(array('link_disable'=>0));
	$tpl->assign('cat_array', $cat_array);
	//loggerClass::writeLog($cat_array);exit;
	//$tpl->display('client/tpl_product_registration.tpl');
	
	$result['cat_array']=$cat_array;
}
else if($_GET['mnemonic']=='contact'){//+
	$obj = new catClassClient();
	$cat_array=$obj->getCatArray(array('link_disable'=>0));
	$tpl->assign('cat_array', $cat_array);
	//$tpl->display('client/tpl_contact.tpl');
	$result['cat_array']=$cat_array;
}
else if($_GET['mnemonic']=='action'){//+
	//$tpl->display('client/tpl_action.tpl');
}
else if($_GET['mnemonic']=='presentation'){//+
	
	$pr_ob=new presentationClassClient();
	$pr_array=$pr_ob->getPresentationArray(array('page'=>-1, 'get_image'=>true, 'show_in_pr_page'=>1));
	$tpl->assign('pr_array', $pr_array);
	$result['pr_array']=$pr_array;
	//loggerClass::writeLog(	$pr_array	);exit;
	//$tpl->display('client/tpl_presentation.tpl');
}
else if($_GET['mnemonic']=='app'){//+
	
	$obj=new appClassClient();
	$app_cat_array=$obj->getAppCat(array());
	$tpl->assign('app_cat_array', $app_cat_array);
	/*
	loggerClass::writeLog(	$app_cat_array	);exit;
	*/
	//$tpl->display('client/tpl_app.tpl');
	
	$result['app_cat_array']=$app_cat_array;
	
}
else if($_GET['mnemonic']=='basket'){
	
	
	//$tpl->display('client/tpl_basket.tpl');
	$page_item=$p_obj->getPageItemByMnemonic($_GET);
}
else{
	
	$page_item=$p_obj->getPageItemByMnemonic($_GET);
	//loggerClass::writeLog(	$page_item	);
	/*
	if(!$page_item){
		page404();
	}
	*/
	
	//$tpl->display('client/tpl_pages.tpl');
}




//sleep(2);
$result['page_item']=$page_item;
echo json_encode($result);


?>