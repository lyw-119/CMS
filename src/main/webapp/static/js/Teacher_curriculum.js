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
				$("#name").text("欢迎您，"+user.name+"老师");
				$("<span></span>").addClass("caret").appendTo("#dropdown1");
				if(userType==2){
					$("#inputTeacherId").text(user.id);
					$("#inputTeacherName").val(user.name);
					$("#mydetails-2 input[name='gender']").val([user.gender]);
					$("#inputTeacherEmail").val(user.email);
					$("#mydetails-2 select").val([user.system]);
				}
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
				$("#title1").text(cur.name);
				$("#creat_name").val(cur.name);
				$("#Curriculumform select").val(cur.system);
				$("#creat_major").val(cur.major);
				$("#creat_account").val(cur.account);
				$("#creat_credit").val(cur.credit);
				$("#preview").attr("src",APP_PATH+"/upload/"+cur.photo);
				
			}
		});
		//遍历全部资源类型
		ALLRC();
		//遍历全部资源
		ALLResources();
		//遍历全部班级
		ALLClass();
		//遍历全部学生
		ALLStudent();
		//遍历全部作业
		ALLTask();
		//获取申请列表
		getApply();
		//获取公告
		getNotice(cId);
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
								window.parent.location.href = "Teacher_curriculum?cId="+cId+"&id="+userId;
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
	$(document).on("click","#updateTeacher",function(){
		var teacher=$("#Teacherform").serialize();
		$.ajax({
			url:APP_PATH+"/updateTeacher/"+userId,
			type: "POST",
			data: teacher,
			success:function(result){
				if (result.code==100) {
					alert("修改成功");
					window.parent.location.href = "Teacher_curriculum?cId="+cId+"&id="+userId;
				} else {
					alert("修改失败！");
				}
			}
		});
	});
	var rc_result=false;
	//资源类型查重
	function checkRC(){
		var rc=$("#RCname").val();
		$.ajax({
			url:APP_PATH+"/checkRC",
			type:"GET",
			data:{
				"rc":rc,
				"cId":cId
			},
			success:function(result){
				if(result.code==100){
					$("#rc_span").text("");
					$("#rc_span").addClass("glyphicon glyphicon-ok").css("color", "green");
					rc_result=true;
					return rc_result;
				}else{
					$("#rc_span").removeClass("glyphicon glyphicon-ok");
					$("#rc_span").text("该资源类型已存在").css("color", "red");
				}
			}
		});
	}
	//添加资源类型
	function saveRC(){
		var rc=$("#RCname").val();
		if(rc==""){
			alert("请填入名称！");
			return false;
		}
		if(rc_result==false){
			alert("该资源类型已存在!");
			return false;
		}
		$.ajax({
			url:APP_PATH+"/saveRC",
			type:"GET",
			data:{
				"rc":rc,
				"cId":cId
			},
			success:function(result){
				if (result.code==100) {
					alert("添加成功");
					window.parent.location.href = "Teacher_curriculum?cId="+cId+"&id="+userId;
				} else {
					alert("添加失败！");
				}
			}
		});
	}
	//添加资源
	function saveResources(){
		var formData = new FormData(document.getElementById("Resources_form"));
		if($("#rc_id").val()==""){
			alert("请选择资源类型！");
		}else{
			formData.append("rc_id",$("#rc_id").val());
			formData.append("cId",cId)
			$.ajax({
				url : APP_PATH+"/creatResources",
				type : "POST",
				dataType : "json",
				data : formData,
				cache: false,
	            processData: false,
	            contentType: false,
				success : function(result) {
					if (result.code==100) {
						alert("添加成功");
						window.parent.location.href = "Teacher_curriculum?cId="+cId+"&id="+userId;
					} else {
						alert("添加失败！");
					}
				}
			});
		}
	}
	//新建班级查重并保存
	var ClazzResult=false;
	function checkClazz(){
		var clazz=$("#Clazzname").val();
		$.ajax({
			url:APP_PATH+"/checkClazz",
			type:"GET",
			data:{
				"clazz":clazz,
				"cId":cId
			},
			success:function(result){
				if(result.code==100){
					$("#clazz_span").text("");
					$("#clazz_span").addClass("glyphicon glyphicon-ok").css("color", "green");
					ClazzResult=true;
					return ClazzResult;
				}else{
					$("#clazz_span").removeClass("glyphicon glyphicon-ok");
					$("#clazz_span").text("该班级已存在").css("color", "red");
				}
			}
		});
	}
	function saveClazz(){
		var clazz=$("#Clazzname").val();
		if(clazz==""){
			alert("请填入班级名称！");
			return false;
		}
		if(ClazzResult==false){
			alert("该班级已存在!");
			return false;
		}
		$.ajax({
			url:APP_PATH+"/saveClazz",
			type:"GET",
			data:{
				"clazz":clazz,
				"cId":cId
			},
			success:function(result){
				if (result.code==100) {
					alert("添加成功");
					window.parent.location.href = "Teacher_curriculum?cId="+cId+"&id="+userId;
				} else {
					alert("添加失败！");
				}
			}
		});
	}
	//遍历作业分类
	function Task_Category(clId){
		$.ajax({
			url:APP_PATH+"/getTask_category",
			data:"clId="+clId,
			type:"GET",
			success:function(result){
				console.log(result);
				var task_category=result.extend.task_category;
				$.each(task_category,function(index, item) {
					$("<li></li>").append($("<a href='#Task-"+item.id+"' role='tab' id='Task-"+item.id+"-tab' data-toggle='tab' aria-controls='Task-"+item.id+"' aria-expanded='false'>"+item.name+"</a>"))
					.appendTo("#Taskdropdown"+item.clId+"-contents");
					$("<li></li>").append($("<a href='#Situation-"+item.id+"' role='tab' id='Situation-"+item.id+"-tab' data-toggle='tab' aria-controls='Situation-"+item.id+"' aria-expanded='false'>"+item.name+"</a>"))
					.appendTo("#checkTask"+item.clId+"-contents");
					$("<div role='tabpanel' class='tab-pane fade' id='Task-"+item.id+"' aria-labelledby='Task-"+item.id+"-tab'></div>")
					.appendTo("#TaskContent");
					$("<div role='tabpanel' class='tab-pane fade' id='Situation-"+item.id+"' aria-labelledby='Situation-"+item.id+"-tab'></div>")
					.appendTo("#Situation");
					var thead=$("<thead></thead>").append($("<tr style='font-weight:bold;'><td><input type='checkbox' id='check_task_all"+item.id+"'></td><td>作业名称</td><td>学号</td><td>作业大小</td><td>操作</td></tr>"));
					var table=$("<table class='table table-hover' id='"+item.clId+"-"+item.id+"-table'></table>")
						.append(thead).append($("<tbody></tbody>"));
					$("<div class='col-md-10' style='text-align:center;'></div>").append(table).appendTo("#Task-"+item.id);
					var thead1=$("<thead></thead>").append($("<tr style='font-weight:bold;'><td>学号</td><td>姓名</td></tr>"));
					var table1=$("<table class='table table-hover' id='"+item.clId+"-"+item.id+"-Situation'></table>")
						.append(thead1).append($("<tbody></tbody>"));
					$("<div class='col-md-8' style='text-align:center;'></div>").append(table1).appendTo("#Situation-"+item.id);
					$.ajax({
						url:APP_PATH+"/getStudentByClazz",
						data:{
							"cId":cId,
							"clId":item.clId
						},
						type:"GET",
						success : function(result2) {
							if(result2.code==100){
								var students=result2.extend.students;
								$.each(students,function(index, item2) {
									$.ajax({
										url:APP_PATH+"/getTaskByStudent",
										data:{
											"sId":item2.id,
											"tacId":item.id
										},
										type:"GET",
										success:function(res){
											if(res.code==200){
												var IdTd=$("<td></td>").append(item2.id);
												var NameTd=$("<td></td>").append(item2.name);
												$("<tr></tr>").append(IdTd)
												.append(NameTd)
												.appendTo("#"+item.clId+"-"+item.id+"-Situation tbody");
											}
										}
									})									
								})
							}
						}
					})
					$.ajax({
						url:APP_PATH+"/getTaskByCategory",
						data:"id="+item.id,
						type:"GET",
						success:function(result1){
							if(result1.code==100){
								var tasks=result1.extend.tasks;
								$.each(tasks,function(index, item1) {
									var checkBoxTd = $("<td><input type='checkbox' class='check_task_item_"+item.id+"'/></td>");
									var NameTd = $("<td></td>").append(item1.content);
									var StudentIdTd = $("<td></td>").append(item1.sId);
									var SizeTd = $("<td></td>").append(item1.name);									
									var name=APP_PATH+"/upload/"+item1.content;
									var downBtn = $("<button>下载</button>").addClass("btn btn-primary btn-sm download_task_btn");
									var delBtn = $("<button>删除</button>").addClass("btn btn-danger btn-sm delete_task_btn");
									downBtn.attr("name",name);
									delBtn.attr("delTask-name",item1.content);
									var btnTd=$("<td></td>").append(downBtn).append(" ").append(delBtn);
									$("<tr></tr>").append(checkBoxTd)
									.append(NameTd)
									.append(StudentIdTd)
									.append(SizeTd)
									.append(btnTd)
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
	function ALLClass(){
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
					$("<li role='presentation' class='dropdown'></li>")
					.append($("<a href='#' id='checkTask"+item.clId+"' class='dropdown-toggle' data-toggle='dropdown' aria-controls='checkTask"+item.clId+"-contents' aria-expanded='false'>"+item.name+"<span class='caret'></span></a>"))
					.append($("<ul class='dropdown-menu' aria-labelledby='checkTask"+item.clId+"' id='checkTask"+item.clId+"-contents'></ul>"))
					.appendTo("#Operation-situation");
					
					Task_Category(item.clId);		
					var thead=$("<thead></thead>").append($("<tr style='font-weight:bold;'><td><input type='checkbox' id='check_all"+item.clId+"'/></td><td>学号</td><td>姓名</td><td>操作</td></tr>"));
					var table=$("<table class='table table-hover' style='margin-bottom:0;' id='"+item.clId+"-table'></table>")
						.append(thead).append($("<tbody></tbody>"));
					$("<div class='col-md-10' style='text-align:center;'></div>").append(table).appendTo("#"+item.clId+"-Clazz");
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
									var delBtn = $("<button></button>").addClass("btn btn-danger btn-sm delete_btn")
										.append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("删除");
									//为删除按钮添加一个自定义属性，来表示当前id,name,clId
									delBtn.attr("del-id",item1.id);
									delBtn.attr("del-clId",item.clId);
									delBtn.attr("del-name",item1.name);
									var btnTd = $("<td></td>").append(delBtn);
									$("<tr></tr>").append(checkBoxTd)
									.append(StudentIdTd)
									.append(StudentNameTd)
									.append(btnTd)
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
				$("<li role='presentation'></li>").append($("<a href='#Apply-Clazz' role='tab' id='Apply' data-toggle='pill' aria-controls='Apply' aria-expanded='true'>申请列表</a>")).appendTo("#ClazzManager");
				$("<div role='tabpanel' class='tab-pane fade' id='Apply-Clazz' aria-labelledby='Apply'></div>")
				.appendTo("#ClazzContent");
				var thead=$("<thead></thead>").append($("<tr style='font-weight:bold;'><td>学号</td><td>班级</td><td>操作</td></tr>"));
				var table=$("<table class='table table-hover' style='margin-bottom:0;' id='Apply-table'></table>")
					.append(thead).append($("<tbody></tbody>"));
				$("<div class='col-md-10' style='text-align:center;'></div>").append(table).appendTo("#Apply-Clazz");
				$("<li role='presentation'></li>").append($("<a href='#addTask_Cagetory' data-toggle='modal'>添加分类</a>")).appendTo("#Task");
				$("<li role='presentation'></li>").append($("<a href='#checkTask' data-toggle='modal'>作业情况</a>")).appendTo("#Task");
				$("<li role='presentation'></li>").append($("<a href='#addClazz' data-toggle='modal'>添加班级</a>")).appendTo("#ClazzManager");
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
					$("<option value='"+item.rcId+"'></option>").append(item.name).appendTo("#rc_id");
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
									var Btn=$("<button class='btn btn-danger btn-sm delete_resource_btn'>删除</button>");
									Btn.attr("resources_name",item1.content);
									Btn.attr("resources_id",item1.rId);
									var btn=$("<tr></tr>").append(Btn);
									var table=$("<table class='table' style='margin-bottom:0;'></table>").append(nameTR).append(sizeTR).append(btn);
									$("<div class='col-md-10'></div>").append(table).appendTo("#"+item1.rcId+"-RC");
								});
							}
						}
					})
				});
				$("<li role='presentation'></li>").append($("<a href='#addRC' data-toggle='modal'>添加资源类型</a>")).appendTo("#RC");
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
				if(resources==""){
					$("<p></p>").append("暂无可下载的教学资源!").appendTo("#all");
				}else{
					$.each(resources,function(index, item) {
						var name=APP_PATH+"/upload/"+item.content;
						var nameTR=$("<tr></tr>").append($("<h3><a href='"+name+"'>"+item.content+"</a></h3>"));
						var sizeTR=$("<tr></tr>").append(item.name);
						var Btn=$("<button class='btn btn-danger btn-sm delete_resource_btn'>删除</button>");
						Btn.attr("resources_name",item.content);
						Btn.attr("resources_id",item.rId);
						var btn=$("<tr></tr>").append(Btn);
						var table=$("<table class='table' style='margin-bottom:0;'></table>").append(nameTR).append(sizeTR).append(btn);
						$("<div class='col-md-10'></div>").append(table).appendTo("#all");
						
					});
				}
				
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
					var delBtn = $("<button></button>").addClass("btn btn-danger btn-sm delete_btn")
						.append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("删除");
					//为删除按钮添加一个自定义属性，来表示当前id,name,clId
					delBtn.attr("del-id",item.id);
					delBtn.attr("del-name",item.name);
					$.ajax({
						url:APP_PATH+"/getClazzByStudent",
						data:{
							"cId":cId,
							"sId":item.id
						},
						type:"GET",
						success:function(result1){
							delBtn.attr("del-clId",result1.extend.clId);
						}
					});
					
					var btnTd = $("<td></td>").append(delBtn);
					$("<tr></tr>").append(checkBoxTd)
					.append(StudentIdTd)
					.append(StudentNameTd)
					.append(btnTd)
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
	//删除学生
	$(document).on("click",".delete_btn",function(){
		var name = $(this).attr("del-name");
		if(confirm("确认删除"+name+"吗？")){
			var id = $(this).attr("del-id");
			var clId=$(this).attr("del-clId");
			$.ajax({
				url:APP_PATH+"/deleteStudentByClazz",
				data:{
					"id":id,
					"clId":clId
				},
				type:"POST",
				success:function(result){
					if (result.code==100) {
						alert("删除成功");
						window.parent.location.href = "Teacher_curriculum?cId="+cId+"&id="+userId;
					} else {
						alert("删除失败！");
					}
				}
				
			})
		}	
	});
	//删除资源
	$(document).on("click",".delete_resource_btn",function(){
		var name = $(this).attr("resources_name");
		var id = $(this).attr("resources_id");
		if(confirm("确认删除"+name+"吗？")){
			$.ajax({
				url:APP_PATH+"/delResources",
				data:"id="+id,
				type:"GET",
				success:function(result){
					if (result.code==100) {
						alert("删除成功");
						window.parent.location.href = "Teacher_curriculum?cId="+cId+"&id="+userId;
					} else {
						alert("删除失败！");
					}
				}
			})
		}
	})
	//批量删除学生
	$(document).on("click","#studentClazz_delete_all_btn",function(){
		var studentNames = "";
		var del_idstr = "";
		$.each($(".check_item:checked"),function(){
			studentNames += $(this).parents("tr").find("td:eq(2)").text()+",";
			//组装员工id
			del_idstr += $(this).parents("tr").find("td:eq(1)").text()+"-";
		});
		if(studentNames=""){
			return false;
		}
		//去除studentNames多余的逗号
		Names = studentNames.substring(0,studentNames.length-1);
		del_idstr = del_idstr.substring(0,del_idstr.length-1);
		if(confirm("确认要删除【"+Names+"】吗？")){
			$.ajax({
				url:APP_PATH+"/deleteAll/"+del_idstr,
				type:"GET",
				data:"cId="+cId,
				success:function(result){
					if (result.code==100) {
						alert("删除成功");
						window.parent.location.href = "Teacher_curriculum?cId="+cId+"&id="+userId;
					} else {
						alert("删除失败！");
					}
				}
			});
		}
	});
	var tc_result=false;
	//作业分类查重
	function checkTC(){
		var tc=$("#TCname").val();
		var clId=$("#cl_id").val();
		$.ajax({
			url:APP_PATH+"/checkTC",
			type:"GET",
			data:{
				"tc":tc,
				"clId":clId
			},
			success:function(result){
				if(result.code==100){
					$("#tc_span").text("");
					$("#tc_span").addClass("glyphicon glyphicon-ok").css("color", "green");
					tc_result=true;
					return tc_result;
				}else{
					$("#tc_span").removeClass("glyphicon glyphicon-ok");
					$("#tc_span").text("该分类已存在").css("color", "red");
				}
			}
		});
	}
	//添加作业分类
	function saveTC(){
		var tc=$("#TCname").val();
		var clId=$("#cl_id").val();
		if(tc==""){
			alert("请填入名称！");
			return false;
		}
		
		if(tc_result==false){
			alert("该资源类型已存在!");
			return false;
		}
		$.ajax({
			url:APP_PATH+"/saveTC",
			type:"GET",
			data:{
				"tc":tc,
				"clId":clId
			},
			success:function(result){
				if (result.code==100) {
					alert("添加成功");
					window.parent.location.href = "Teacher_curriculum?cId="+cId+"&id="+userId;
				} else {
					alert("添加失败！");
				}
			}
		});
	}
	
	//遍历全部作业
	function ALLTask(){
		$.ajax({
			url:APP_PATH+"/getTasks",
			data:"cId="+cId,
			type:"GET",
			success : function(result) {
				console.log(result.extend.tasks);
				var tasks=result.extend.tasks;
				$.each(tasks,function(index, item) {
					var checkBoxTd = $("<td><input type='checkbox' class='check_task_item'/></td>");
					var NameTd = $("<td></td>").append(item.content);
					var StudentIdTd = $("<td></td>").append(item.sId);
					var SizeTd = $("<td></td>").append(item.name);
					var name=APP_PATH+"/upload/"+item.content;
					var downBtn = $("<button>下载</button>").addClass("btn btn-primary btn-sm download_task_btn");
					downBtn.attr("name",name);
					var delBtn = $("<button>删除</button>").addClass("btn btn-danger btn-sm delete_task_btn");
					delBtn.attr("delTask-name",item.content);
					var btnTd=$("<td></td>").append(downBtn).append(" ").append(delBtn);
					$("<tr></tr>").append(checkBoxTd)
					.append(NameTd)
					.append(StudentIdTd)
					.append(SizeTd)
					.append(btnTd)
					.appendTo("#task_table tbody");
				});
			}				
		});
	}
	//作业下载
	$(document).on("click",".download_task_btn",function(){
		var name = $(this).attr("name");
		window.parent.location.href = name;
	})
	//作业删除
	$(document).on("click",".delete_task_btn",function(){
		var name=$(this).attr("delTask-name");
		if(confirm("确认要删除【"+name+"】吗？")){
			$.ajax({
				url:APP_PATH+"/delTask",
				type:"GET",
				data:"Name="+name,
				success:function(result){
					if (result.code==100) {
						alert("删除成功");
						window.parent.location.href = "Teacher_curriculum?cId="+cId+"&id="+userId;
					} else {
						alert("删除失败！");
					}
				}
			});
		}
		
	})
	
	//作业批量删除
	$(document).on("click","#del_All",function(){
		var taskNames = "";
		var a=new Array();
		$.each($(".check_task_item:checked"),function(){
			taskNames += $(this).parents("tr").find("td:eq(1)").text()+",";
		});
		//去除taskNames多余的逗号
		Names = taskNames.substring(0,taskNames.length-1);
		if(confirm("确认要删除【"+Names+"】吗？")){
			$.ajax({
				url:APP_PATH+"/delAll",
				type:"GET",
				data:"Names="+Names,
				success:function(result){
					if (result.code==100) {
						alert("删除成功");
						window.parent.location.href = "Teacher_curriculum?cId="+cId+"&id="+userId;
					} else {
						alert("删除失败！");
					}
				}
			});
		}
	})
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
	//上传课程封面并展示
	function uploadFile(){
		var docObj = document.getElementById("file1");
		var imgObjPreview = document.getElementById("preview");
		if (docObj.files && docObj.files[0]) {
			//火狐下，直接设img属性
			imgObjPreview.style.display = 'block';
			imgObjPreview.style.width = '100px';
			imgObjPreview.style.height = '100px';
			//imgObjPreview.src = docObj.files[0].getAsDataURL();
			//火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
			imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
			$("#Curriculumform input[name=picName]").val(imgObjPreview.src);
		} else {
			//IE下，使用滤镜
			docObj.select();
			var imgSrc = document.selection.createRange().text;
			var localImagId = document.getElementById("localImag");
			//必须设置初始大小
			localImagId.style.width = "120px";
			localImagId.style.height = "120px";
			//图片异常的捕捉，防止用户修改后缀来伪造图片
			try {
				localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
				localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
			} catch (e) {
				alert("您上传的图片格式不正确，请重新选择!");
				return false;
			}
			imgObjPreview.style.display = 'none';
			document.selection.empty();
		}
		return true;
	}
	//课程修改
	$(document).on("click","#updateCurriculum",function(){
		var formData = new FormData(document.getElementById("Curriculumform"));
		var name=$("#creat_name").val();
		var system=$("#Curriculumform select").val();
		var major=$("#creat_major").val();
		var account=$("#creat_account").val();
		var credit=$("#creat_credit").val();
		formData.append("id",cId);
		formData.append("Name",name);
		formData.append("systems",system);
		formData.append("Major",major);
		formData.append("Account",account);
		formData.append("Credit",credit);	
		$.ajax({
			url : APP_PATH+"/updateCurriculum",
			type : "POST",
			dataType : "json",
			data : formData,
			cache: false,
            processData: false,
            contentType: false,
			success : function(result) {
				console.log(formData);
				if(result.code==100){
					alert("修改成功！");
					window.parent.location.href = "Teacher_curriculum?cId="+cId+"&id="+userId;
				}else{
					alert("修改失败！");
				}
				
			}
			
		});
	})
	function getApply(){
		$.ajax({
			url:APP_PATH+"/getApply",
			data:"cId="+cId,
			type:"GET",
			success:function(result){
				console.log(result);
				var clazz=result.extend.clazz;
				$.each(clazz,function(index, item) {
					var ApplyClIdTd="";
					var ApplyIdTd = $("<td></td>").append(item.sId);
					$.ajax({
						url:APP_PATH+"/getClassName",
						data:"clId="+item.clId,
						type:"GET",
						success:function(result1){
							console.log(result1.extend.name);
							var ApplyClIdTd = $("<td></td>").append(result1.extend.name);
							var delBtn = $("<button></button>").addClass("btn btn-danger btn-sm delete_Apply_btn")
							.append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("删除");
							//为删除按钮添加一个自定义属性，来表示当前id,name,clId
							delBtn.attr("delApply-id",item.sId);
							delBtn.attr("delApply-clId",item.clId);
							var agrBtn = $("<button></button>").addClass("btn btn-primary btn-sm agree_Apply_btn")
							.append($("<span></span>").addClass("glyphicon glyphicon-ok")).append("同意");
							//为删除按钮添加一个自定义属性，来表示当前id,name,clId
							agrBtn.attr("agr-id",item.sId);
							agrBtn.attr("agr-clId",item.clId);
							var btnTd = $("<td></td>").append(delBtn).append(" ").append(agrBtn);
							$("<tr></tr>").append(ApplyIdTd)
							.append(ApplyClIdTd)
							.append(btnTd)
							.appendTo("#Apply-table tbody");
						}
					})
				});
			}
		})
	}
	//删除申请
	$(document).on("click",".delete_Apply_btn",function(){
		var clId=$(this).attr("delApply-clId");
		var sId=$(this).attr("delApply-id");
		if(confirm("确认要删除"+sId+"的申请吗？")){
			$.ajax({
				url:APP_PATH+"/delApply",
				type:"GET",
				data:{
					"clId":clId,
					"sId":sId
				},
				success:function(result){
					if (result.code==100) {
						alert("删除成功");
						window.parent.location.href = "Teacher_curriculum?cId="+cId+"&id="+userId;
					} else {
						alert("删除失败！");
					}
				}
			});
		}
	})
	//同意申请
	$(document).on("click",".agree_Apply_btn",function(){
		var clId=$(this).attr("agr-clId");
		var sId=$(this).attr("agr-id");
		if(confirm("确认要同意"+sId+"的申请吗？")){
			$.ajax({
				url:APP_PATH+"/agrApply",
				type:"GET",
				data:{
					"clId":clId,
					"sId":sId
				},
				success:function(result){
					if (result.code==100) {
						alert("同意申请成功");
						window.parent.location.href = "Teacher_curriculum?cId="+cId+"&id="+userId;
					} else {
						alert("失败！");
					}
				}
			});
		}
	})
	//公告发布
	$(document).on("click","#saveNotice",function(){
		var title=$("#title").val();
		var content=$("#content").val();
		$.ajax({
			url:APP_PATH+"/saveNotice",
			type:"GET",
			data:{
				"title":title,
				"content":content,
				"cId":cId
			},
			success:function(result){
				if (result.code==100) {
					window.parent.location.href = "Teacher_curriculum?cId="+cId+"&id="+userId;
				} else {
					alert("失败！");
				}
			}
		});
	})
	//获取公告
	function getNotice(cId){
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
						var delBtn = $("<button></button>").addClass("btn btn-danger btn-sm delete_Notice_btn")
						.append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("删除").appendTo(div);
						delBtn.attr("delNotice-id",item.nId);	
					});
				} else {
					alert("失败！");
				}
			}
		});
	}
	//删除公告
	$(document).on("click",".delete_Notice_btn",function(){
		var nId=$(this).attr("delNotice-id");
		$.ajax({
			url:APP_PATH+"/delNotice",
			type:"GET",
			data:{
				"nId":nId
			},
			success:function(result){
				if (result.code==100) {
					alert("删除成功");
					window.parent.location.href = "Teacher_curriculum?cId="+cId+"&id="+userId;
				} else {
					alert("删除失败！");
				}
			}
		});
	})
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
					window.parent.location.href = "Teacher_curriculum?cId="+cId+"&id="+userId;
				} else {
					alert("添加失败！");
				}
			}
		})
	});