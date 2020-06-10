	$(function(){
		//获取个人资料
		$.ajax({
			url:APP_PATH+"/getuser",
			data:{
				"type":userType,
				"id":userId
			},
			type:"GET",
			success : function(result) {
				var user=result.extend.user;
				$("#dropdown1").text(user.name);
				$("#name").text("欢迎您，"+user.name+"学生");
				$("<span></span>").addClass("caret").appendTo("#dropdown1");
				if(userType==1){
					$("#inputStduentId").text(user.id);
					$("#inputStudentName").val(user.name);
					$("#mydetails-1 input[name='gender']").val([user.gender]);
					$("#inputStudentEmail").val(user.email);
					$("#mydetails-1 select").val([user.system]);
					$("#inputStudentMajor").val(user.major);
				}
			}
		});
		//获取学生课程班级
		$.ajax({
			url:APP_PATH+"/getClazzByStudent",
			data:{
				"cId":cId,
				"sId":userId
			},
			type:"GET",
			success : function(result){
				console.log(result.extend.clId);
				var clId=result.extend.clId;
				$.ajax({
					url:APP_PATH+"/getTask_category",
					data:"clId="+clId,
					type:"GET",
					success:function(result1){
						console.log(result1.extend.task_category);
						var task_category=result1.extend.task_category;
						$.each(task_category,function(index, item) {
							$("<option value='"+item.id+"'></option>").append(item.name).appendTo("#rc_id");
						});
					}
				})
			}
		});
		
		
		//获取课程名称
		$.ajax({
			url:APP_PATH+"/getcurriculum",
			data:"cId="+cId,
			type:"GET",
			success : function(result) {
				var cur=result.extend.curr;
				document.title=cur.name;
				$("#title").text(cur.name);
			}
		});
		//遍历全部资源类型
		ALLRC();
		//遍历全部资源
		ALLResources();
		//遍历全部班级
		ALLClazz();
		//遍历全部学生
		ALLStudent();
		//遍历全部作业
		ALLTask();
		//获取公告
		getNotice();
		//获取问题列表
		getAllProblem(cId);
		getMyProblem(cId,userId);
	})
	//获取密码，并进行比较
	var flag_c = false;
	function checkPw() {
		var pw1 = $("#password1").val();
		$.ajax({
			url:APP_PATH+"/getuser",
			data:{
				"type":userType,
				"id":userId
			},
			type:"GET",
			success : function(result) {
				var user=result.extend.user;
				var pw2=user.password;
				if (pw1!=pw2) {
					$("#pw_span").removeClass("glyphicon glyphicon-ok");
					$("#pw_span").text("旧密码不正确").css("color", "red");
				} else {
					$("#pw_span").addClass("glyphicon glyphicon-ok").css("color", "green");
					$("#pw_span").text("");						
				}
			}
		});
	
	}
	function checkPw1() {
		var pw1 = $("#password1").val();
		var pw2 = $("#password2").val();
		if (pw1==pw2) {
			$("#pw_span1").removeClass("glyphicon glyphicon-ok");
			$("#pw_span1").text("新密码不能与旧密码一致").css("color", "red");
			flag_c = false;
		} else if(pw2==""){
			$("#pw_span1").text("新密码不能为空").css("color", "red");
			flag_c=false;
		}else{
			$("#pw_span1").addClass("glyphicon glyphicon-ok").css("color", "green");
			$("#pw_span1").text("");			
			flag_c = true;		
		}
		return flag_c;
	}
	function checkPw2() {
		var pw1 = $("#password2").val();
		var pw2 = $("#password3").val();
		if (pw1!=pw2) {
			$("#pw_span2").removeClass("glyphicon glyphicon-ok");
			$("#pw_span2").text("新密码不一致").css("color", "red");
			flag_c = false;
		} else {
			$("#pw_span2").addClass("glyphicon glyphicon-ok").css("color", "green");
			$("#pw_span2").text("");			
			flag_c = true;		
		}
		return flag_c;
	}
	//修改密码点击事件
	$(document).on("click","#pw",function(){
		var pw1 = $("#password1").val();
		var pw3 = $("#password2").val();
		var pw4 = $("#password3").val();
		$.ajax({
			url:APP_PATH+"/getuser",
			data:{
				"type":userType,
				"id":userId
			},
			type:"GET",
			success : function(result) {
				var user=result.extend.user;
				var pw2=user.password;
				var id=user.id;
				if(pw1==pw2&&pw1!=pw3&&pw3==pw4){
					var type=userType;
					$.ajax({
						type : "post",
						url : APP_PATH+"/changePassword",
						data : {
							"pw" : pw3,
							"type":type,
							"id":id
						},
						dataType : 'json',
						success : function(result1) {
							if (result1.code==100) {
								alert("修改成功");
								$("#pw_span").text("");
								$("#pw_span").removeClass("glyphicon glyphicon-ok");
								$("#pw_span1").text("");
								$("#pw_span1").removeClass("glyphicon glyphicon-ok");
								$("#pw_span2").text("");
								$("#pw_span2").removeClass("glyphicon glyphicon-ok");
								window.parent.location.href = "Student_curriculum?cId="+cId+"&id="+userId;
							} else {
								alert("修改失败！");
							}
						}
					});
				}else{
					alert("修改失败！");
				}
			}
		});		
	});
	//修改教师个人资料
	$(document).on("click","#updateStudent",function(){
		var student=$("#Studentform").serialize();
		$.ajax({
			url:APP_PATH+"/updateStudent/"+userId,
			type: "POST",
			data: student,
			success:function(result){
				if (result.code==100) {
					alert("修改成功");
					window.parent.location.href = "Student_curriculum?cId="+cId+"&id="+userId;
				} else {
					alert("修改失败！");
				}
			}
		});
	});
	//遍历作业分类
	function Task_Category(clId){
		$.ajax({
			url:APP_PATH+"/getTask_category",
			data:"clId="+clId,
			type:"GET",
			success:function(result){
				var task_category=result.extend.task_category;
				$.each(task_category,function(index, item) {
					$("<li></li>").append($("<a href='#Task-"+item.id+"' role='tab' id='Task-"+item.id+"-tab' data-toggle='tab' aria-controls='Task-"+item.id+"' aria-expanded='false'>"+item.name+"</a>"))
					.appendTo("#Taskdropdown"+item.clId+"-contents");
					$("<div role='tabpanel' class='tab-pane fade' id='Task-"+item.id+"' aria-labelledby='Task-"+item.id+"-tab'></div>")
					.appendTo("#TaskContent");
					var thead=$("<thead></thead>").append($("<tr style='font-weight:bold;'><td><input type='checkbox' id='check_task_all"+item.id+"'></td><td>作业名称</td><td>学号</td><td>作业大小</td>"));
					var table=$("<table class='table table-hover' id='"+item.clId+"-"+item.id+"-table'></table>")
						.append(thead).append($("<tbody></tbody>"));
					$("<div class='col-md-10' style='text-align:center;'></div>").append(table).appendTo("#Task-"+item.id);
					$.ajax({
						url:APP_PATH+"/getTaskByCategory",
						data:"id="+item.id,
						type:"GET",
						success:function(result1){
							console.log(result1);
							if(result1.code==100){
								var tasks=result1.extend.tasks;
								$.each(tasks,function(index, item1) {
									var checkBoxTd = $("<td><input type='checkbox' class='check_task_item_"+item.id+"'/></td>");
									var NameTd = $("<td></td>").append(item1.content);
									var StudentIdTd = $("<td></td>").append(item1.sId);
									var SizeTd = $("<td></td>").append(item1.name);
									$("<tr></tr>").append(checkBoxTd)
									.append(NameTd)
									.append(StudentIdTd)
									.append(SizeTd)
									.appendTo("#"+item.clId+"-"+item.id+"-table tbody");
									//全选按钮
									$(document).on("click","#check_task_all"+item.id,function(){
										$(".check_task_item_"+item.id).prop("checked",$(this).prop("checked"));
									});
									//当下面数据被选择5个时，上面的全选也要被选择
									$(document).on("click",".check_task_item_"+item.id,function(){
										var flag = $(".check_task_item_"+item.id+":checked").length == $(".check_task_item_"+item.id).length;
										$("#check_task_all"+item.id).prop("checked",flag);
									});
								});
							}
						}
					})
					
				});
				
			}
		});
		
	}
	//遍历全部班级
	function ALLClazz(){
		$.ajax({
			url:APP_PATH+"/getClazz",
			data:"cId="+cId,
			type:"GET",
			success : function(result) {
				var clazz=result.extend.clazz;
				$.each(clazz,function(index, item) {
					$("<option value='"+item.clId+"'></option>").append(item.name).appendTo("#cl_id");
					$("<li role='presentation'></li>")
					.append($("<a href='#"+item.clId+"-Clazz' id='"+item.clId+"-tab' role='tab' data-toggle='pill' aria-controls='"+item.clId+"' aria-expanded='true'>"+item.name+"</a>"))
					.appendTo("#ClazzManager");
					$("<div role='tabpanel' class='tab-pane fade' id='"+item.clId+"-Clazz' aria-labelledby='"+item.clId+"-tab'></div>")
					.appendTo("#ClazzContent");
					
					$("<li role='presentation' class='dropdown'></li>")
					.append($("<a href='#' id='Taskdropdown"+item.clId+"' class='dropdown-toggle' data-toggle='dropdown' aria-controls='Taskdropdown"+item.clId+"-contents' aria-expanded='false'>"+item.name+"<span class='caret'></span></a>"))
					.append($("<ul class='dropdown-menu' aria-labelledby='Taskdropdown"+item.clId+"' id='Taskdropdown"+item.clId+"-contents'></ul>"))
					.appendTo("#Task");
					
					Task_Category(item.clId);		
					var thead=$("<thead></thead>").append($("<tr><th><input type='checkbox' id='check_all"+item.clId+"'/></th><th>学号</th><th>姓名</th></tr>"));
					var table=$("<table class='table table-hover' style='margin-bottom:0;' id='"+item.clId+"-table'></table>")
						.append(thead).append($("<tbody></tbody>"));
					$("<div class='col-md-10'></div>").append(table).appendTo("#"+item.clId+"-Clazz");
					$.ajax({
						url:APP_PATH+"/getStudentByClazz",
						data:{
							"cId":cId,
							"clId":item.clId
						},
						type:"GET",
						success : function(result1) {
							var students=result1.extend.students;
							if(students==""){
								$("<p></p>").append("暂无学生").appendTo("#"+item.clId+"-Clazz");
							}else{
								$.each(students,function(index, item1) {
									var checkBoxTd = $("<td><input type='checkbox' class='check_item"+item.clId+"'/></td>");
									var StudentIdTd = $("<td></td>").append(item1.id);
									var StudentNameTd = $("<td></td>").append(item1.name);
									$("<tr></tr>").append(checkBoxTd)
									.append(StudentIdTd)
									.append(StudentNameTd)
									.appendTo("#"+item.clId+"-table tbody");
									$(document).on("click","#check_all"+item.clId,function(){
										$(".check_item"+item.clId).prop("checked",$(this).prop("checked"));
									});
									//当下面数据被选择5个时，上面的全选也要被选择
									$(document).on("click",".check_item"+item.clId,function(){
										var flag = $(".check_item"+item.clId+":checked").length == $(".check_item"+item.clId).length;
										$("#check_all"+item.clId).prop("checked",flag);
									});
									
								});
							}
						}
					})
				});
				
			}
		});
	}
	//遍历全部资源类型
	function ALLRC(){
		$.ajax({
			url:APP_PATH+"/getRC",
			data:"cId="+cId,
			type:"GET",
			success : function(result) {
				var rc=result.extend.rc;
				$.each(rc,function(index, item) {
					
					$("<li role='presentation'></li>")
					.append($("<a href='#"+item.rcId+"-RC' id='"+item.rcId+"-RCtab' role='tab' data-toggle='pill' aria-controls='"+item.rcId+"' aria-expanded='true'>"+item.name+"</a>"))
					.appendTo("#RC");
					$("<div role='tabpanel' class='tab-pane fade' id='"+item.rcId+"-RC' aria-labelledby='"+item.rcId+"-RCtab'></div>")
					.appendTo("#RCContent");
					$.ajax({
						url:APP_PATH+"/getResourcesByRC",
						data:{
							"cId":cId,
							"rcId":item.rcId
						},
						type:"GET",
						success : function(result1) {
							var resources=result1.extend.resource;
							if(resources==""){
								$("<p></p>").append("暂无可下载的教学资源!").appendTo("#"+item.rcId+"-RC");
							}else{
								$.each(resources,function(index, item1) {
									var name=APP_PATH+"/upload/"+item1.content;
									var nameTR=$("<tr></tr>").append($("<h3><a href='"+name+"'>"+item1.content+"</a></h3>"));
									var sizeTR=$("<tr></tr>").append(item1.name);
									var table=$("<table class='table' style='margin-bottom:0;'></table>").append(nameTR).append(sizeTR);
									$("<div class='col-md-10'></div>").append(table).appendTo("#"+item1.rcId+"-RC");
								});
							}
						}
					})
				});
			}
		});
	}
	//遍历全部资源
	function ALLResources(){
		$.ajax({
			url:APP_PATH+"/getResources",
			data:"cId="+cId,
			type:"GET",
			success : function(result) {
				var resources=result.extend.resources;
				$.each(resources,function(index, item) {
					var name=APP_PATH+"/upload/"+item.content;
					var nameTR=$("<tr></tr>").append($("<h3><a href='"+name+"'>"+item.content+"</a></h3>"));
					var sizeTR=$("<tr></tr>").append(item.name);
					var table=$("<table class='table' style='margin-bottom:0;'></table>").append(nameTR).append(sizeTR);
					$("<div class='col-md-10'></div>").append(table).appendTo("#all");
				});
			}				
		});
	}
	//遍历全部学生
	function ALLStudent(){
		$.ajax({
			url:APP_PATH+"/getStudents",
			data:"cId="+cId,
			type:"GET",
			success : function(result) {
				var students=result.extend.students;
				console.log(students);
				$.each(students,function(index, item) {
					var checkBoxTd = $("<td><input type='checkbox' class='check_item'/></td>");
					var StudentIdTd = $("<td></td>").append(item.id);
					var StudentNameTd = $("<td></td>").append(item.name);
					$("<tr></tr>").append(checkBoxTd)
					.append(StudentIdTd)
					.append(StudentNameTd)
					.appendTo("#students_table tbody");
				});
			}				
		});
	}
	//全选按钮
	$(document).on("click","#check_all",function(){
		$(".check_item").prop("checked",$(this).prop("checked"));
	});
	//当下面数据被选择5个时，上面的全选也要被选择
	$(document).on("click",".check_item",function(){
		var flag = $(".check_item:checked").length == $(".check_item").length;
		$("#check_all").prop("checked",flag);
	});
	//全选按钮
	$(document).on("click","#check_task_all",function(){
		$(".check_task_item").prop("checked",$(this).prop("checked"));
	});
	//当下面数据被选择5个时，上面的全选也要被选择
	$(document).on("click",".check_task_item",function(){
		var flag = $(".check_task_item:checked").length == $(".check_task_item").length;
		$("#check_task_all").prop("checked",flag);
	});
	//上传作业
	function savetask(){
		var formData = new FormData(document.getElementById("task_form"));
		if($("#rc_id").val()==""){
			alert("请选择作业次数！");
		}else{
			formData.append("rc_id",$("#rc_id").val());
			formData.append("cId",cId);
			formData.append("sId",userId);
			$.ajax({
				url : APP_PATH+"/creatTask",
				type : "POST",
				dataType : "json",
				data : formData,
				cache: false,
	            processData: false,
	            contentType: false,
				success : function(result) {
					if (result.code==100) {
						alert("添加成功");
						window.parent.location.href = "Student_curriculum?cId="+cId+"&id="+userId;
					} else {
						alert("添加失败！");
					}
				}
			});
		}
	}
	//遍历所有作业
	function ALLTask(){
		$.ajax({
			url:APP_PATH+"/getTasks",
			data:"cId="+cId,
			type:"GET",
			success : function(result) {
				var tasks=result.extend.tasks;
				$.each(tasks,function(index, item) {
					var checkBoxTd = $("<td><input type='checkbox' class='check_task_item'/></td>");
					var NameTd = $("<td></td>").append(item.content);
					var StudentIdTd = $("<td></td>").append(item.sId);
					var SizeTd = $("<td></td>").append(item.name);
					$("<tr></tr>").append(checkBoxTd)
					.append(NameTd)
					.append(StudentIdTd)
					.append(SizeTd)
					.appendTo("#task_table tbody");
				});
			}				
		});
	}
	//主页搜索
	$(document).on("click","#search",function(){
		var contend=$("#contend").val();
		if(contend==""){
			alert("请输入课程名称");
			return false;
		}else{
			$.ajax({
				type : "GET",
				url : APP_PATH+"/searchCurriculum",
				data : "contend="+contend,
				success : function(result) {
					if (result.code==100) {
						var cur=result.extend.curr;
						$.each(cur,function(index, item) {
							window.open("details?cId="+item.cId+"&id="+userId);
						});
					} else {
						alert("没有此课程！");
					}
				}
			});
		}
		
	});
	//获取公告
	function getNotice(){
		$.ajax({
			url:APP_PATH+"/getNotice",
			type:"GET",
			data:{
				"cId":cId
			},
			success:function(result){
				if (result.code==100) {
					var notices=result.extend.notices;
					$.each(notices,function(index, item) {						
						var div=$("<div class='col-md-10'></div>").appendTo("#all-notice");
						$("<h4 style='font-weight: bold;'></h4>").append(item.title).appendTo(div);
						$("<p></p>").append(item.content).appendTo(div);
						$("<p></p>").append(item.time).appendTo(div);	
					});
					console.log(result);
				}
			}
		});
	}
	//获取问题列表
	function getAllProblem(cId){
		$.ajax({
			url:APP_PATH+"/getAllProblem",
			type:"GET",
			data:"cId="+cId,
			success:function(result){
				var problems=result.extend.problems;
				$.each(problems,function(index,item){
					var div=$("<div class='row'></div>").appendTo("#Allproblems");
					$("<h4></h4>").append($("<a onclick='change("+item.qId+")' title='"+item.title+"'>"+item.title+"</a>")).appendTo(div);
					$("<p></p>").append("提问人："+item.id+" | 提问时间："+item.time).appendTo(div);
				});
			}
		});
	}
	function getMyProblem(cId,userId){
		$.ajax({
			url:APP_PATH+"/getMyProblem",
			type:"GET",
			data:{
				"cId":cId,
				"id":userId
			},
			success:function(result){
				var problems=result.extend.problems;
				$.each(problems,function(index,item){
					var div=$("<div class='row'></div>").appendTo("#problems");
					$("<h4></h4>").append($("<a onclick='changeMy("+item.qId+")' title='"+item.title+"'>"+item.title+"</a>")).appendTo(div);
					$("<p></p>").append("提问人："+item.id+" | 提问时间："+item.time).appendTo(div);
				});
			}
		});
	}
	//点击问题
	function change(id){
		$("#Allproblems").empty();
		$.ajax({
			url:APP_PATH+"/getProblem",
			data:"id="+id,
			type:"GET",
			success:function(result){
				var pro=result.extend.problems;				
				var divform=$("<div class='form-group'></div>");
				var text=$("<textarea name='content' class='form-control' id='content' placeholder='回复内容...'></textarea>");
				var input=$("<input type='hidden' value='"+id+"' name='qId' id='qId'></input><input type='hidden' value='"+userId+"' name='id'></input>");
				$("<div class='col-md-8'></div>").append(text).append(input).appendTo(divform);
				var replyBtn=$("<button type='button' class='btn btn-primary' id='saveReply'>回复</button>");
				var backBtn=$("<button type='button' class='btn btn-primary' onclick='change("+id+")'>取消</button>");
				var form=$("<form class='form-horizontal' method='post' id='problem-reply'></form>").append(divform).append(replyBtn).append(" ").append(backBtn);
				var div3=$("<div class='panel-heading' role='tab' id='Allproblem-"+pro.qId+"' style='margin-left:780px;'></div>").append($("<a role='button' data-toggle='collapse' data-parent='#Allproblems' href='#collapse-"+pro.qId+"' aria-expanded='true' aria-controls='collapse-"+pro.qId+"'>回复</a>"));
				var div1=$("<div class='panel-collapse collapse' role='tabpanel' id='collapse-"+pro.qId+"' aria-labelledby='Allproblem-"+pro.qId+"'></div>").append($("<div class=''panel-body></div>").append(form));
				var title=$("<h4></h4>").append(pro.title);			
				if(pro.id!=userId){			
					var row=$("<div class='row' style='margin-left:10px;'></div>").append($("<p>"+pro.id+" | 发表于  "+pro.time+"</p>")).append($("</br>")).append($("<p>"+pro.account+"</p>")).append(div3).append($("<hr style='margin-right:20px;margin-top:0;margin-bottom:0;'></hr>")).append(div1);
					$("#Allproblems").append(title).append($("</br>")).append(row);
				}else{
					var Row=$("<div class='row' style='margin-left:10px;'></div>").append($("<p>"+pro.id+" | 发表于  "+pro.time+"</p>")).append($("</br>")).append($("<p>"+pro.account+"</p>")).append($("<a onclick='delProblem("+id+")' style='margin-left:795px;'>删除</a>")).append(div3).append($("<hr style='margin-right:20px;margin-top:0;margin-bottom:0;'></hr>")).append(div1);
					$("#Allproblems").append(title).append($("</br>")).append(Row);
				}
				$.ajax({
					url:APP_PATH+"/getReply",
					data:"id="+id,
					type:"GET",
					success:function(result1){
						console.log(result1);
						var replies=result1.extend.replies;
						$.each(replies,function(index,item){
							if(item.id!=userId){
								var divform=$("<div class='form-group'></div>");
								var text=$("<textarea name='content' class='form-control' id='content' placeholder='回复内容...'></textarea>");
								var input=$("<input type='hidden' value='"+item.qId+"' name='qId' id='qId'></input><input type='hidden' value='"+userId+"' name='id'></input>");
								$("<div class='col-md-8'></div>").append(text).append(input).appendTo(divform);
								var replyBtn=$("<button type='button' class='btn btn-primary' id='saveReply'>回复</button>");
								var backBtn=$("<button type='button' class='btn btn-primary' onclick='change("+item.qId+")'>取消</button>");
								var form=$("<form class='form-horizontal' method='post' id='problem-reply'></form>").append(divform).append(replyBtn).append(" ").append(backBtn);
								var div3=$("<div class='panel-heading' role='tab' id='Allproblem-"+item.qId+"-"+item.num+"' style='margin-left:780px;'></div>").append($("<a role='button' data-toggle='collapse' data-parent='#Allproblems' href='#collapse-"+item.qId+"-"+item.num+"' aria-expanded='true' aria-controls='collapse-"+item.qId+"-"+item.num+"'>回复</a>"));
								var div1=$("<div class='panel-collapse collapse' role='tabpanel' id='collapse-"+item.qId+"-"+item.num+"' aria-labelledby='Allproblem-"+item.qId+"-"+item.num+"'></div>").append($("<div class=''panel-body></div>").append(form));
								$("<br>").appendTo("#Allproblems");
								$("<div class='row' style='margin-left:10px;'></div>").append($("<p>"+item.id+" | 发表于  "+item.time+"</p>")).append($("</br>")).append($("<p>"+item.content+"</p>")).append(div3).append($("<hr style='margin-right:20px;margin-top:0;margin-bottom:0;'></hr>")).append(div1).appendTo("#Allproblems");
								
							}else{
								$("<br>").appendTo("#Allproblems");
								$("<div class='row' style='margin-left:10px;'></div>").append($("<p>"+item.id+" | 发表于  "+item.time+"</p>")).append($("</br>")).append($("<p>"+item.content+"</p>")).append($("<a onclick='del("+item.num+")' style='margin-left:795px;'>删除</a>")).append($("<hr style='margin-right:20px;margin-top:0;margin-bottom:0;'></hr>")).appendTo("#Allproblems");
							}							
						});					
					}
				})
			}
		})
		document.getElementById("problem-button").innerHTML="<button type='button' class='btn btn-primary' onclick='back()'>返回</button>";
		return false;
	}
	function changeMy(id){
		$("#problems").empty();
		$.ajax({
			url:APP_PATH+"/getProblem",
			data:"id="+id,
			type:"GET",
			success:function(result){
				var pro=result.extend.problems;				
				var divform=$("<div class='form-group'></div>");
				var text=$("<textarea name='content' class='form-control' id='content' placeholder='回复内容...'></textarea>");
				var input=$("<input type='hidden' value='"+id+"' name='qId' id='qId'></input><input type='hidden' value='"+userId+"' name='id'></input>");
				$("<div class='col-md-8'></div>").append(text).append(input).appendTo(divform);
				var replyBtn=$("<button type='button' class='btn btn-primary' id='saveReply'>回复</button>");
				var backBtn=$("<button type='button' class='btn btn-primary' onclick='change("+id+")'>取消</button>");
				var form=$("<form class='form-horizontal' method='post' id='problem-reply'></form>").append(divform).append(replyBtn).append(" ").append(backBtn);
				var div3=$("<div class='panel-heading' role='tab' id='Allproblem-"+pro.qId+"' style='margin-left:780px;'></div>").append($("<a role='button' data-toggle='collapse' data-parent='#problems' href='#collapse-"+pro.qId+"' aria-expanded='true' aria-controls='collapse-"+pro.qId+"'>回复</a>"));
				var div1=$("<div class='panel-collapse collapse' role='tabpanel' id='collapse-"+pro.qId+"' aria-labelledby='Allproblem-"+pro.qId+"'></div>").append($("<div class=''panel-body></div>").append(form));
				var title=$("<h4></h4>").append(pro.title);			
				if(pro.id!=userId){			
					var row=$("<div class='row' style='margin-left:10px;'></div>").append($("<p>"+pro.id+" | 发表于  "+pro.time+"</p>")).append($("</br>")).append($("<p>"+pro.account+"</p>")).append(div3).append($("<hr style='margin-right:20px;margin-top:0;margin-bottom:0;'></hr>")).append(div1);
					$("#problems").append(title).append($("</br>")).append(row);
				}else{
					var Row=$("<div class='row' style='margin-left:10px;'></div>").append($("<p>"+pro.id+" | 发表于  "+pro.time+"</p>")).append($("</br>")).append($("<p>"+pro.account+"</p>")).append($("<a onclick='delProblem("+id+")' style='margin-left:795px;'>删除</a>")).append(div3).append($("<hr style='margin-right:20px;margin-top:0;margin-bottom:0;'></hr>")).append(div1);
					$("#problems").append(title).append($("</br>")).append(Row);
				}
				$.ajax({
					url:APP_PATH+"/getReply",
					data:"id="+id,
					type:"GET",
					success:function(result1){
						console.log(result1);
						var replies=result1.extend.replies;
						$.each(replies,function(index,item){
							if(item.id!=userId){
								var divform=$("<div class='form-group'></div>");
								var text=$("<textarea name='content' class='form-control' id='content' placeholder='回复内容...'></textarea>");
								var input=$("<input type='hidden' value='"+item.qId+"' name='qId' id='qId'></input><input type='hidden' value='"+userId+"' name='id'></input>");
								$("<div class='col-md-8'></div>").append(text).append(input).appendTo(divform);
								var replyBtn=$("<button type='button' class='btn btn-primary' id='saveReply'>回复</button>");
								var backBtn=$("<button type='button' class='btn btn-primary' onclick='change("+item.qId+")'>取消</button>");
								var form=$("<form class='form-horizontal' method='post' id='problem-reply'></form>").append(divform).append(replyBtn).append(" ").append(backBtn);
								var div3=$("<div class='panel-heading' role='tab' id='Allproblem-"+item.qId+"-"+item.num+"' style='margin-left:780px;'></div>").append($("<a role='button' data-toggle='collapse' data-parent='#problems' href='#collapse-"+item.qId+"-"+item.num+"' aria-expanded='true' aria-controls='collapse-"+item.qId+"-"+item.num+"'>回复</a>"));
								var div1=$("<div class='panel-collapse collapse' role='tabpanel' id='collapse-"+item.qId+"-"+item.num+"' aria-labelledby='Allproblem-"+item.qId+"-"+item.num+"'></div>").append($("<div class=''panel-body></div>").append(form));
								$("<br>").appendTo("#problems");
								$("<div class='row' style='margin-left:10px;'></div>").append($("<p>"+item.id+" | 发表于  "+item.time+"</p>")).append($("</br>")).append($("<p>"+item.content+"</p>")).append(div3).append($("<hr style='margin-right:20px;margin-top:0;margin-bottom:0;'></hr>")).append(div1).appendTo("#problems");
								
							}else{
								$("<br>").appendTo("#problems");
								$("<div class='row' style='margin-left:10px;'></div>").append($("<p>"+item.id+" | 发表于  "+item.time+"</p>")).append($("</br>")).append($("<p>"+item.content+"</p>")).append($("<a onclick='del("+item.num+")' style='margin-left:795px;'>删除</a>")).append($("<hr style='margin-right:20px;margin-top:0;margin-bottom:0;'></hr>")).appendTo("#problems");
							}							
						});					
					}
				})
			}
		})
		document.getElementById("problem-button").innerHTML="<button type='button' class='btn btn-primary' onclick='back()'>返回</button>";
		return false;
	}
	//回复问题
	$(document).on("click","#saveReply",function(){
		var form=$("#problem-reply").serialize();
		var qId=$("#qId").val();
		$.ajax({
			url:APP_PATH+"/saveReply",
			data:form,
			type:"POST",
			success:function(result){
				if(result.code==100){
					change(qId);
				}else{
					alert("失败！");
				}
				
			}
		})
	})
	function delProblem(id){
		if(confirm("确认要删除吗？")){
			$.ajax({
				url:APP_PATH+"/delProblem",
				data:"id="+id,
				type:"GET",
				success:function(result){
					if(result.code==100){
						back();
						$.ajax({
							url:APP_PATH+"/delReply",
							data:"id="+id,
							type:"GET",
							success:function(result){							
							}
						})
					}else{
						alert("删除失败");
					}			
				}
			})
		}
	}
	function del(num){
		if(confirm("确认要删除吗？")){
			$.ajax({
				url:APP_PATH+"/delReplyByNum",
				data:"num="+num,
				type:"GET",
				success:function(result){
					if(result.code==100){
						back();
					}else{
						alert("删除失败");
					}
				}
			})
		}	
	}
	function back(){
		$("#Allproblems").empty();
		$("#problems").empty();
		$("#problem-button").empty();
		document.getElementById("problem-button").innerHTML="<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#addProblem'>添加</button>";
		getAllProblem(cId);
		getMyProblem(cId,userId);
	}
	//添加问题
	$(document).on("click","#saveProblem",function(){
		var form=$("#Problem-form").serialize();
		$.ajax({
			url:APP_PATH+"/addProblem",
			type:"GET",
			data:form,
			success:function(result){
				if (result.code==100) {
					alert("添加成功");
					window.parent.location.href = "Student_curriculum?cId="+cId+"&id="+userId;
				} else {
					alert("添加失败！");
				}
			}
		})
	});
	
	