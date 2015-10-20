$(function(){
	function init(){
		nav.init();
		banner.init();
		contact.init();
	}
	//导航跳转
	var nav = (function(){
		var head = $('#head');
		var nav = head.find(".nav");
		var aLi = nav.find("li");
		function bind(){
			aLi.on("click", function(){
				var id = $(this).attr("data-id");
				$("html,body").animate({scrollTop: $("#"+id).offset().top}, 500); //一秒跳转到该ID的位置
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
		function init(){
			banner.css("background", aLi.eq(0).attr("data-color"));
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
			console.log(aLi.eq(iNow).attr("data-color"));
			banner.css("background", aLi.eq(iNow).attr("data-color"));
		}
		
		return {
			init:init
		}
		
	})();
	//news新闻展示
	
	var contact = (function(){
		var sub = $("#sub");
		function submit(){
			sub.on("click", function(){
				var name = $("#name").val();
				var tel = $("#tel").val();
				var mail = $("#mail").val();
				var regEmail = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
				
				if( name == "" ){
					alert("请填写你您的姓名！");
					return false;
				}
				if( tel == "" ){
					alert("请填写你您的电话！");
					return false;
				}
				if( mail == "" ){
					alert("请填写你您的邮箱！");
					return false;
				}
				if( !regEmail.test(mail) ){
					alert("请填写你您的正确的邮箱地址！");
					return false;
				}
				//提交表单~~~~~~~·
				
			})
			
			
		}
		return {
			init:submit
		}
	})();
	
	init();
});
