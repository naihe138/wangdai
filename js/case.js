$(function(){
	function init(){
		nav.init();
		banner.init();
		
	}
	//导航跳转
	var nav = (function(){
		var head = $('#head');
		var nav = head.find(".nav");
		var aLi = nav.find("li");
		function bind(){
			aLi.on("click", function(){
				var id = $(this).attr("data-id");
				var _href = 'index.html#'+id;
				window.location.href = _href;
			})
		}
		return {
			init:bind
		}
	})()
	
	//banner轮播图
	var banner = (function(){
		var banner = $("#banner");
		var wrap = banner.find(".wrap");
		var bannerShow = banner.find(".bannerShow");
		var aLi = bannerShow.find("li");
		var bannerBtn = banner.find(".bannerBtn");
		var aBtn = bannerBtn.find('span');
		var iNow = 0;
		var prev = 0;
		var timer = null;
		var arrColor = ["#F6554B", "#FE8E04","#FF8901","#C79D13","#D1A044"];
		function init(){
			banner.css("background", arrColor[0]);
			bind();
			auto();
		}
		function bind(){
			aBtn.on('mouseover',function(ev){
				prev = iNow;
				iNow = $(this).index();
				if(prev == iNow){
					return false;
				}
				tab();
				
			});
			wrap.on('mouseenter', function(){
				clearInterval(timer);
			})
			wrap.on('mouseleave', function(){
				auto();
			})
			
		}
		function auto(){
			timer = setInterval(function(){
				prev = iNow;
				iNow++;
				if( iNow > aLi.length-1 ){
					iNow=0;
				}
				tab();
			},4000);
		}
		function tab(){
			aLi.eq(prev).stop().animate({opacity:0},500);
			aLi.eq(iNow).stop().animate({opacity:1},500);
			aBtn.eq(prev).removeClass('active');
			aBtn.eq(iNow).addClass('active');
			banner.css("background", arrColor[iNow]);
		}
		
		return {
			init:init
		}
		
	})();
	init();
});
