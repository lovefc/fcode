 ###  fcode.js 自动锁屏插件
 
 ![](http://fcode.lovefc.cn/fcode.jpg)
 
  #### fcode.js是什么？
  
   fcode.js是一款web页面九宫格自动锁屏js插件，依赖于jquery，
   
   会在设置的范围里，判断用户有无操作，然后执行锁屏的功能。
  
   就一个类文件，配置简单，操作方便，可以锁住任何页面，还支持在手机端的锁屏。
   
   演示地址：http://fcode.lovefc.js
   
   demo请在http方式下访问
   
  #### 如何使用fcode？
  
~~~

  <script src="js/jquery.min.js"></script>
  
  <script src="js/fcode.js"></script>
  
  <script type="text/javascript">
      fcode.Start(123);
  </script>
  
~~~

   >[info] 
 > 因为是使用的九宫格，所以密码就是对应着数字123456789，最上面一排从左到右代表1，2，3，中间代表4，5，6，最后一排代表7，8，9
 > 所以相应的密码也要如此设置
 
 #### fcode的基本配置
 
 > fcode.js的基本配置非常简单，一看便知，便不多做介绍

~~~
   <script type="text/javascript">

        fcode.bgColor = '#FFF'; //背景颜色

        fcode.fontColor = '#666';//圆环颜色

        fcode.lineColor = "#333"; //连线的颜色

        fcode.lineErrorColor = "#00a254";//连线错误颜色

        fcode.lineSuceessColor = "#cc1c21";//连续正确颜色

        fcode.Time = 10;//锁屏的时间,单位s

        fcode.bgImage = 'images/time.jpg'; //设置背景图片，优先于背景颜色

        fcode.customHtml = 'lovefc';//定义九宫格解锁上方的html内容
        
        fcode.Start('123');//启动运行
    </script>
~~~

>这里重点介绍一下fcode.Start这个函数的设置，这个函数是启动功能的，参数可以是密码，md5加密的密码，或者是一个api接口
 
 >[warning]
>这里我重点讲一下，请不要拿它做登录相关的应用，因为它是js为主体的，容易被绕过去，本身来讲，就不是十分安全的，锁屏功能主要应用于后台页面无人操作时，自动屏蔽页面，隐藏当前的操作，以及一些其（zhuang）它（bi）方面的应用，所以我设置了三种设置密码的方式。

1.普通密码形式。
~~~
     fcode.Start('123');//启动运行
~~~
这种方式，就是代表第一排滑动解锁，简单方便，缺点是能看到源码（虽然我已经屏蔽了源码查看，f12，右键查看的功能）

2.md5加密形式，其实就是把上面的123md5加密一下，是小写的md5 32位加密方式，可以随便找个工具加密一下就行了，比如用这个，http://tool.chinaz.com/tools/md5.aspx
这种方式安全多了，而且可以免去配置api接口，不需要额外的脚本就能运行

~~~
     fcode.Start('202cb962ac59075b964b07152d234b70');//启动运行
~~~
 
3.第三种方式就是api接口形式的了，目前只提供了php的接口参考（本人做php的），地址一定要填写完整的接口地址，例如 http://127.0.0.1/yz.php
 
 ~~~
     fcode.Start('http://127.0.0.1/yz.php');
~~~

接口设计也是非常简单，没有什么复杂的地方，一看便知

~~~
  <?php
   /* 
    * 用来验证锁屏密码 
    * author:lovefc
    */
 
   $pwd = isset($_POST['pwd']) ? $_POST['pwd']:null;//获取传过来的密码

   $time = isset($_POST['time']) ? (int) $_POST['time'] : 60;//获取传过来的时间

  if(!empty($pwd)){
	  //比对密码,看看是否相等
	  if($pwd==1235789){
		  //设置cookies,加上时间
          setcookie("fcode_status",'lovefc', time()+$time);
		  //返会并输出ok
	      die('ok');
	  }
  }
~~~


4.兼容性说明,并不支持ie!


### 作者吐槽

不足之处 欢迎反馈 	QQ:1102952084

快捷使用 方便你我 给个Star 感激不尽

 ?:.?ヽ(?????)??.:?+?
