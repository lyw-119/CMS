<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>登录</title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>
<!-- 引入JQuery -->
<script type="text/javascript" src="static/js/jquery-1.11.3.min.js"></script>
<!-- 引入样式 -->
<link href="static/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
<script src="static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
</head>
<body>
	<div class="container" style="position:fixed; left:0px; top:0px; width:100%; height:100%;background-image:url(image/background.jpg);background-size:100% 100%;background-repeat:no-repeat;">
		<div class="row">
			<div class="col-md-12 col-md-offset-7">
				<h1>登录</h1>
			</div>
		</div>
		<div class="row">
			<div class="col-md-offset-6">
			<form class="form-horizontal" method="post" id="form">
			  <div class="form-group">
			    <label for="inputId" class="col-md-2 control-label">账号：</label>
			    <div class="col-md-4">
			      <input type="text" class="form-control" id="inputId" placeholder="Id" name="id">
			    </div>
			  </div>
			  <div class="form-group">
			    <label for="inputPassword" class="col-md-2 control-label">密码：</label>
			    <div class="col-md-4">
			      <input type="password" class="form-control" id="inputPassword" placeholder="Password" name="password">
			    </div>
			  </div>
			  <div class="form-group">
			    <label for="code" class="col-md-2 control-label">验证码：</label>
			    <div class="col-md-4">
			      <input type="text" class="form-control" id="code" placeholder="验证码" size="10" onblur="checkCode()" name="code">
			      <img id="captchaImg" style="cursor: pointer" onclick="changeCaptcha()" title="看不清楚?请点击刷新验证码!" align='absmiddle' src="${APP_PATH }/captchaServlet" height="18" width="55">
			      <a href="javascript:;" onClick="changeCaptcha()" style="color: #666;">看不清楚</a> <span id="code_span" style="color: red"></span>
			    </div>
			  </div>
			  <div clas="form-group">
			  	<div class="col-md-offset-2 col-md-4">
				  	<label class="radio-inline">
					  <input type="radio" checked name="type" id="inlineRadio1" value="1"> 学生
					</label>
					<label class="radio-inline">
					  <input type="radio" name="type" id="inlineRadio2" value="2"> 教师
					</label>
					<label class="radio-inline">
					  <input type="radio" name="type" id="inlineRadio3" value="3"> 管理员
					</label>
				</div>
			  </div>
			  <div class="form-group">
			    <div class="col-md-offset-4 col-md-4">
			      <button type="button" class="btn btn-default" id="submitBtn">登录</button>
			      <button class="btn btn-default" id="registerBtn">注册</button>
			    </div>
			  </div>
			</form>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		//更换验证码
	    function changeCaptcha() {
	        $("#captchaImg").attr('src', '${APP_PATH }/captchaServlet?t=' + (new Date().getTime()));
	    }
	
	    //验证码校验
	    var flag_c = false;
	    function checkCode() {
	        var code = $("#code").val();
	        code = code.replace(/^\s+|\s+$/g,"");
	        if(code == ""){
	            $("#code_span").text("请输入验证码！").css("color","red");
	            flag_c = false;
	        }else{
	            $.ajax({
	                type: 'post',
	                url: '${APP_PATH}/checkCode',
	                data: {"code": code},
	                dataType: 'json',
	                success: function (data) {
	                	console.log(data);
	                    var val = data['message'];
	                    if (val == "success") {
	                        $("#code_span").addClass("glyphicon glyphicon-ok").css("color","green");
	                        $("#code_span").text("");
	                        flag_c = true;
	                    }else {
	                        $("#code_span").text("验证码错误！").css("color","red");
	                        flag_c = false;
	                    }
	                }
	            });
	
	        }
	        return flag_c;
	    }
	   $(function(){
	    	$("#submitBtn").click(function(){
				var data = $("#form").serialize();
				
				$.ajax({
					type: "post",
					url: "logincheck",
					data: data, 
					dataType: "json", //返回数据类型
					success: function(result){
						if("success" == result.type){
							window.parent.location.href = "system?userType="+$("input:radio[name='type']:checked").val()+"&id="+$("#inputId").val();
						} else{
							alert(result.msg);
							$("#captchaImg").click();//切换验证码
							$("input[name='code']").val("");//清空验证码输入框
							$("#code_span").removeClass("glyphicon glyphicon-ok");
							$("#code_span").text("");
						} 
					}
					
				});
			});
	    	$("#registerBtn").click(function(){
	    		window.open("${APP_PATH}/register");
	    	});
	    });
	</script>
</body>
</html>