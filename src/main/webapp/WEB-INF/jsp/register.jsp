<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>注册</title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>
<!-- 引入JQuery -->
<script type="text/javascript" src="static/js/jquery-1.11.3.min.js"></script>
<!-- 引入样式 -->
<link href="static/bootstrap-3.3.7-dist/css/bootstrap.min.css"
	rel="stylesheet">
<script src="static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-md-12 col-md-offset-5">
				<h1>注册</h1>
			</div>
		</div>
		<div class="row">
			<div>
				<!-- Nav tabs -->
				<ul class="nav nav-tabs nav-justified" role="tablist">
					<li role="presentation" class="active"><a href="#student"
						aria-controls="student" role="tab" data-toggle="tab">学生注册</a></li>
					<li role="presentation"><a href="#teacher"
						aria-controls="teacher" role="tab" data-toggle="tab">老师注册</a></li>
				</ul>
			</div>
			<!-- Tab panes -->
			<div class="tab-content">
				<div role="tabpanel" class="tab-pane active" id="student">
					<div class="row">
						<div class="col-md-offset-4">
							<form class="form-horizontal" method="post" id="form1">
								<div class="form-group"></div>
								<div class="form-group">
									<label for="inputId" class="col-md-2 control-label">学号：</label>
									<div class="col-md-4">
										<input type="text" class="form-control" id="inputId"
											placeholder="Id" name="id" onblur="checkId()">
									</div>
									<span id="id_span" style="color: red"></span>
								</div>
								<div class="form-group">
									<label for="inputName" class="col-md-2 control-label">姓名：</label>
									<div class="col-md-4">
										<input type="text" class="form-control" id="inputName"
											placeholder="Name" name="name">
									</div>
								</div>
								<div class="form-group">
									<label for="inputPassword" class="col-md-2 control-label">密码：</label>
									<div class="col-md-4">
										<input type="password" class="form-control" id="inputPassword"
											placeholder="Password" name="password">
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-2 control-label">性别：</label>
									<div class="col-md-4">
										<label class="radio-inline"> <input type="radio"checked name="gender" value="M"> 男
										</label> 
										<label class="radio-inline"> <input type="radio" name="gender" value="W"> 女
										</label>
									</div>
								</div>
								<div class="form-group">
									<label for="inputEmail" class="col-md-2 control-label">邮箱：</label>
									<div class="col-md-4">
										<input type="email" class="form-control" id="inputEmail"
											placeholder="Email" name="email">
									</div>
								</div>
								<div class="form-group">
									<label for="inputSystem" class="col-md-2 control-label">系别：</label>
									<div class="col-md-4">
										<select class="form-control" id="inputSystem" name="system">
											<option value="计算机系">计算机系</option>
											<option value="软件系">软件系</option>
											<option value="数码媒体系">数码媒体系</option>
											<option value="网络系">网络系</option>
											<option value="电子系">电子系</option>
											<option value="管理系">管理系</option>
											<option value="财会系">财会系</option>
											<option value="外语系">外语系</option>
											<option value="国贸系">国贸系</option>
											<option value="游戏系">游戏系</option>
										</select>
									</div>
								</div>
								<div class="form-group">
									<label for="inputMajor" class="col-md-2 control-label">专业：</label>
									<div class="col-md-4">
										<input type="text" class="form-control" id="inputMajor"
											placeholder="Major" name="major">
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-4 col-md-offset-5">
										<button type="button" class="btn btn-default" id="registerBtn">注册</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div role="tabpanel" class="tab-pane" id="teacher">
					<div class="row">
						<div class="col-md-offset-4">
							<form class="form-horizontal" method="post" id="form2">
								<div class="form-group"></div>
								<div class="form-group">
									<label for="inputtId" class="col-md-2 control-label">工号：</label>
									<div class="col-md-4">
										<input type="text" class="form-control" id="inputtId"
											placeholder="Id" name="id" onblur="checktid()">
									</div>
									<span id="tid_span" style="color: red"></span>
								</div>
								<div class="form-group">
									<label for="inputName" class="col-md-2 control-label">姓名：</label>
									<div class="col-md-4">
										<input type="text" class="form-control" id="inputName"
											placeholder="Name" name="name">
									</div>
								</div>
								<div class="form-group">
									<label for="inputPassword" class="col-md-2 control-label">密码：</label>
									<div class="col-md-4">
										<input type="password" class="form-control" id="inputPassword"
											placeholder="Password" name="password">
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-2 control-label">性别：</label>
									<div class="col-md-4">
										<label class="radio-inline"> <input type="radio"checked name="gender" value="M"> 男
										</label> 
										<label class="radio-inline"> <input type="radio" name="gender" value="W"> 女
										</label>
									</div>
								</div>
								<div class="form-group">
									<label for="inputEmail" class="col-md-2 control-label">邮箱：</label>
									<div class="col-md-4">
										<input type="email" class="form-control" id="inputEmail"
											placeholder="Email" name="email">
									</div>
								</div>
								<div class="form-group">
									<label for="inputSystem" class="col-md-2 control-label">系别：</label>
									<div class="col-md-4">
										<select class="form-control" id="inputSystem" name="system">
											<option value="计算机系">计算机系</option>
											<option value="软件系">软件系</option>
											<option value="数码媒体系">数码媒体系</option>
											<option value="网络系">网络系</option>
											<option value="电子系">电子系</option>
											<option value="管理系">管理系</option>
											<option value="财会系">财会系</option>
											<option value="外语系">外语系</option>
											<option value="国贸系">国贸系</option>
											<option value="游戏系">游戏系</option>
										</select>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-4 col-md-offset-5">
										<button type="button" class="btn btn-default" id="registerBtn2">注册</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript">
			var flag_c = false;
			function checkId() {
				var id = $("#inputId").val();
				if (id == "") {
					$("#id_span").text("请输入学号！").css("color", "red");
					flag_c = false;
				} else {
					$.ajax({
						type :"POST",
						url : "${APP_PATH}/checkId",
						data : {
							"id" : id
						},
						success : function(data) {
							console.log(data);
							var val = data['type'];
							if (val == "success") {
								$("#id_span").addClass("glyphicon glyphicon-ok").css("color", "green");
								$("#id_span").text("");
								flag_c = true;
							} else {
								$("#id_span").removeClass("glyphicon glyphicon-ok");
								$("#id_span").text("该用户已存在！").css("color","red");
								flag_c = false;
							}
						}
					});
				}
				return flag_c;
			}
			function checktid() {
				var id = $("#inputtId").val();
				if (id == "") {
					$("#tid_span").text("请输入工号！").css("color", "red");
					flag_c = false;
				} else {
					$.ajax({
						type : "post",
						url : "${APP_PATH}/checktId",
						data : {
							"id" : id
						},
						success : function(data) {
							var val = data['type'];
							if (val == "success") {
								$("#tid_span").addClass("glyphicon glyphicon-ok").css("color", "green");
								$("#tid_span").text("");
								flag_c = true;
							} else {
								$("#tid_span").removeClass("glyphicon glyphicon-ok");
								$("#tid_span").text("该用户已存在！").css("color","red");
								flag_c = false;
							}
						}
					});
				}
				return flag_c;
			}
			
			$(function(){
				$("#registerBtn").click(function(){
					var data = $("#form1").serialize();
					$.ajax({
						type: "post",
						url: "${APP_PATH}/registerStudent",
						data: data, 
						success: function(data){
							if("success" == data.type){
								window.parent.location.href = "login";
							}else{
								alert(data.msg);
							}
						}
						
					});
				});
				$("#registerBtn2").click(function(){
					var data = $("#form2").serialize();
					$.ajax({
						type: "post",
						url: "${APP_PATH}/registerTeacher",
						data: data, 
						success: function(data){
							if("success" == data.type){
								window.parent.location.href = "login";
							}else{
								alert(data.msg);
							}
						}
						
					});
				});
			}); 
		</script>
</body>
</html>