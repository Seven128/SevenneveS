/**
 * @function 页面加载完毕的时候执行函数
 * @param {function} func 需要在页面加载完毕的时候执行的函数
 */
function addLoadEvent(func) {
  var oldonload = window.onload;
    if (typeof window.onload != 'function') {
      window.onload = func;
    }else {
      window.onload = function() {
      oldonload();
      func();
    }
    }
}

/**
 * @function 搜索按钮的点击事件
 * @return {[type]} [description]
 */
function search() {
  var nav = document.getElementsByClassName('search')[0];
  var button = nav.getElementsByTagName('button')[0];
  var i = button.getElementsByTagName('i')[0];
  var input = nav.getElementsByTagName('input')[0];
  var isClicked = false;
    input.onclick = function() {
      input.style.width = '500px';
      button.style.backgroundColor = '#9C9898';
      button.style.color = 'white';
      isClicked = true;
    }
    // 捕捉鼠标下一次点击，判断它是否再次点击到input或者button，不是的话则将搜索栏缩短至原来长度。
    document.body.onclick = function(e) {
      e = e || window.event;
      var target = e.target || e.srcElement;
      if (isClicked == true && (e.target === input || e.target === button || e.target === i)) {
        return;
      }else {
        input.style.width = '300px';
        button.style.backgroundColor = 'transparent';
        button.style.color = 'gray';
        isClicked = false;
      }
    }
}



/**
 * @function 全屏宽度的商品图片轮播
 * @return {null}
 */
function roll() {
  var box = document.getElementById('box');
  var oUl = box.getElementsByTagName('ul')[0];
  var oLi = oUl.getElementsByTagName('li');
  var go = document.getElementById('go');
  var back = document.getElementById('back');
  var a;
  var img;
  var num = 0;
  var timer = null;
  var element = document.getElementsByClassName("button_1")[0].getElementsByTagName('span');
    oUl.style['height'] = box.style.height;
    //获取窗口的可见宽度并且赋值给图片oLi[i]，用户观察到的轮播窗口box
    for (var i =0;i<oLi.length;i++) {
      a = oLi[i].getElementsByTagName('a')[0];
      img = oLi[i].getElementsByTagName('a')[0].getElementsByTagName('img')[0];
      oLi[i].style['width'] = document.body.clientWidth + 'px';
      oLi[i].style['height'] = box.style.height;
      a.style['width'] = document.body.clientWidth + 'px';
      a.style['height'] = getStyle(box,'height');
      img.style['width'] = document.body.clientWidth + 'px';
      img.style['height'] = getStyle(box,'height');
    }

    window.onresize = function() {
      for (var i =0;i < oLi.length;i++) {
        a = oLi[i].getElementsByTagName('a')[0];
        img = oLi[i].getElementsByTagName('a')[0].getElementsByTagName('img')[0];
        oLi[i].style['width'] = document.body.clientWidth + 'px';
        oLi[i].style['height'] = box.style.height;
        a.style['width'] = document.body.clientWidth + 'px';
        a.style['height'] = getStyle(box,'height');
        img.style['width'] = document.body.clientWidth + 'px';
        img.style['height'] = getStyle(box,'height');
      }
      clearInterval(timer);
      move();
    }
    color(num,element);
    //添加一张和第一张图片一样的图片到第四张图片之后以达到无缝的效果
    var firstChild = oUl.children[0].cloneNode(true);
    oUl.appendChild(firstChild);
    oUl.style.width = oLi[0].offsetWidth*oLi.length + 'px';

    //自动循环（内包）函数
    function autoRoll() {
      timer = setInterval(function(){
        num++;
        move();
      },
      6000);
    }
    autoRoll();
    button();

    /**
     * @function 对num进行判断，确定图片容器下一步的操作
     * @return {null}
     */
    function move() {
      if (num == oLi.length) {
        oUl.style.left = 0;
        num = 1;
      }else if(num == -1) {
        oUl.style.left = -(oLi.length - 1)*oLi[0].offsetWidth + 'px';
        num = oLi.length - 2;
      }
      doMove(oUl,'left',-num * oLi[0].offsetWidth);
      if (num == 4) {color(0,element);}
      else {color(num,element);}
    }

    go.onclick = function() {
      num++;
      move();
    }
    back.onclick = function() {
      num--;
      move();
    }

    box.onmouseover = function() {
      clearInterval(timer);
    }
    box.onmouseout = function(){
      autoRoll();
    }
    /**
     * 给每个按钮都添加点击事件，转到目标图片
     * @return {null}
     * FIXME:这里可以弄事件委托，但是由于时间关系，感觉不是很弄得来（还有其他地方也是）
     */
    function button() {
      var element = document.getElementsByClassName("button_1")[0].getElementsByTagName('span');
        for (let i = 0;i < element.length; i++) {
          element[i].onclick = function() {
            num = i;
            clearInterval(timer);
            move();
            color(i,element);
          }
        }
    }
  /**
   * @function 给按钮上色
   * @param  {number} index   第几个按钮（数组）
   * @param  {[type]} element 按钮数组的对象
   * @return {null}
   */
  function color(index,element) {
    for (let n = 0;n <= (element.length -1);n++) {
      element[n].style.backgroundColor = 'white';
    }
    element[index].style.backgroundColor = 'black';
  }
}

/**
 * @function 执行轮播时整个图片框的移动函数
 * @param  {object} element 要移动的（图片）对象
 * @param  {string} atrr    要改变的属性如'left'
 * @param  {number} target  目标位置
 * @return {null}
 */
function doMove(element,atrr,target) {
  clearInterval(element.timer);
  element.timer = setInterval(function() {
    //速度由快变慢
    var step = (target - parseInt(getStyle(element,atrr))) / 10;
    //无论目标在左在右，每一步的距离都是往上取
    step = step > 0?Math.ceil(step) : Math.floor(step);
      if(element.style.atrr == target) {
        clearInterval(element.timer);
      }else {
        element.style[atrr] = parseInt(getStyle(element,atrr)) + step + 'px';
      }
  },15);
}

/**
 * @function 获取obj对象的style属性的attr属性的值（兼容）
 * @param  {object} obj  要获取attr属性的值的所属对象
 * @param  {string} attr 目标属性
 * @return {null}
 */
function getStyle(obj,attr) {
  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}


/**
 * @function 第一个商品轮播
 * @return {null}
 */
function rollByPerson_0() {
  var box = document.getElementsByClassName('showGoods_box')[0];
  var oUl = box.getElementsByTagName('ul')[0];
  var oLi = oUl.getElementsByTagName('li');
  var go = document.getElementsByClassName('go')[0];
  var back = document.getElementsByClassName('back')[0];
  var num = 0;
    for(let a = 0;a < 4;a++) {
    var Child = oUl.children[a].cloneNode(true);
    oUl.appendChild(Child);
    }
    oUl.style.width = oLi[0].offsetWidth*8 + 'px';

    function move() {
    // 当前张是第五张（伪第一张）的时候
    if(num == 6) {
      oUl.style.left = -oLi[0].offsetWidth + 'px';
      num = 2;
    }else if(num == -1) {
      // 当第一张往后点到第四张的时候
      oUl.style.left = -4*oLi[0].offsetWidth + 'px';
      num = 3;
    }
    doMove(oUl,'left',-num * oLi[0].offsetWidth);
    }

    go.onclick = function(){
      setTimeout(function() {
        num++;
        move();
        }, 200);
    }

    back.onclick = function(){
      setTimeout(function() {
        num--;
        move();
        }, 200);
    }
}

/**
 * @function 第二个商品轮播
 * @return {null}
 */
function rollByPerson_1() {
  var box = document.getElementsByClassName('showGoods_box')[1];
  var oUl = box.getElementsByTagName('ul')[0];
  var oLi = oUl.getElementsByTagName('li');
  var go = document.getElementsByClassName('go')[1];
  var back = document.getElementsByClassName('back')[1];
  var num = 0;
    for(let a = 0;a < 4;a++) {
    var Child = oUl.children[a].cloneNode(true);
    oUl.appendChild(Child);
    }
    oUl.style.width = oLi[0].offsetWidth*8 + 'px';

    function move() {
    // 当前张是第五张（伪第一张）的时候
    if(num == 6) {
      oUl.style.left = -oLi[0].offsetWidth + 'px';
      num = 2;
    }else if(num == -1) {
      // 当第一张往后点到第四张的时候
      oUl.style.left = -4*oLi[0].offsetWidth + 'px';
      num = 3;

    }
    doMove(oUl,'left',-num * oLi[0].offsetWidth);
    }

    go.onclick = function(){
      setTimeout(function() {
        num++;
        move();
        }, 200);
    }

    back.onclick = function(){
      setTimeout(function() {
        num--;
        move();
        }, 200);
    }
}




/**
 * @function 弄来玩玩的拖动鼠标可以达到滑动滑轮效果的函数（代码思路是别人的，我加了个无法选中文本的功能）
 * @return {null}
 */
function pullMove() {
var _y;
var scrollTop;
var isDone = false;
  document.onmousedown=function(e) {
    var e = window.event || e;
    _y = e.clientY;
    scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    console.log(scrollTop)
    isDone = true;
  };
  document.onmousemove = function(e){
    // 兼容
    var e = window.event || e;
      if(!isDone) return;
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
      document.body.style.cursor="move";
      var move=(e.clientY - _y);
      window.scrollTo(0,scrollTop-move);
  };
  document.onmouseup= function() {
    isDone = false;
      document.onselectstart = function() {
        return true;
      }
      document.body.style.cursor="default";
  };
}

/**
 * @function 不同类型商品展示框之间的切换
 * @return {null}
 */
function showGoodsMore() {
  var oLi = document.getElementsByClassName('showGoods_1')[0].getElementsByTagName('nav')[0].getElementsByTagName('li');
  var goodsNav = document.getElementsByClassName('goodsNav');
    goodsNav[1].style.display = 'block';
      for (let i = 0;i < oLi.length;i++) {
        oLi[i].onclick = function() {
          for(let n = 0;n < goodsNav.length;n++) {
          goodsNav[n].style.display = 'none';
        }
        goodsNav[i].style.display = 'block';
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
      if (scroll >= 600) {
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

addLoadEvent(roll);
addLoadEvent(rollByPerson_0);
addLoadEvent(rollByPerson_1);
addLoadEvent(showGoodsMore);
addLoadEvent(search);
addLoadEvent(pullMove);
addLoadEvent(floatUp);
