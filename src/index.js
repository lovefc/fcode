/* 适合在路由访问下引入 */
var js = document.scripts;
js = js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf("/") + 1);
/**  加载jquery **/
!window.jQuery && document.write('<script src="' + js + 'jquery-2.1.4.min.js"><\/script>');
/**  加载fcode **/
document.write('<script src="' + js + 'fcode.min.js"><\/script>');
