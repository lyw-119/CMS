<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-type" content="text/html; charset=UTF-8">
<title>首页</title>
<%
	
	pageContext.setAttribute("APP_PATH", request.getContextPath());
	pageContext.setAttribute("userId", request.getParameter("id"));
%>
<!-- 引入JQuery -->
<script type="text/javascript" src="static/js/jquery-1.11.3.min.js"></script>
<!-- 引入样式 -->
<link href="static/bootstrap-3.3.7-dist/css/bootstrap.min.css"
	rel="stylesheet">
<link href="static/bootstrap-3.3.7-dist/css/sb-admin-2.css"
	rel="stylesheet">
<link href="static/bootstrap-3.3.7-dist/css/system.css" rel="stylesheet">
<script src="static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="static/js/system.js"></script>
</head>
<body style="background-color:#6af0f0; height: 100%;width:100%;">
	<!-- 修改密码模态框 -->
	<div class="modal fade" id="editPassword" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">修改密码</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" method="post" id="form1">
						<div class="form-group">
							<label for="password1" class="col-md-3 control-label">旧密码：</label>
							<div class="col-md-5">
								<input type="password" class="form-control" id="password1"
									placeholder="旧密码" name="password1" onblur="checkPw()">
							</div>
							<span id="pw_span" style="color: red"></span>
						</div>
						<div class="form-group">
							<label for="password2" class="col-md-3 control-label">新密码：</label>
							<div class="col-md-5">
								<input type="password" class="form-control" id="password2"
									placeholder="新密码" name="password2" onblur="checkPw1()">
							</div>
							<span id="pw_span1" style="color: red"></span>
						</div>
						<div class="form-group">
							<label for="password3" class="col-md-3 control-label">确认密码：</label>
							<div class="col-md-5">
								<input type="password" class="form-control" id="password3"
									placeholder="确认密码" name="password3" onblur="checkPw2()">
							</div>
							<span id="pw_span2" style="color: red"></span>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" id="pw">保存</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 学生个人资料模态框 -->
	<div class="modal fade" id="mydetails-1" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">个人资料</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" id="Studentform">
						<div class="form-group"></div>
						<div class="form-group">
							<label class="col-md-2 control-label">学号：</label>
							<div class="col-md-4">
								<p class="form-control-static" id="inputStduentId"></p>
							</div>
							<span id="id_span" style="color: red"></span>
						</div>
						<div class="form-group">
							<label for="inputName" class="col-md-2 control-label">姓名：</label>
							<div class="col-md-4">
								<input type="text" class="form-control" id="inputStudentName"
									placeholder="Name" name="name">
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">性别：</label>
							<div class="col-md-4">
								<label class="radio-inline"> <input type="radio" checked
									name="gender" value="M"> 男
								</label> <label class="radio-inline"> <input type="radio"
									name="gender" value="W"> 女
								</label>
							</div>
						</div>
						<div class="form-group">
							<label for="inputEmail" class="col-md-2 control-label">邮箱：</label>
							<div class="col-md-4">
								<input type="email" class="form-control" id="inputStudentEmail"
									placeholder="Email" name="email">
							</div>
						</div>
						<div class="form-group">
							<label for="inputSystem" class="col-md-2 control-label">系别：</label>
							<div class="col-md-4">
								<select class="form-control" id="inputStudentSystem"
									name="system">
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
								<input type="text" class="form-control" id="inputStudentMajor"
									placeholder="Major" name="major">
							</div>
						</div>

					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" id="updateStudent">保存</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 教师个人资料模态框 -->
	<div class="modal fade" id="mydetails-2" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">个人资料</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" method="post" id="Teacherform">
						<div class="form-group"></div>
						<div class="form-group">
							<label for="inputId" class="col-md-2 control-label">工号：</label>
							<div class="col-md-4">
								<p class="form-control-static" id="inputTeacherId"></p>
							</div>
							<span id="id_span" style="color: red"></span>
						</div>
						<div class="form-group">
							<label for="inputName" class="col-md-2 control-label">姓名：</label>
							<div class="col-md-4">
								<input type="text" class="form-control" id="inputTeacherName"
									placeholder="Name" name="name">
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">性别：</label>
							<div class="col-md-4">
								<label class="radio-inline"> <input type="radio" checked
									name="gender" value="M"> 男
								</label> <label class="radio-inline"> <input type="radio"
									name="gender" value="W"> 女
								</label>
							</div>
						</div>
						<div class="form-group">
							<label for="inputEmail" class="col-md-2 control-label">邮箱：</label>
							<div class="col-md-4">
								<input type="email" class="form-control" id="inputTeacherEmail"
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
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" id="updateTeacher">保存</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 管理员个人资料模态框 -->
	<div class="modal fade" id="mydetails-3" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">个人资料</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" id="Managerform">
						<div class="form-group"></div>
						<div class="form-group">
							<label for="inputId" class="col-md-2 control-label">账号：</label>
							<div class="col-md-4">
								<p class="form-control-static" id="inputManagerId" name="id"></p>
							</div>
							<span id="id_span" style="color: red"></span>
						</div>
						<div class="form-group">
							<label for="inputName" class="col-md-2 control-label">姓名：</label>
							<div class="col-md-4">
								<input type="text" class="form-control" id="inputManagerName"
									placeholder="Name" name="name">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" id="updateManager">保存</button>
				</div>
			</div>
		</div>
	</div>
	
	<div id="wrapper">
		<nav class="navbar navbar-default navbar-static-top" role="navigation" style="background-color:#64f2c8;width:100%;margin-bottom:0;">
		<div id="wrapper">
			<div class="col-md-2">
				<a class="navbar-brand" href="${APP_PATH }/FirstPage">CMS课程管理</a>
			</div>
			<div class="col-md-1" style="padding: 7px 0 0 0;width:80px;">
				<select class="form-control" name="select">
					<option value="课程">课程</option>
				</select>
			</div>
			<div class="col-md-4" style="padding: 7px 0 0 0;">
				<div class="input-group">
					<div class="input-group-btn"></div>
					<input type="text" class="form-control" placeholder="课程名称..."
						id="contend"> <span class="input-group-btn">
						<button class="btn btn-default" type="button" id="search">
							<span class="glyphicon glyphicon-search"
								style="padding: 3px 0 3px 0;"></span>
						</button>
					</span>
				</div>
			</div>
			<!-- 导航栏右侧图标部分 -->
			<ul class="nav navbar-top-links navbar-right">
				<!-- 用户信息和系统设置 start -->
				<li class="dropdown"><a class="dropdown-toggle"
					data-toggle="dropdown" id="dropdown1" href="#"></a>
					<ul class="dropdown-menu dropdown-menu-right"
						style="min-width: 50px" aria-labelledby="dropdown1">
						<li><a href="#mydetails-${userType}" data-toggle="modal"><span
								class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;个人资料</a></li>
						<li><a href="#" onclick="system()"><span
								class="glyphicon glyphicon-th-list"></span>&nbsp;&nbsp;我的课程</a></li>
						<li><a href="#editPassword" data-toggle="modal"><span
								class="glyphicon glyphicon-edit"></span>&nbsp;&nbsp;修改密码</a></li>
						<li><a href="${APP_PATH }/logout"><span
								class="glyphicon glyphicon-log-out"></span>&nbsp;&nbsp;退出登录</a></li>
					</ul></li>
				<!-- 用户信息和系统设置结束 -->
			</ul>
		</div>
		</nav>
		<div class="container" style="width:80%;background-color:white;min-height:550px;">
			<div id="all_curriculum_table">
				
			</div>
		</div>
	</div>

	<script type="text/javascript">
		var userType="${userType}";
		var userId="${userId}";
		var APP_PATH="${APP_PATH}";
	</script>


</body>
</html>