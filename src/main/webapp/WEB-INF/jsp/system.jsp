<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-type" content="text/html; charset=UTF-8">
<title>主页</title>
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
<body style="background-color:#6af0f0;">
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
				<a class="navbar-brand" href="${APP_PATH }/FirstPage?id=${userId}">CMS课程管理</a>
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
						<li><a href="#editPassword" data-toggle="modal"><span
								class="glyphicon glyphicon-edit"></span>&nbsp;&nbsp;修改密码</a></li>
						<li><a href="${APP_PATH }/logout"><span
								class="glyphicon glyphicon-log-out"></span>&nbsp;&nbsp;退出登录</a></li>
					</ul></li>
				<!-- 用户信息和系统设置结束 -->
			</ul>
		</div>
		</nav>
		<div class="container" style="width:100%;">
			<c:if test="${userType==3}">
				<div id="wrapper">
					<div class="navbar-default sidebar" role="navigation"
						style="margin: 0 0 0 0;background-color:#6af0f0">
						<div class="sidebar-nav navbar-collapse">
							<ul class="nav nav-pills nav-stacked" id="side-menu"
								role="tablist">
								<li role="presentation" class="active"><a href="#page-a"
									role="tab" data-toggle="pill">学生列表</a></li>
								<li role="presentation"><a href="#page-wrapper" role="tab"
									data-toggle="pill">教师列表</a></li>
							</ul>
						</div>
					</div>
					<div class="tab-content">
						<div id="page-a" class="tab-pane active">
							<div class="row">
								<div class="col-lg-12">
									<h1 class="page-header">学生管理</h1>
								</div>
								<!-- /.col-lg-12 -->
							</div>
							<!-- /.row -->
							<div class="panel panel-default">
								<div class="panel-body">
									<form class="form-inline" method="get" id="studentselect">
										<div class="form-group">
											<label for="searchforStudent">根据</label> <select
												class="form-control" id="searchforStudent"
												name="searchforStudent">
												<option value="s_id">学号</option>
												<option value="name">姓名</option>
												<option value="system">院系</option>
												<option value="major">专业</option>
											</select>
										</div>
										<div class="form-group">
											<input type="text" class="form-control" id="inputStudent"
												name="inputStudent" />
										</div>
										<button type="button" class="btn btn-primary" id="selectStudent">查询</button>
										<button type="button" class="btn btn-primary" id="backStudent">返回</button>
									</form>
								</div>
							</div>
							<div class="row">
								<div class="col-lg-12">
									<div class="panel panel-default" style="text-align: center;">
										<div class="panel-heading">学生信息列表</div>
										<!-- /.panel-heading -->
										<table class="table table-bordered table-striped"
											id="student_table">
											<thead>
												<tr>
													<td>学号</td>
													<td>姓名</td>
													<td>性别</td>
													<td>邮箱</td>
													<td>院系</td>
													<td>专业</td>
													<td>操作</td>
												</tr>
											</thead>
											<tbody>
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div class="row">
								<!-- 分页文字信息 -->
								<div class="col-md-6" id="page_info_area"></div>
								<!-- 分页条信息 -->
								<div class="col-md-6" id="page_nav_area"></div>
							</div>
						</div>
						<!-- 干事列表查询部分  start-->
						<div id="page-wrapper" class="tab-pane">
							<div class="row">
								<div class="col-lg-12">
									<h1 class="page-header">教师管理</h1>
								</div>
								<!-- /.col-lg-12 -->
							</div>
							<!-- /.row -->
							<div class="panel panel-default">
								<div class="panel-body">
									<form class="form-inline" method="get">
										<div class="form-group">
											<label for="selectforTeacher">根据</label> <select
												class="form-control" id="selectforTeacher"
												name="selectforTeacher">
												<option value="t_id">工号</option>
												<option value="name">姓名</option>
												<option value="system">院系</option>
											</select>
										</div>
										<div class="form-group">
											<input type="text" class="form-control" id="inputTeacher"
												name="inputTeacher" />
										</div>
										<button type="button" class="btn btn-primary" id="selectTeacher">查询</button>
										<button type="button" class="btn btn-primary" id="backTeacher">返回</button>
									</form>
								</div>
							</div>
							<div class="row">
								<div class="col-lg-12">
									<div class="panel panel-default"  style="text-align: center;">
										<div class="panel-heading">教师信息列表</div>
										<!-- /.panel-heading -->
										<table class="table table-bordered table-striped"
											id="teacher_table">
											<thead>
												<tr>
													<td>工号</td>
													<td>姓名</td>
													<td>性别</td>
													<td>邮箱</td>
													<td>院系</td>
													<td>操作</td>
												</tr>
											</thead>
											<tbody>

											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div class="row">
								<!-- 分页文字信息 -->
								<div class="col-md-6" id="page_info_area1"></div>
								<!-- 分页条信息 -->
								<div class="col-md-6" id="page_nav_area1"></div>
							</div>
						</div>
					</div>
				</div>
			</c:if>
		</div>
		<div class="container" style="width:70%">
			<c:if test="${userType==1}">
				<ul class="nav nav-tabs nav-justified" role="tablist" style="margin-top:10px;">
				    <li role="presentation" class="active"><a href="#study" aria-controls="home" role="tab" data-toggle="tab">学习的课程LEARNING</a></li>
				    <li role="presentation"><a href="#notice" aria-controls="settings" role="tab" data-toggle="tab">课程的动态NEWS</a></li>
				</ul>
			
			  <!-- Tab panes -->
			  <div class="tab-content">
			    <div role="tabpanel" class="tab-pane active" id="study" style="background-color:white; width:100%;height:550px;">
					<div id="student_curriculum_table" style="background-color:white;"></div>
				</div>
			    <div role="tabpanel" class="tab-pane" id="notice" style="background-color:white; width:100%;height:550px;">
			    	<div class="row" style="padding-top:10px;">
						<div class="col-md-2">
							<ul id="Notice" class="nav nav-pills nav-stacked" role="tablist" style="height: 550px;">
								<li role="presentation" class="active">
									<a href="#all-notice-student" id="all-notice-student-tab" role="tab" data-toggle="pill" aria-controls="all-notice-student" aria-expanded="false">全部公告</a>
								</li>
							</ul>
						</div>
						<div id="NoticeContent" class="tab-content">
							<div role="tabpanel" class="tab-pane fade active in" id="all-notice-student" aria-labelledby="all-notice-student-tab">							
							</div>
						</div>
					</div>
			    </div>
			</c:if>
			<c:if test="${userType==2}">
				<ul class="nav nav-tabs nav-justified" role="tablist" style="margin-top:10px;">
				    <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">创建的课程CREATED</a></li>
				    <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">管理的课程ASSIST</a></li>
				    <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">课程的动态NEWS</a></li>
				    <li role="presentation"><a href="#creat" aria-controls="creat" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-plus-sign" style="height:19px;"></span></a></li>
				</ul>
			
			  <!-- Tab panes -->
			  <div class="tab-content">
			    <div role="tabpanel" class="tab-pane active" id="home" style="background-color:white; width:100%;height:550px;">
					<div id="curriculum_table" style="background-color:white;"></div>
				</div>
			    <div role="tabpanel" class="tab-pane" id="profile" style="background-color:white; width:100%;height:550px;">
			    	<div id="curriculum_table1" style="background-color:white;"></div>
			    </div>
			    <div role="tabpanel" class="tab-pane" id="settings" style="background-color:white; width:100%;height:550px;">
					<div class="row" style="padding-top:10px;">
						<div class="col-md-2">
							<ul id="Notice" class="nav nav-pills nav-stacked" role="tablist" style="height: 550px;">
								<li role="presentation" class="active">
									<a href="#all-notice" id="all-notice-tab" role="tab" data-toggle="pill" aria-controls="all-notice" aria-expanded="false">全部公告</a>
								</li>
							</ul>
						</div>
						<div id="NoticeContent" class="tab-content">
							<div role="tabpanel" class="tab-pane fade active in" id="all-notice" aria-labelledby="all-notice-tab">							
							</div>
						</div>
					</div>
			    </div>
			    <div role="tabpanel" class="tab-pane" id="creat" style="background-color:white; width:100%;height:550px;">
					<div style="margin-bottom: 20px; padding-left:20px;">
						<form class="form-horizontal" enctype="multipart/form-data" id="creatform" method="post" name="creatCurriculem">
							<div class="form-group"></div>
							<div class="form-group">								
								<label class="col-md-2 control-label">
									<span style="color: #f00">*&nbsp;</span>课程编号： 
								</label>
								<div class="col-md-4">
									<input id="creat_id" class="form-control" type="text" name="cId" onchange="isCoursenameExist(this.value)">
								</div>
								<span id="Check" style="color: rgb(170, 170, 170); display: inline;">课程编号由4-8个字符组成！</span>
								<span id="Format" style="color: #f00; display: none;">请输入字母或数字且字母开头！</span>
								<span id="Checklen" style="color: rgb(255, 0, 0); display: none;">请输入大于4个字符且少于8个字符</span>
								<span id="showIsExist" style="color: #f00; display: none;">该课程编号已存在，请重新填写</span>
								<span id="showIsExist1" style="color: #aaa; display: none;">这个课程编号可以使用</span>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">
									<span style="color: #f00">*&nbsp;</span>课程名称： 
								</label>
								<div class="col-md-4">
									<input type="text" class="form-control" id="creat_name" name="name"> 
								</div>
								<span style="color: #aaa">课程名称由1-40个字符组成！</span> 
							</div>
							<div class="form-group">															
								<label class="col-md-2 control-label">
									<span style="color: #f00">*&nbsp;</span>院系门类：
								</label>
								<div class="col-md-4">
									<select name="system" class="form-control">
										<option value="">--选择院系类别--</option>
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
								<label class="col-md-2 control-label">
									<span style="color: #f00">*&nbsp;</span>课程专业：
								</label>
								<div class="col-md-4">
									<input type="text" class="form-control" id="creat_major" name="major">
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">&nbsp;课程简介：</label>
								<div class="col-md-6">
									<textarea name="account" class="form-control" id="creat_account" placeholder="简单介绍下本门课程吧..."></textarea>
								</div>
							</div>
							<div class="form-group">								
								<label class="col-md-2 control-label">
									<span style="color: #f00">*&nbsp;</span>课程学分：
								</label>
								<div class="col-md-4">
									<input type="text" class="form-control" name="credit" id="creat_credit">
								</div>
								<span style="color: #aaa">课程学分为1-4分</span>
							</div>
							<div class="form-group">
							    <label class="col-md-2 control-label">课程封面图：</label>
							    <input type="hidden" name="picName" value="" id="photo">
							    <input type="file" id="file" name="file" onchange ="uploadFile()">
							    <div id="localImag">
									<img id="preview" style="margin-top: 20px; margin-left: 124px; display: none" src="" width="120px" height="120px">
								</div>
							</div>
							<div class="form-group">
								<button type="button" class="btn btn-primary" id="creat_btn" style="margin-left:300px;">创建</button>
								<span style="color: #aaa">(课程创建完成后，老师可以要求学生搜索该课程，并且申请加入，学习该课程)</span>
							</div>
							<br>
						</form>
					</div>
				</div>
			  </div>
			</c:if>		
		</div>
	</div>

	<script type="text/javascript">
		var userType="${userType}";
		var userId="${userId}";
		var APP_PATH="${APP_PATH}";
	</script>


</body>
</html>