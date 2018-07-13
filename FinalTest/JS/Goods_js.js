function addLoadEvent(func) {
  var oldonload = window.onload ;
    if (typeof window.onload!='function') {
    window.onload = func;
    }else {
    window.onload = function() {
    oldonload();
    func();
    }
    }
}



/**
 * @function 放大镜效果
 * @return {null}
 */
function toBig(){
	var Box = document.getElementById('box');
	var fbox = document.getElementById('float_box');
	var bigbox = document.getElementById('bigBox');
  var Bigbox = bigbox.getElementsByTagName('img')[0];
    /* alert(Bigboxgg.target.src);
       console.log(Bigboxgg)
  	   var Bigbox = getChildNodes(bigbox)[0];
       Box.onmousedown = function (e){
         e = e || window.event;
         let x= e.clientX - Box.getBoundingClientRect().left;
         let y= e.clientY - Box.getBoundingClientRect().top;
         alert("X coords: " + x + ", Y coords: " + y)
       }
      */
     //鼠标在需要放大的图片上悬停的时候放大镜和放大显示框出现，鼠标样式改变
  	Box.onmouseover = function () {
      Box.style.cursor = 'move';
      fbox.style.display = 'block';
      bigbox.style.display = 'block';
  	}
    //鼠标离开放大的图片的时候放大镜和放大显示框消失
  	Box.onmouseout = function () {
      fbox.style.display = 'none';
      bigbox.style.display = 'none';
  	}
    /**
     * @function 鼠标在需要放大的图片上移动时在放大显示框实现放大效果
     * @param  {event} e 每移动一个像素就触发一次事件
     * @return {[type]}
     */
    Box.onmousemove = function(e) {
      e = e || window.event;
      // 规定放大倍数，此处为4倍
      var N = 4;
      // 分别取得鼠标相对id为Box的div的坐标位置
      var x_1 = e.clientX - Box.getBoundingClientRect().left;
      var y_1 = e.clientY - Box.getBoundingClientRect().top;
      // 根据放大倍数，规定放大镜的大小
      fbox.style.width = parseInt(Box.offsetWidth / N) + 'px';
      fbox.style.height = parseInt(Box.offsetHeight / N) + 'px';
      // 放大镜在需要放大的图片中的坐标位置
      var x = x_1 - fbox.offsetWidth / 2;
      var y = y_1 - fbox.offsetHeight / 2;
      // 根据放大倍数，调整显示部分的倍数（以达到放大的效果）
      Bigbox.style.width = Box.offsetWidth * N + 'px';
      Bigbox.style.height = Box.offsetHeight * N + 'px';
        // 分别在X的左右方向和Y的上下方向限制放大镜的移动范围
        if (x < 0) {
        	x = 0;
        }
        if (y < 0) {
        	y = 0;
        }
        if (Box.offsetHeight - y_1 <= fbox.offsetHeight / 2) {
           y =  Box.offsetHeight -  fbox.offsetHeight;
        }
        if (Box.offsetWidth - x_1 <= fbox.offsetWidth / 2) {
           x = Box.offsetWidth - fbox.offsetWidth;
        }
      fbox.style.top = y + 'px';
      fbox.style.left = x + 'px';
      // 通过改变放大的图片外边距来达到移动的效果（在规定了该图片的positon属性的情况下，也可以通过改变top和left属性的值来达到目的）
      Bigbox.style.marginTop = - fbox.offsetTop * N + 'px';
      Bigbox.style.marginLeft =  - fbox.offsetLeft * N + 'px';
  }
}

/*
function getElementLeft(element){
    var left = element.offsetLeft;
    if (element.offsetParent != null){left += getElementLeft(element.offsetParent);}
    else return left;
}

function getElementTop(element){
    var top = element.offsetTop;
    if (element.offsetParent != null){top += getElementTop(element.offsetParent);}
    else return top;
}
*/

/**
 * @function 商品信息和评论和商品标签的切换效果
 * @return {null}
 */
function showGoodsMore(){
  var oLi = document.getElementsByClassName('underGoods_1')[0].getElementsByTagName('li');
  var content_1 = document.getElementsByClassName('content_1')[0];
  var content_2 = document.getElementsByClassName('content_2')[0];
  var content_3 = document.getElementsByClassName('content_3')[0];
    // 商品信息的显示
    oLi[0].onclick = function() {
      content_2.style.display = 'none';
      content_3.style.display = 'none';
      content_1.style.display = 'block';
    }
    // 评论的显示
    oLi[1].onclick = function() {
      content_1.style.display = 'none';
      content_3.style.display = 'none';
      content_2.style.display = 'block';
    }
    // '添加商品标签'的显示
    oLi[2].onclick = function() {
      content_1.style.display = 'none';
      content_2.style.display = 'none';
      content_3.style.display = 'block';
    }
}

/**
 * @function 搜索按钮的点击事件
 * @return {[type]} [description]
 */
function search() {
  var nav = document.getElementsByClassName('nav_1')[0];
  var button = nav.getElementsByTagName('button')[0];
  var i = button.getElementsByTagName('i')[0];
  var input = nav.getElementsByTagName('input')[0];
  var isClicked = false;
    input.onclick = function() {
      input.style.width = '250px';
      button.style.backgroundColor = '#9C9898';
      button.style.color = 'white';
      isClicked = true;
    }
    // 捕捉鼠标的点击事件，判断它是否再次点击到input或者button，不是的话则将搜索栏缩短至原来长度。
    document.body.onclick = function(e) {
      e = e || window.event;
      var target = e.target || e.srcElement;
      if (isClicked == true && (e.target === input || e.target === button || e.target === i)) {
        return;
      }else {
        input.style.width = '150px';
        button.style.backgroundColor = 'transparent';
        button.style.color = 'gray';
        isClicked = false;
      }
    }
}


function littePic() {
  var pic = document.getElementById('box').getElementsByTagName('img')[0];
  var pic_2 = document.getElementById('bigBox').getElementsByTagName('img')[0];
  var oUl = document.getElementsByClassName('GoodsPic_2')[0].getElementsByTagName('ul')[0];
  var oLi = oUl.getElementsByTagName('li');
    for (let n = 0;n <= oLi.length;n++) {
      oLi[n].onmouseover = function() {
      pic.src = oLi[n].getElementsByTagName('img')[0].src;
      pic_2.src = oLi[n].getElementsByTagName('img')[0].src;
    }
    }

}


/**
 * @function 固定在页面右下角的悬浮按钮
 * @return {null}
 */
function floatUp() {
  var float = document.getElementById('floatUp');
    window.onscroll = function() {
      var scroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (scroll >= 200) {
        float.style.opacity = '1';
      }else {
        float.style.opacity = '0';
      }
    }
    float.onclick = function() {
      doMove(0);
    }

  function doMove(target) {
    var timer = setInterval(function() {
      var distance = document.documentElement.scrollTop || document.body.scrollTop;
      //速度由快变慢
      var step = Math.ceil((distance - target ) / 5);
        if(distance == target) {
          clearInterval(timer);
        }else {
          window.scrollTo(0 , distance - step);
        }
    },30);
  }
}

addLoadEvent(toBig);
addLoadEvent(showGoodsMore);
addLoadEvent(search);
addLoadEvent(littePic);
addLoadEvent(floatUp);