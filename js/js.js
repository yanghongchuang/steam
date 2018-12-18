//steam轮播图
function fn(data){
	console.log(data)
	var index=0;
	for(var i=0;i<data.length;i++){
		var yd=$("<span></span>")
		yd.attr("index",i)
		$(".yuandian").append(yd)
		//克隆模板
		var tem= $("#tem").clone(true);
		//去掉id  id唯一
		tem.attr("id","");
		// 将克隆的东西插入
		$("#wrap").append(tem);
		tem.find(".name").html(data[i].name);
		//价格
		tem.find(".price1").html("￥"+data[i].price);
		tem.find(".price2").html(data[i].discount*100+"%");
		tem.find(".price3").html("￥"+data[i].originPrice);
		//添加图片
		tem.find(".left").find("img").attr("src",data[i].imgUrl[0])
		for(var j=0;j<data[i].imgUrl.length;j++){
			tem.find("#ul").find("img").eq(j).attr("src",data[i].imgUrl[j])
		}
		if(data[i].discount==0){
			tem.find(".price2").css({display:"none"})
			tem.find(".price3").css({display:"none"})
		}
		tem.find(".box2").find("h4").html(data[i].name)
		tem.find(".box2").find(".fx").html("发行于："+data[i].date.replace("-", "年").replace("-", "月")+"日")
		for(var j=0;j<data[i].imgUrl.length;j++){
			tem.find(".box2").find(".imgw").find("img").eq(j).attr("src",data[i].imgUrl[j])
		}
		for(var k=0;k<data[i].label.length;k++){
			var span=$("<span></span>")
			tem.find(".bq").append(span)
			span.html(data[i].label[k])
		}
		//显示第一个
		tem.find(".left").find("img").fadeIn()
		$(".yuandian span").eq(0).css({"background-color":"#eee"})
		//鼠标移上
		$("#ul img").mouseover(function(){
			 $(this).closest("#ul").siblings(".left").find("img").attr("src",$(this)[0].src)
		})
		//鼠标移出
		$("#ul img").mouseout(function(){
			var imurl=$(this).closest("#ul").find("img").eq(0).attr("src");
			$(this).closest("#ul").siblings(".left").find("img").attr("src",imurl)
		})
		yd.click(function(){
		index=parseInt($(this).attr("index"))
		$("#wrap .yc").fadeOut();
		$("#wrap .yc").eq(index+1).fadeIn()
		$(".yuandian span").css({"background-color":"#666"})
		$(".yuandian span").eq(index).css({"background-color":"#eee"})
		})
	}
			
	var ll=$("#wrap .yc").length
	$("#wrap .yc").eq(index+1).addClass("open")
	//点击事件
	$(".next").click(function(){
		$("#wrap .yc").fadeOut();
		index++;
		if(index>6){
			index=0;
		}
		$("#wrap .yc").eq(index+1).fadeIn()
		$(".yuandian span").css({"background-color":"#666"})
		$(".yuandian span").eq(index).css({"background-color":"#eee"})
	})
	$(".prev").click(function(){
		$("#wrap .yc").fadeOut();
		index--;
			if(index<0){
				index=6;
			}
		$("#wrap .yc").eq(index+1).fadeIn()
		$(".yuandian span").css({"background-color":"#666"})
		$(".yuandian span").eq(index).css({"background-color":"#eee"})
	})
	$(".dw").mouseenter(function(){
			var n=0;
				$(".box").css({"display":"block"})
				$(".dw").find(".box img").hide()
				$(this).find(".box img").eq(0).show();
				dw=$(this);
				autoplay=setInterval(function(){
				$(".dw").find(".box img").hide()
				if(n<dw.find(".box img").length-1){
					dw.find(".box2").find(".imgw").find("img").eq(++n).show();
				}else{
					n=0;
					dw.find(".box2").find(".imgw").find("img").eq(n).show();
				}
			},500)
		})
		$(".dw").mouseleave(function(){
			$(".box").css({"display":"none"})
			$(".box img").hide();
			clearInterval(autoplay)
			n=0;
		})
	//cookie
	$(".yc").click(function(){//点击获取localStorage的value
		name=$(this).find(".name").html()
		if(localStorage.getItem("gamename")){
			localStorage.setItem("gamename",localStorage.getItem("gamename")+","+name)
		}else{
			localStorage.setItem("gamename",name)
		}
	})
		//处理字符串
		var newlocalStoragelist=[];
		var localStoragelist=localStorage.getItem("gamename");
			if(localStoragelist){
				localStoragelist=localStoragelist.split(",");
				for(var i=0;i<localStoragelist.length;i++){
				if(newlocalStoragelist.indexOf(localStoragelist[i])==-1){
				newlocalStoragelist.push(localStoragelist[i])
				}		
			}	
		}
		//动态添加最近查看及内容
		for( var i=0;i<newlocalStoragelist.length;i++){
				var a=$("<a></a>")
				a.addClass("gutter_item")
				a.html(newlocalStoragelist[i])
				$(".gutter_items2").append(a)
		}
}