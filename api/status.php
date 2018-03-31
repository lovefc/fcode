<?php
/* 
 * 用来验证锁屏密码 
 * author:lovefc
 */
 
$pwd = isset($_POST['pwd']) ? $_POST['pwd']:null;//获取传过来的密码

$time = isset($_POST['time']) ? (int) $_POST['time'] : 60;//获取传过来的时间，用来设置cookies过期时间

if(!empty($pwd)){
	//比对密码,看看是否相等
	if($pwd==1235789){
		//设置cookies,加上时间,cookies的值为lovefc
        setcookie("fcode_status",'lovefc', time()+$time);
		//返会并输出ok
	    die('ok');
	}
}

