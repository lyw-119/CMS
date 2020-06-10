	$(function(){
		if(userType==1){
			$.ajax({
				url : APP_PATH+"/selectStudentByCId",
				data : {
					"id":userId,
					"cId":cId
				},
				type : "GET",
				success : function(result) {
					if(result.code==100){
						$("#enter").text("进入课程");
						$("#enter").attr("onclick","openStudent()");
					}else{
						$.ajax({
							url:APP_PATH+"/getApplyByStudent",
							data:"id="+userId,
							type:"GET",
							success:function(result1){
								if(result1.code==100){
									$("#enter").text("申请中");
									$("#enter").attr("disabled",true);
								}else{
									$("#enter").text("申请加入课程");
									$("#enter").attr("data-toggle","modal");
									$("#enter").attr("data-target","#Apply");
								}
							}
						})
						
					}
				}
			});
		}else if(userType==2){
			$("#enter").text("进入课程");
			$("#enter").attr("onclick","openTeacher()");
		}else{
			$("#enter").attr("disabled",true);
		}
		getClazz();
		getResource(1);
		getCurriculum();
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
				if(userType==2){
					$("#inputTeacherId").text(user.id);
					$("#inputTeacherName").val(user.name);
					$("#mydetails-2 input[name='gender']").val([user.gender]);
					$("#inputTeacherEmail").val(user.email);
					$("#mydetails-2 select").val([user.system]);
				}
				if(userType==1){
					$("#inputStduentId").text(user.id);
					$("#inputStudentName").val(user.name);
					$("#mydetails-1 input[name='gender']").val([user.gender]);
					$("#inputStudentEmail").val(user.email);
					$("#mydetails-1 select").val([user.system]);
					$("#inputStudentMajor").val(user.major);
				}else{
					$("#inputManagerId").text(user.id);
					$("#inputManagerName").val(user.name);
				}
			}
		});
	})
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
								window.parent.location.href = "details?cId="+cId+"&id="+userId;
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
					window.parent.location.href = "details?cId="+cId+"&id="+userId;
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
					window.parent.location.href = "details?cId="+cId+"&id="+userId;
				} else {
					alert("修改失败！");
				}
			}
		});
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
					window.parent.location.href = "details?cId="+cId+"&id="+userId;
				} else {
					alert("修改失败！");
				}
			}
		});
	});
	//课程信息
	function getCurriculum(){
		$.ajax({
			url:APP_PATH+"/getcurriculum",
			type:"GET",
			data:"cId="+cId,
			success:function(result){
				console.log(result);
				var cur=result.extend.curr;
				document.title=cur.name;
				$("#title").text(cur.name);
				if(cur.account==null){
					$("#content").text("无");
				}else{
					$("#content").text(cur.account);
				}
				$("#system").text(cur.system);
				$("#photo").attr("src",APP_PATH+"/upload/"+cur.photo);
				$("#major").text(cur.major);
				$.ajax({
					url:APP_PATH+"/getuser",
					data:{
						"id":cur.tId,
						"type":"2"
					},
					type:"GET",
					success:function(result1){
						var user=result1.extend.user;
						$("#creator").text(user.name);
					}
				})

			}
		})
	}
	//页面跳转
	function openStudent(){
		window.open("Student_curriculum?cId="+cId+"&id="+userId);
	}
	function openTeacher(){
		window.open("Teacher_curriculum?cId="+cId+"&id="+userId);
	}
	//获取课程资源
	function getResource(pn) {
		$.ajax({
			url : APP_PATH+"/getResource",
			data : {
				"pn":pn,
				"cId":cId
			},
			type : "GET",
			success : function(result) {
				console.log(result);
				//1.解析并显示资源数据
				build_resources_table(result);
				//2.解析并显示分页条
				build_resources_page_nav(result);
				//3.解析显示分页数据
				build_resources_page_info(result);
			}
		});
	}
	//资源数据
	function build_resources_table(result) {
		//清空table表格
		$("#resources_table").empty();

		var resources = result.extend.pageInfo.list;
		$.each(resources,function(index, item) {
			var name=APP_PATH+"/upload/"+item.content;
			var nameTR=$("<td></td>").append($("<h3><a href='"+name+"'>"+item.content+"</a></h3>"));
			var sizeTR=$("<td></td>").append(item.name);
			$("<tr></tr>").append(nameTR)
			.append(sizeTR)
			.appendTo("#resources_table");
		});
	}
	
	//资源分页信息
	function build_resources_page_info(result) {
		$("#page_info_area").empty();
		$("#page_info_area").append(
				"当前" + result.extend.pageInfo.pageNum + "页,总"
						+ result.extend.pageInfo.pages + "页,总"
						+ result.extend.pageInfo.total + "条记录");
		currentPage = result.extend.pageInfo.pageNum;
	}

	//资源分页条，超链接
	function build_resources_page_nav(result) {
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
				getResource(1);
			});
			prePageLi.click(function() {
				getResource(result.extend.pageInfo.pageNum - 1);
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
				getResource(result.extend.pageInfo.pageNum + 1);
			});
			lastPageLi.click(function() {
				getResource(result.extend.pageInfo.pages);
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
				getResource(item);
			})
			ul.append(numLi);
		});
		ul.append(nextPageLi).append(lastPageLi);

		var navEle = $("<nav></nav>").append(ul);
		navEle.appendTo("#page_nav_area");
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
	//获取班级信息
	function getClazz(){
		$.ajax({
			url:APP_PATH+"/getClazz",
			data:"cId="+cId,
			type:"GET",
			success : function(result) {
				var clazz=result.extend.clazz;
				$.each(clazz,function(index, item) {
					$("<option value='"+item.clId+"'></option>").append(item.name).appendTo("#cl_id");
				});
			}
		});
	}
	//申请加入课程
	function saveApply(){
		var clId=$("#cl_id").val();
		if(clId==""){
			alert("请选择班级！");
			return false;
		}
		$.ajax({
			url:APP_PATH+"/saveApply",
			data:{
				"clId":clId,
				"s_id":userId
			},
			type:"post",
			success:function(result){
				window.parent.location.href = "details?cId="+cId+"&id="+userId;
			}
		})
	}