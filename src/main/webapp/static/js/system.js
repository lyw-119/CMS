	$(function() {
		if(userType==3){
			to_Student_page(1);
			to_Teacher_page(1);
		}
		if(userType==2){to_Curriculum_page(userId);}
		if(userType==1){to_StudentCurriculum_page(userId);}	
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
				$("<span></span>").addClass("caret").appendTo("#dropdown1");
				if(userType==1){
					$("#inputStduentId").text(user.id);
					$("#inputStudentName").val(user.name);
					$("#mydetails-1 input[name='gender']").val([user.gender]);
					$("#inputStudentEmail").val(user.email);
					$("#mydetails-1 select").val([user.system]);
					$("#inputStudentMajor").val(user.major);
				}else if(userType==2){
					$("#inputTeacherId").text(user.id);
					$("#inputTeacherName").val(user.name);
					$("#mydetails-2 input[name='gender']").val([user.gender]);
					$("#inputTeacherEmail").val(user.email);
					$("#mydetails-2 select").val([user.system]);
				}else{
					
					$("#inputManagerId").text(user.id);
					$("#inputManagerName").val(user.name);
				}
				
			}
		});
		to_ALLCurriculum_page();
	});
	//返回按钮点击事件
	$(document).on("click","#backStudent",function(){
		to_Student_page(1);
		$("#inputStudent").val("");
	});
	$(document).on("click","#backTeacher",function(){
		to_Teacher_page(1);
		$("#inputTeacher").val("");
	});
	//学生数据请求
	function to_Student_page(pn) {
		$.ajax({
			url : APP_PATH+"/students",
			data : "pn=" + pn,
			type : "GET",
			success : function(result) {
				console.log(result);
				//1.解析并显示学生数据
				build_student_table(result);
				//2.解析并显示分页条
				build_student_page_nav(result);
				//3.解析显示分页数据
				build_student_page_info(result);
			}
		});
	}
	//学生数据
	function build_student_table(result) {
		//清空table表格
		$("#student_table tbody").empty();

		var stu = result.extend.pageInfo.list;
			$.each(stu,function(index, item) {	
				var idTd = $("<td></td>").append(item.id);
				var nameTd = $("<td></td>").append(item.name);
				var genderTd = $("<td></td>").append(item.gender == 'M' ? '男' : '女');
				var emailTd = $("<td></td>").append(item.email);
				var systemTd = $("<td></td>").append(item.system);
				var majorTd = $("<td></td>").append(item.major);

				var delBtn = $("<button></button>").addClass("btn btn-danger btn-sm delete_btn")
						.append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("删除");

				delBtn.attr("del-student-id", item.id);

				var btnTd = $("<td></td>").append(delBtn);

				$("<tr></tr>").append(idTd)
						.append(nameTd)
						.append(genderTd).append(emailTd)
						.append(systemTd).append(majorTd)
						.append(btnTd)
						.appendTo("#student_table tbody");
						});
	}
	
	//学生分页信息
	function build_student_page_info(result) {
		$("#page_info_area").empty();
		$("#page_info_area").append(
				"当前" + result.extend.pageInfo.pageNum + "页,总"
						+ result.extend.pageInfo.pages + "页,总"
						+ result.extend.pageInfo.total + "条记录");
		currentPage = result.extend.pageInfo.pageNum;
	}

	//学生分页条，超链接
	function build_student_page_nav(result) {
		$("#page_nav_area").empty();
		var ul = $("<ul></ul>").addClass("pagination");
		var firstPageLi = $("<li></li>").append(
				$("<a></a>").append("首页").attr("href", "#"));
		var prePageLi = $("<li></li>").append(
				$("<a></a>").append("&laquo;"));
		if (result.extend.pageInfo.hasPreviousPage == false) {
			firstPageLi.addClass("disabled");
			prePageLi.addClass("disabled");
		} else {
			//为元素添加点击翻页的事件
			firstPageLi.click(function() {
				to_Student_page(1);
			});
			prePageLi.click(function() {
				to_Student_page(result.extend.pageInfo.pageNum - 1);
			});
		}

		var nextPageLi = $("<li></li>").append(
				$("<a></a>").append("&raquo;"));
		var lastPageLi = $("<li></li>").append(
				$("<a></a>").append("末页").attr("href", "#"));
		if (result.extend.pageInfo.hasNextPage == false) {
			nextPageLi.addClass("disabled");
			lastPageLi.addClass("disabled");
		} else {
			nextPageLi.click(function() {
				to_Student_page(result.extend.pageInfo.pageNum + 1);
			});
			lastPageLi.click(function() {
				to_Student_page(result.extend.pageInfo.pages);
			});
		}

		ul.append(firstPageLi).append(prePageLi);
		$.each(result.extend.pageInfo.navigatepageNums, function(index,
				item) {
			var numLi = $("<li></li>")
					.append($("<a></a>").append(item));
			if (result.extend.pageInfo.pageNum == item) {
				numLi.addClass("active");
			}
			numLi.click(function() {
				to_Student_page(item);
			})
			ul.append(numLi);
		});
		ul.append(nextPageLi).append(lastPageLi);

		var navEle = $("<nav></nav>").append(ul);
		navEle.appendTo("#page_nav_area");
	}
	//教师分页数据请求
	function to_Teacher_page(pn) {
		$.ajax({
			url : APP_PATH+"/teachers",
			data : "pn=" + pn,
			type : "GET",
			success : function(result) {
				console.log(result);
				//1.解析并显示员工数据
				build_teacher_table(result);
				//2.解析并显示分页条
				build_teacher_page_nav(result);
				//3.解析显示分页数据
				build_teacher_page_info(result);
			}
		});
	}
	//教师分页数据	
	function build_teacher_table(result) {
		//清空table表格
		$("#teacher_table tbody").empty();

		var stu = result.extend.pageInfo.list;
		$.each(stu,function(index, item) {
			var idTd = $("<td></td>").append(item.id);
			var nameTd = $("<td></td>").append(item.name);
			var genderTd = $("<td></td>").append(item.gender == 'M' ? '男' : '女');
			var emailTd = $("<td></td>").append(item.email);
			var systemTd = $("<td></td>").append(item.system);

			var delBtn = $("<button></button>").addClass("btn btn-danger btn-sm delete_btn1")
					.append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("删除");

			delBtn.attr("del-teacher-id", item.id);

			var btnTd = $("<td></td>").append(delBtn);

			$("<tr></tr>").append(idTd)
					.append(nameTd)
					.append(genderTd).append(emailTd)
					.append(systemTd)
					.append(btnTd)
					.appendTo("#teacher_table tbody");
					});
	}
	
	//教师分页信息
	function build_teacher_page_info(result) {
		$("#page_info_area1").empty();
		$("#page_info_area1").append(
				"当前" + result.extend.pageInfo.pageNum + "页,总"
						+ result.extend.pageInfo.pages + "页,总"
						+ result.extend.pageInfo.total + "条记录");
	}

	//教师分页条，超链接
	function build_teacher_page_nav(result) {
		$("#page_nav_area1").empty();
		var ul = $("<ul></ul>").addClass("pagination");
		var firstPageLi = $("<li></li>").append(
				$("<a></a>").append("首页").attr("href", "#"));
		var prePageLi = $("<li></li>").append(
				$("<a></a>").append("&laquo;"));
		if (result.extend.pageInfo.hasPreviousPage == false) {
			firstPageLi.addClass("disabled");
			prePageLi.addClass("disabled");
		} else {
			//为元素添加点击翻页的事件
			firstPageLi.click(function() {
				to_Teacher_page(1);
			});
			prePageLi.click(function() {
				to_Teacher_page(result.extend.pageInfo.pageNum - 1);
			});
		}

		var nextPageLi = $("<li></li>").append(
				$("<a></a>").append("&raquo;"));
		var lastPageLi = $("<li></li>").append(
				$("<a></a>").append("末页").attr("href", "#"));
		if (result.extend.pageInfo.hasNextPage == false) {
			nextPageLi.addClass("disabled");
			lastPageLi.addClass("disabled");
		} else {
			nextPageLi.click(function() {
				to_Teacher_page(result.extend.pageInfo.pageNum + 1);
			});
			lastPageLi.click(function() {
				to_Teacher_page(result.extend.pageInfo.pages);
			});
		}

		ul.append(firstPageLi).append(prePageLi);
		$.each(result.extend.pageInfo.navigatepageNums, function(index,
				item) {
			var numLi = $("<li></li>")
					.append($("<a></a>").append(item));
			if (result.extend.pageInfo.pageNum == item) {
				numLi.addClass("active");
			}
			numLi.click(function() {
				to_Teacher_page(item);
			})
			ul.append(numLi);
		});
		ul.append(nextPageLi).append(lastPageLi);

		var navEle = $("<nav></nav>").append(ul);
		navEle.appendTo("#page_nav_area1");
	}
	
	//修改密码
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
								window.parent.location.href = "system?userType="+type+"&id="+id;
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
	//学生条件查询
	$(document).on("click","#selectStudent",function(){
		to_select_page(1);
	});
	function to_select_page(pn){
		var select=$("#searchforStudent").val();
		var contend=$("#inputStudent").val();
		if(contend==""){
			alert("请输入查询内容");
			return false;
		}
		$.ajax({
			url : APP_PATH+"/getSelectStudent",
			data : {
				"pn":pn,
				"select":select,
				"contend":contend,
				},
			type : "GET",
			success : function(result) {
				console.log(result);
				//1.解析并显示学生数据
				build_student1_table(result);
				//2.解析并显示分页条
				build_student1_page_nav(result);
				//3.解析显示分页数据
				build_student1_page_info(result);
			}
		});
	}
	//学生数据
	function build_student1_table(result) {
		//清空table表格
		$("#student_table tbody").empty();

		var stu = result.extend.pageInfo.list;
			$.each(stu,function(index, item) {	
				var idTd = $("<td></td>").append(item.id);
				var nameTd = $("<td></td>").append(item.name);
				var genderTd = $("<td></td>").append(item.gender == 'M' ? '男' : '女');
				var emailTd = $("<td></td>").append(item.email);
				var systemTd = $("<td></td>").append(item.system);
				var majorTd = $("<td></td>").append(item.major);

				var delBtn = $("<button></button>").addClass("btn btn-danger btn-sm delete_btn")
						.append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("删除");

				delBtn.attr("del-student-id", item.id);

				var btnTd = $("<td></td>").append(delBtn);

				$("<tr></tr>").append(idTd)
						.append(nameTd)
						.append(genderTd).append(emailTd)
						.append(systemTd).append(majorTd)
						.append(btnTd)
						.appendTo("#student_table tbody");
						});
	}
	
	//学生分页信息
	function build_student1_page_info(result) {
		$("#page_info_area").empty();
		$("#page_info_area").append(
				"当前" + result.extend.pageInfo.pageNum + "页,总"
						+ result.extend.pageInfo.pages + "页,总"
						+ result.extend.pageInfo.total + "条记录");
		currentPage = result.extend.pageInfo.pageNum;
	}

	//学生分页条，超链接
	function build_student1_page_nav(result) {
		$("#page_nav_area").empty();
		var ul = $("<ul></ul>").addClass("pagination");
		var firstPageLi = $("<li></li>").append(
				$("<a></a>").append("首页").attr("href", "#"));
		var prePageLi = $("<li></li>").append(
				$("<a></a>").append("&laquo;"));
		if (result.extend.pageInfo.hasPreviousPage == false) {
			firstPageLi.addClass("disabled");
			prePageLi.addClass("disabled");
		} else {
			//为元素添加点击翻页的事件
			firstPageLi.click(function() {
				to_select_page(1);
			});
			prePageLi.click(function() {
				to_select_page(result.extend.pageInfo.pageNum - 1);
			});
		}

		var nextPageLi = $("<li></li>").append(
				$("<a></a>").append("&raquo;"));
		var lastPageLi = $("<li></li>").append(
				$("<a></a>").append("末页").attr("href", "#"));
		if (result.extend.pageInfo.hasNextPage == false) {
			nextPageLi.addClass("disabled");
			lastPageLi.addClass("disabled");
		} else {
			nextPageLi.click(function() {
				to_select_page(result.extend.pageInfo.pageNum + 1);
			});
			lastPageLi.click(function() {
				to_select_page(result.extend.pageInfo.pages);
			});
		}

		ul.append(firstPageLi).append(prePageLi);
		$.each(result.extend.pageInfo.navigatepageNums, function(index,
				item) {
			var numLi = $("<li></li>")
					.append($("<a></a>").append(item));
			if (result.extend.pageInfo.pageNum == item) {
				numLi.addClass("active");
			}
			numLi.click(function() {
				to_select_page(item);
			})
			ul.append(numLi);
		});
		ul.append(nextPageLi).append(lastPageLi);

		var navEle = $("<nav></nav>").append(ul);
		navEle.appendTo("#page_nav_area");
	}
	//教师条件查询
	$(document).on("click","#selectTeacher",function(){
		to_select_page1(1);
	});
	function to_select_page1(pn){
		var select=$("#selectforTeacher").val();
		var contend=$("#inputTeacher").val();
		if(contend==""){
			alert("请输入查询内容");
			return false;
		}
		$.ajax({
			url : APP_PATH+"/getSelectTeacher",
			data : {
				"pn":pn,
				"select":select,
				"contend":contend,
				},
			type : "GET",
			success : function(result) {
				console.log(result);
				//1.解析并显示学生数据
				build_teacher1_table(result);
				//2.解析并显示分页条
				build_teacher1_page_nav(result);
				//3.解析显示分页数据
				build_teacher1_page_info(result);
			}
		});
	}
	//教师分页数据	
	function build_teacher1_table(result) {
		//清空table表格
		$("#teacher_table tbody").empty();

		var stu = result.extend.pageInfo.list;
		$.each(stu,function(index, item) {
			var idTd = $("<td></td>").append(item.id);
			var nameTd = $("<td></td>").append(item.name);
			var genderTd = $("<td></td>").append(item.gender == 'M' ? '男' : '女');
			var emailTd = $("<td></td>").append(item.email);
			var systemTd = $("<td></td>").append(item.system);

			var delBtn = $("<button></button>").addClass("btn btn-danger btn-sm delete_btn1")
					.append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("删除");

			delBtn.attr("del-teacher-id", item.id);

			var btnTd = $("<td></td>").append(delBtn);

			$("<tr></tr>").append(idTd)
					.append(nameTd)
					.append(genderTd).append(emailTd)
					.append(systemTd)
					.append(btnTd)
					.appendTo("#teacher_table tbody");
					});
	}
	
	//教师分页信息
	function build_teacher1_page_info(result) {
		$("#page_info_area1").empty();
		$("#page_info_area1").append(
				"当前" + result.extend.pageInfo.pageNum + "页,总"
						+ result.extend.pageInfo.pages + "页,总"
						+ result.extend.pageInfo.total + "条记录");
	}

	//教师分页条，超链接
	function build_teacher1_page_nav(result) {
		$("#page_nav_area1").empty();
		var ul = $("<ul></ul>").addClass("pagination");
		var firstPageLi = $("<li></li>").append(
				$("<a></a>").append("首页").attr("href", "#"));
		var prePageLi = $("<li></li>").append(
				$("<a></a>").append("&laquo;"));
		if (result.extend.pageInfo.hasPreviousPage == false) {
			firstPageLi.addClass("disabled");
			prePageLi.addClass("disabled");
		} else {
			//为元素添加点击翻页的事件
			firstPageLi.click(function() {
				to_select_page1(1);
			});
			prePageLi.click(function() {
				to_select_page1(result.extend.pageInfo.pageNum - 1);
			});
		}

		var nextPageLi = $("<li></li>").append(
				$("<a></a>").append("&raquo;"));
		var lastPageLi = $("<li></li>").append(
				$("<a></a>").append("末页").attr("href", "#"));
		if (result.extend.pageInfo.hasNextPage == false) {
			nextPageLi.addClass("disabled");
			lastPageLi.addClass("disabled");
		} else {
			nextPageLi.click(function() {
				to_select_page1(result.extend.pageInfo.pageNum + 1);
			});
			lastPageLi.click(function() {
				to_select_page1(result.extend.pageInfo.pages);
			});
		}

		ul.append(firstPageLi).append(prePageLi);
		$.each(result.extend.pageInfo.navigatepageNums, function(index,
				item) {
			var numLi = $("<li></li>")
					.append($("<a></a>").append(item));
			if (result.extend.pageInfo.pageNum == item) {
				numLi.addClass("active");
			}
			numLi.click(function() {
				to_select_page1(item);
			})
			ul.append(numLi);
		});
		ul.append(nextPageLi).append(lastPageLi);

		var navEle = $("<nav></nav>").append(ul);
		navEle.appendTo("#page_nav_area1");
	}
	
	//刪除学生点击事件
	$(document).on("click",".delete_btn",function(){
		var Name = $(this).parents("tr").find("td:eq(1)").text();
		var id = $(this).attr("del-student-id");
		if(confirm("确认删除"+Name+"么？")){
			$.ajax({
				url:APP_PATH+"/delStudent/"+id,
				type:"DELETE",
				success:function(result){
					alert(result.msg);
					to_Student_page(1);
				}
			});
		}
	});
	//删除教师点击事件
	$(document).on("click",".delete_btn1",function(){
		var Name = $(this).parents("tr").find("td:eq(1)").text();
		var id = $(this).attr("del-teacher-id");
		if(confirm("确认删除"+Name+"么？")){
			$.ajax({
				url:APP_PATH+"/delTeacher/"+id,
				type:"DELETE",
				success:function(result){
					alert(result.msg);
					to_Teacher_page(1);
				}
			});
		}
	});
	//修改管理员个人资料
	$(document).on("click","#updateManager",function(){
		var manager=$("#Managerform").serialize();
		$.ajax({
			url:APP_PATH+"/updateManager/"+userId,
			type:"POST",
			data:manager,
			success:function(result){
				if (result.code==100) {
					alert("修改成功");
					window.parent.location.href = "system?userType=3&id="+userId;
				} else {
					alert("修改失败！");
				}
			}
		});
	});
	//修改学生个人资料
	$(document).on("click","#updateStudent",function(){
		var student=$("#Studentform").serialize();
		$.ajax({
			url:APP_PATH+"/updateStudent/"+userId,
			type: "POST",
			data: student,
			success:function(result){
				if (result.code==100) {
					alert("修改成功");
					window.parent.location.href = "system?userType=1&id="+userId;
				} else {
					alert("修改失败！");
				}
			}
		});
	});
	//修改教师个人资料
	$(document).on("click","#updateTeacher",function(){
		var student=$("#Teacherform").serialize();
		$.ajax({
			url:APP_PATH+"/updateTeacher/"+userId,
			type: "POST",
			data: student,
			success:function(result){
				if (result.code==100) {
					alert("修改成功");
					window.parent.location.href = "system?userType=2&id="+userId;
				} else {
					alert("修改失败！");
				}
			}
		});
	});
	//课程编号检验
	var creat_result=false;
	function isCoursenameExist(val){
		var check=/(^[a-zA-Z0-9]{4,8})/;
		var check1=/(^[a-zA-Z][a-zA-Z0-9])/;
		if(!val.match(check)){
			$("#Check").hide();
			$("#Checklen").show();
			creat_result=$("#Checklen").text();
		}else if(!val.match(check1)){
			$("#Check").hide();
			$("#Checklen").hide();
			$("#Format").show();
			creat_result=$("#Format").text();
		}else{
			$.ajax({
				url:APP_PATH+"/checkCId",
				type: "POST",
				data: "id="+val,
				success:function(result){
					console.log(result);
					if (result.code==100) {
						$("#Check").hide();
						$("#Checklen").hide();
						$("#Format").hide();
						$("#showIsExist").hide();
						$("#showIsExist1").show();
						creat_result="success";
					} else {
						$("#Check").hide();
						$("#Checklen").hide();
						$("#Format").hide();
						$("#showIsExist1").hide();
						$("#showIsExist").show();
						creat_result=$("#showIsExist").text();
					}
					return creat_result;
				}
			});
		}				
	}
	//上传课程封面并展示
	function uploadFile(){
		var docObj = document.getElementById("file");
		var imgObjPreview = document.getElementById("preview");
		if (docObj.files && docObj.files[0]) {
			//火狐下，直接设img属性
			imgObjPreview.style.display = 'block';
			imgObjPreview.style.width = '100px';
			imgObjPreview.style.height = '100px';
			//imgObjPreview.src = docObj.files[0].getAsDataURL();
			//火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
			imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
			$("#creat input[name=picName]").val(imgObjPreview.src);
		} else {
			//IE下，使用滤镜
			docObj.select();
			var imgSrc = document.selection.createRange().text;
			var localImagId = document.getElementById("localImag");
			//必须设置初始大小
			localImagId.style.width = "150px";
			localImagId.style.height = "180px";
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
	//课程创建
	$(document).on("click","#creat_btn",function(){
		var formData = new FormData(document.getElementById("creatform"));
		var cId =$("#creat_id").val();
		var name=$("#creat_name").val();
		var system=$("#creatform select").val();
		var major=$("#creat_major").val();
		var account=$("#creat_account").val();
		var credit=$("#creat_credit").val();
		var photo=$("#photo").val();
		var tId=userId;
		formData.append("id",cId);
		formData.append("Name",name);
		formData.append("systems",system);
		formData.append("Major",major);
		formData.append("Account",account);
		formData.append("Credit",credit);
		formData.append("Photo",photo);
		formData.append("TId",tId);
		if(creat_result!="success"){
			alert("课程编号有误"+creat_result);
			return false;
		}
		$.ajax({
			url : APP_PATH+"/creatCurriculum",
			type : "POST",
			dataType : "json",
			data : formData,
			cache: false,
            processData: false,
            contentType: false,
			success : function(result) {
				console.log(formData);
				if(result.code==100){
					alert("添加成功！");
					window.parent.location.href = "system?userType=2&id="+userId;
				}else{
					alert("添加失败！");
				}
				
			}
			
		});
	})
	//遍历课程信息
	function to_Curriculum_page(id){
		$.ajax({
			url : APP_PATH+"/selectCurriculum",
			data : "id=" + id,
			type : "GET",
			success : function(result) {
				console.log(result);
				build_curriculum_table(result);
				build_curriculum_table1(result);
			}
		});
	}
	//遍历创建的课程信息
	function build_curriculum_table(result) {
		var cur = result.extend.curr;
			$.each(cur,function(index, item) {
				var photoname=APP_PATH+"/upload/"+item.photo;
				var id = $("<tr></tr>").append(item.cId);
				getNotice(item.cId);
				var name = $("<tr></tr>").append(item.name);
				var photo = $("<tr></tr>").append($("<a href='"+APP_PATH+"/details?cId="+item.cId+"&id="+item.tId+"' target='_blank'><img src='"+photoname+"' style='width:200px;height:160px;'></a>"));
				var system = $("<tr></tr>").append(item.system);
				var major = $("<tr></tr>").append(item.major);
				var credit=$("<tr></tr>").append(item.credit);
				var tId=$("<tr></tr>").append(item.tId);
				var editBtn = $("<button></button>").addClass("btn btn-info btn-sm edit_curriculum_btn")
								.append($("<span></span>").addClass("glyphicon glyphicon-wrench")).append("进入课程");
				editBtn.attr("edit-curriculum-id",item.cId);			
				var delBtn = $("<button></button>").addClass("btn btn-danger btn-sm delete_curriculum_btn")
								.append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("注销");
				delBtn.attr("del-curriculum-id",item.cId);
				delBtn.attr("del-curriculum-name",item.name);
				
				var btnTd = $("<tr></tr>").append(editBtn).append("&nbsp;").append(delBtn);
				$("<div class='col-md-3'><table class='table table-bordered'></table></div>").append(id)
						.append(name)
						.append(photo)
						.append(system).append(major).append(credit)
						.append(tId).append(btnTd)
						.appendTo("#curriculum_table");
			});
	}
	//遍历管理的课程信息
	function build_curriculum_table1(result) {
		var cur = result.extend.curr;
			$.each(cur,function(index, item) {
				var photoname=APP_PATH+"/upload/"+item.photo;
				var id = $("<tr></tr>").append(item.cId);
				var name = $("<tr></tr>").append(item.name);
				var photo = $("<tr></tr>").append($("<a href='"+APP_PATH+"/details?cId="+item.cId+"&userType=2&id="+item.tId+"' target='_blank'><img src='"+photoname+"' style='width:200px;height:160px;'></a>"));
				var system = $("<tr></tr>").append(item.system);
				var major = $("<tr></tr>").append(item.major);
				var credit=$("<tr></tr>").append(item.credit);
				var tId=$("<tr></tr>").append(item.tId);
				var editBtn = $("<button></button>").addClass("btn btn-info btn-sm edit_curriculum_btn")
								.append($("<span></span>").addClass("glyphicon glyphicon-wrench")).append("进入课程");
				editBtn.attr("edit-curriculum-id",item.cId);
				var btnTd = $("<tr></tr>").append(editBtn);
				$("<div class='col-md-3'><table class='table table-bordered'></table></div>").append(id)
						.append(name)
						.append(photo)
						.append(system).append(major).append(credit)
						.append(tId).append(btnTd)
						.appendTo("#curriculum_table1");
			});
	}
	//教师删除所创建的课程
	$(document).on("click",".delete_curriculum_btn",function(){
		//1.弹出是否确认删除对话框
		var curName = $(this).attr("del-curriculum-name");
		var curId = $(this).attr("del-curriculum-id");
		if(confirm("确认删除"+curName+"吗？")){
			//确认发送ajax请求
			$.ajax({
				url:APP_PATH+"/del_curriculum/"+curId,
				type:"DELETE",
				success:function(result){
					alert(result.msg);
					window.parent.location.href = "system?userType=2&id="+userId;
				}
			});
		}
	});
	//遍历学生学习的课程
	function to_StudentCurriculum_page(id){
		$.ajax({
			url : APP_PATH+"/selectStudentClass",
			data : "id=" + id,
			type : "GET",
			success : function(result) {
				console.log(result);
				build_student_curriculum_table(result);
			}
		});
	}
	function build_student_curriculum_table(result) {
		var cur = result.extend.student_curr;
			$.each(cur,function(index, item) {
				var photoname=APP_PATH+"/upload/"+item.photo;
				var id = $("<tr></tr>").append(item.cId);
				getNotice1(item.cId);
				var name = $("<tr></tr>").append(item.name);
				var photo = $("<tr></tr>").append($("<a href='"+APP_PATH+"/details?cId="+item.cId+"&userType=1&id="+userId+"' target='_blank'><img src='"+photoname+"' style='width:200px;height:160px;'></a>"));
				var system = $("<tr></tr>").append(item.system);
				var major = $("<tr></tr>").append(item.major);
				var credit=$("<tr></tr>").append(item.credit);
				var tId=$("<tr></tr>").append(item.tId);
				var editBtn = $("<button></button>").addClass("btn btn-info btn-sm edit_btn")
								.append($("<span></span>").addClass("glyphicon glyphicon-wrench")).append("进入课程");
				editBtn.attr("edit-id",item.cId);			
				var delBtn = $("<button></button>").addClass("btn btn-danger btn-sm delete_stduent_curriculum_btn")
								.append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("删除");
				delBtn.attr("del-curriculum-id",item.cId);
				delBtn.attr("del-curriculum-name",item.name);
				
				var btnTd = $("<tr></tr>").append(editBtn).append("&nbsp;").append(delBtn);
				$("<div class='col-md-3'><table class='table table-bordered'></table></div>").append(id)
						.append(name)
						.append(photo)
						.append(system).append(major).append(credit)
						.append(tId).append(btnTd)
						.appendTo("#student_curriculum_table");
			});
	}
	//进入课程
	$(document).on("click",".edit_curriculum_btn",function(){
		var curId = $(this).attr("edit-curriculum-id");		
		window.open("Teacher_curriculum?cId="+curId+"&id="+userId);
	});
	$(document).on("click",".edit_btn",function(){
		var curId = $(this).attr("edit-id");		
		window.open("Student_curriculum?cId="+curId+"&id="+userId);
	});
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
					console.log(result);
				} 
			}
		});
	}
	//学生获取公告
	function getNotice1(cId){
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
						var div=$("<div class='col-md-10'></div>").appendTo("#all-notice-student");
						$("<h4 style='font-weight: bold;'></h4>").append(item.title).appendTo(div);
						$("<p></p>").append(item.content).appendTo(div);
						$("<p></p>").append(item.time).appendTo(div);
					});
				}
			}
		});
	}
	function system(){
		window.parent.location.href = "system?userType=2&id="+userId;
	}
	//遍历全部课程
	function to_ALLCurriculum_page(){
		$.ajax({
			url : APP_PATH+"/selectAllCurriculum",
			type : "GET",
			success : function(result) {
				console.log(result);
				build_all_curriculum_table(result);
			}
		});
	}
	function build_all_curriculum_table(result) {
		var cur = result.extend.curr;
			$.each(cur,function(index, item) {
				var photoname=APP_PATH+"/upload/"+item.photo;
				var id = $("<tr></tr>").append(item.cId);
				getNotice1(item.cId);
				var name = $("<tr></tr>").append(item.name);
				var photo = $("<tr></tr>").append($("<a href='"+APP_PATH+"/details?cId="+item.cId+"&userType=1&id="+userId+"' target='_blank'><img src='"+photoname+"' style='width:200px;height:160px;'></a>"));
				var system = $("<tr></tr>").append(item.system);
				var major = $("<tr></tr>").append(item.major);
				var credit=$("<tr></tr>").append(item.credit);
				var tId=$("<tr></tr>").append(item.tId);				
				$("<div class='col-md-3'><table class='table table-bordered'></table></div>").append(id)
						.append(name)
						.append(photo)
						.append(system).append(major).append(credit)
						.append(tId)
						.appendTo("#all_curriculum_table");
			});
	}