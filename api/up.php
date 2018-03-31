<?php
/* 
 * 用来更新锁屏密码 
 * author:lovefc
 */
 
$pwd = isset($_POST['pwd']) ? $_POST['pwd']:null;//获取传过来的密码

if(!empty($pwd)){
     /* 这里随便你怎么做，可以写入数据，存进文件里面*/
	die('ok');
}