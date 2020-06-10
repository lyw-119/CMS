<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
	pageContext.setAttribute("userId", request.getParameter("id"));
	pageContext.setAttribute("cId", request.getParameter("cId"));
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
<script type="text/javascript" src="static/js/Student_curriculum.js"></script>
</head>
<body style="background-color:#6af0f0;width:100%;height:100%">
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
								<input type="text" class="form-control" id="inputStudentMajor" placeholder="Major" name="major">
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
	
	<!-- 上传作业模态框 -->
	<div class="modal fade" id="uploadtask" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">作业上传</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" method="post" id="task_form">
						<div class="form-group">
							<label for="Rname" class="col-md-3 control-label">选择作业次数：</label>
							<div class="col-md-5">
								<select name="rc_id" class="form-control" id="rc_id">
									<option value="">--选择作业次数--</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label for="file" class="col-md-3 control-label">上传作业：</label>
							<div class="col-md-5">
								<input type="file" id="file" name="file">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onclick="savetask()">保存</button>
				</div>
			</div>
		</div>
	</div>
			
	<!-- 添加提问模态框 -->
	<div class="modal fade" id="addProblem" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">添加提问</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" id="Problem-form">
						<input type="hidden" value="${userId }" name="id">
						<input type="hidden" value="${cId }" name="cId">
						<div class="form-group">
							<label for="title" class="col-md-3 control-label">标题：</label>
							<div class="col-md-5">
								<input type="text" class="form-control" id="title"
									placeholder="标题" name="title">
							</div>
						</div>
						<div class="form-group">
							<label for="account" class="col-md-3 control-label">内容：</label>
							<div class="col-md-5">
								<textarea name="account" class="form-control" id="account" placeholder="内容..."></textarea>
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" id="saveProblem">保存</button>
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
		<div class="container" style="width:80%;">
			<div class="row">
				<div class="col-md-10">
					<h3><p id="title"></p></h3>
				</div>
				<div class="col-md-2">
					<p id="name" style="margin-top:20px;padding-right:0;"></p>
				</div>
			</div>
			<div class="row">
				<ul class="nav nav-tabs nav-justified" role="tablist" style="margin-top:10px;">
					<li role="presentation"><a href="#notice" aria-controls="notice" role="tab" data-toggle="tab">教学公告</a></li>
				    <li role="presentation" class="active"><a href="#resources" aria-controls="resources" role="tab" data-toggle="tab">教学资源</a></li>
				    <li role="presentation"><a href="#task" aria-controls="task" role="tab" data-toggle="tab">作业管理</a></li>
				    <li role="presentation"><a href="#student" aria-controls="student" role="tab" data-toggle="tab">学生管理</a></li>
				    <li role="presentation"><a href="#question" aria-controls="question" role="tab" data-toggle="tab">互动交流</a></li>
				</ul>
			
			  <!-- Tab panes -->
			  <div class="tab-content">
				<div role="tabpanel" class="tab-pane" id="notice" style="background-color: white; width: 100%; min-height:550px;">
					<div class="row" style="padding-top:50px;">
						<div class="col-md-2" style="display:table-cell;">
							<ul id="Notice" class="nav nav-pills nav-stacked" role="tablist">
								<li role="presentation" class="active">
									<a href="#all-notice" id="all-notice-tab" role="tab" data-toggle="pill" aria-controls="all-notice" aria-expanded="false">全部公告</a>
								</li>
							</ul>
						</div>
						<div id="NoticeContent" class="tab-content col-md-10" style="display:table-cell;">
							<div role="tabpanel" class="tab-pane fade active in" id="all-notice" aria-labelledby="all-notice-tab">							
							</div>
						</div>
					</div>
				</div>
				<div role="tabpanel" class="tab-pane active" id="resources" style="background-color:white; width:100%;min-height:550px;overflow:auto;">
					<div class="row" style="padding-top:50px;">
						<div class="col-md-2" style="display:table-cell;">
							<ul id="RC" class="nav nav-pills nav-stacked" role="tablist">
								<li role="presentation" class="active">
									<a href="#all" id="all-tab" role="tab" data-toggle="pill" aria-controls="all" aria-expanded="false">全部资源</a>
								</li>
							</ul>
						</div>
						<div id="RCContent" class="tab-content col-md-10" style="display:table-cell;">
							<div role="tabpanel" class="tab-pane fade active in" id="all" aria-labelledby="all-tab">							
							</div>
						</div>
					</div>
				</div>
			    <div role="tabpanel" class="tab-pane" id="task" style="background-color:white; width:100%;min-height:550px;">
			    	<div class="row" style="float:right; margin-right:50px; padding-top:10px;">
						<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#uploadtask">上传作业</button>
					</div>
					<div class="row" style="padding-top:50px;">
						<div class="col-md-2">
							<ul id="Task" class="nav nav-pills nav-stacked" role="tablist">
								<li role="presentation" class="active">
									<a href="#allTask" id="allTask-tab" role="tab" data-toggle="pill" aria-controls="allTask" aria-expanded="false">全部作业</a>
								</li>
							</ul>
						</div>
						<div id="TaskContent" class="tab-content">
							<div role="tabpanel" class="tab-pane fade active in" id="allTask" aria-labelledby="allTask-tab">							
								<div class="col-md-10" style="text-align:center;">
									<table class="table table-hover" id="task_table">
										<thead>
											<tr style="font-weight:bold;">
												<td>
													<input type="checkbox" id="check_task_all"/>
												</td>											
												<td>作业名称</td>
												<td>学号</td>
												<td>作业大小</td>
											</tr>
										</thead>
										<tbody>
											
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
			    </div>
			    <div role="tabpanel" class="tab-pane" id="student" style="background-color:white; width:100%;min-height:550px;">
					<div class="row" style="padding-top:50px;">
						<div class="col-md-2">
							<ul id="ClazzManager" class="nav nav-pills nav-stacked" role="tablist">
								<li role="presentation" class="active">
									<a href="#allStudent" id="allStudent-tab" role="tab" data-toggle="pill" aria-controls="allStudent" aria-expanded="false">全部学生</a>
								</li>
							</ul>
						</div>
						<div id="ClazzContent" class="tab-content">
							<div role="tabpanel" class="tab-pane fade active in" id="allStudent" aria-labelledby="allStudent-tab">							
								<div class="col-md-10">
									<table class="table table-hover" id="students_table">
										<thead>
											<tr>
												<th>
													<input type="checkbox" id="check_all"/>
												</th>											
												<th>学号</th>
												<th>姓名</th>
												
											</tr>
										</thead>
										<tbody>
											
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
			    </div>
			    <div role="tabpanel" class="tab-pane" id="question" style="background-color:white; width:100%;min-height:550px;">
			    	<div class="row" style="float:right; margin-right:50px; padding-top:10px;" id="problem-button">
						<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addProblem">添加</button>
					</div>
					<div class="row" style="padding-top:50px;">
						<div class="col-md-2" style="display:table-cell;">
							<ul id="Notice" class="nav nav-pills nav-stacked" role="tablist">
								<li role="presentation" class="active">
									<a href="#all-problem" id="all-problem-tab" role="tab" data-toggle="pill" aria-controls="all-problem" aria-expanded="false">所有提问</a>
								</li>
								<li role="presentation">
									<a href="#my-problem" id="my-problem-tab" role="tab" data-toggle="pill" aria-controls="my-problem" aria-expanded="false">我的提问</a>
								</li>
							</ul>
						</div>
						<div id="NoticeContent" class="tab-content col-md-10" style="display:table-cell;">
							<div role="tabpanel" class="tab-pane fade active in" id="all-problem" aria-labelledby="all-problem-tab">
								<div id="Allproblems"></div>
							</div>
							<div role="tabpanel" class="tab-pane fade" id="my-problem" aria-labelledby="my-problem-tab">
								<div id="problems"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
<script type="text/javascript">
var userType="${userType}";
var userId="${userId}";
var APP_PATH="${APP_PATH}";
var cId="${cId}";
</script>
</body>
</html>