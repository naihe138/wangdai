
var     myScroll,

    pullDownEl, pullDownOffset,

    pullUpEl, pullUpOffset,

    generatedCount = 0;

 

/**

 * 下拉刷新 （自定义实现此方法）

 * myScroll.refresh(); 数据加载完成后，调用界面更新方法

 */

function pullDownAction () {

    setTimeout(function () {    

        var el, li, i;

        el = document.getElementById('thelist');

 

        for (i=0; i<3; i++) {

            li = document.createElement('li');

            li.innerText = 'Generated row ' + (++generatedCount);

            el.insertBefore(li, el.childNodes[0]);

        }

         

        myScroll.refresh();     //数据加载完成后，调用界面更新方法  

    }, 1000);   

}

 

/**

 * 滚动翻页 （自定义实现此方法）

 * myScroll.refresh();      // 数据加载完成后，调用界面更新方法

 */

function pullUpAction () {

    setTimeout(function () {    // <-- Simulate network congestion, remove setTimeout from production!

        var el, li, i;

        el = document.getElementById('thelist');

 

        for (i=0; i<3; i++) {

            li = document.createElement('li');

            li.innerText = 'Generated row ' + (++generatedCount);

            el.appendChild(li, el.childNodes[0]);

        }

         

        myScroll.refresh();     //数据加载完成后，调用界面更新方法 

    }, 1000);   

}

 

/**

 * 初始化iScroll控件

 */

function loaded() {

    pullDownEl = document.getElementById('pullDown');

    pullDownOffset = pullDownEl.offsetHeight;

    pullUpEl = document.getElementById('pullUp');   

    pullUpOffset = pullUpEl.offsetHeight;

     

    myScroll = new iScroll('wrapper', {

        scrollbarClass: 'myScrollbar', 

        useTransition: false, 

        topOffset: pullDownOffset,

        onRefresh: function () {

            if (pullDownEl.className.match('loading')) {

                pullDownEl.className = '';

                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';

            } else if (pullUpEl.className.match('loading')) {

                pullUpEl.className = '';

                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';

            }

        },

        onScrollMove: function () {

            if (this.y > 5 && !pullDownEl.className.match('flip')) {

                pullDownEl.className = 'flip';

                pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';

                this.minScrollY = 0;

            } else if (this.y < 5 && pullDownEl.className.match('flip')) {

                pullDownEl.className = '';

                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';

                this.minScrollY = -pullDownOffset;

            } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {

                pullUpEl.className = 'flip';

                pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';

                this.maxScrollY = this.maxScrollY;

            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {

                pullUpEl.className = '';

                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';

                this.maxScrollY = pullUpOffset;

            }

        },

        onScrollEnd: function () {

            if (pullDownEl.className.match('flip')) {

                pullDownEl.className = 'loading';

                pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';                

                pullDownAction();   // ajax call

            } else if (pullUpEl.className.match('flip')) {

                pullUpEl.className = 'loading';

                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';                

                pullUpAction(); // ajax call

            }

        }

    });

     

    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);

}

 

//初始化绑定iScroll控件 

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', loaded, false);