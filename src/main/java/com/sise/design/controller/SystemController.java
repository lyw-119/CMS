package com.sise.design.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sise.design.bean.Manager;
import com.sise.design.bean.Msg;
import com.sise.design.bean.Notice;
import com.sise.design.bean.Student;
import com.sise.design.bean.Teacher;
import com.sise.design.service.ManagerService;
import com.sise.design.service.NoticeService;
import com.sise.design.service.StudentService;
import com.sise.design.service.TeacherService;
import com.sise.design.util.CodeCaptchaServlet;

@Controller
public class SystemController {
	
	@Autowired
	StudentService studentService;

	@Autowired
	TeacherService teacherService;
	
	@Autowired
	ManagerService managerService;
	
	@Autowired
	NoticeService noticeService;
	
	@Autowired
	private HttpServletRequest request; // 自动注入request
	
	@RequestMapping("/login")
	public String to_login() {
		return "login";
	}
	@RequestMapping("/FirstPage")
	public String to_firstpage() {
		return "FirstPage";
	}
	@RequestMapping("/details")
	public String to_details() {
		return "details";
	}
	@RequestMapping("/Teacher_curriculum")
	public String to_curriculum() {
		return "Teacher_curriculum";
	}
	@RequestMapping("/Student_curriculum")
	public String to_Student_curriculum() {
		return "Student_curriculum";
	}
	@RequestMapping("/system")
	public String to_student() {
		return "system";
	}
	@RequestMapping("/register")
	public String to_register() {
		return "register";
	}
	@RequestMapping("/logout")
	public String logout() {
		request.getSession().invalidate();;
		return "redirect:login";
	}
	
	@RequestMapping("/checkCode")
	@ResponseBody
	public Map<String, Object> checkCode(Model model, @RequestParam(value = "code", required = false) String code) {
		Map<String, Object> map = new HashMap<String, Object>();
		String vcode = (String) request.getSession().getAttribute(CodeCaptchaServlet.VERCODE_KEY);
		if (code.equals(vcode)) {
			// 验证码正确
			map.put("message", "success");
		} else {
			// 验证码错误
			map.put("message", "fail");
		}
		return map;
	}
	
	@RequestMapping("/logincheck")
	@ResponseBody
	public Map<String, String> login(@RequestParam(value = "id", required = true) String Id,
			@RequestParam(value = "password", required = true) String password,
			@RequestParam(value = "code", required = true) String code,
			@RequestParam(value = "type", required = true) int type, HttpServletRequest request) {
		 
		Map<String, String> map = new HashMap<String, String>();
		if (StringUtils.isEmpty(Id)) {
			map.put("type", "error");
			map.put("msg", "用户名不能为空!");
			return map;
		}
		
		if (StringUtils.isEmpty(password)) {
			map.put("type", "error");
			map.put("msg", "密码不能为空!");
			return map;
		}
		if (StringUtils.isEmpty(code)) {
			map.put("type", "error");
			map.put("msg", "验证码不能为空!");
			return map;
		}
		String vcode = (String) request.getSession().getAttribute(CodeCaptchaServlet.VERCODE_KEY);
		if (StringUtils.isEmpty(vcode)) {
			map.put("type", "error");
			map.put("msg", "长时间未操作，会话已失效，请刷新后重试!");
			return map;
		}
		if (!code.equals(vcode)) {
			map.put("type", "error");
			map.put("msg", "验证码错误!");
			return map;
		}		
		request.getSession().setAttribute("loginCpacha", null);
		// 从数据库中去查找用户
		if (type == 1) {
			// 学生
			int id=Integer.parseInt(Id);
			Student stu = studentService.logincheck(id);			
			if (stu == null) {
				map.put("type", "error");
				map.put("msg", "不存在该学生!");
				System.out.println(map);
				return map;
			}
			if (!password.equals(stu.getPassword())) {
				map.put("type", "error");
				map.put("msg", "密码错误!");
				return map;
			}
			request.getSession().setAttribute("user", stu);
			request.getSession().setAttribute("userType", type);
		}else if (type == 2) { // 老师
			int id=Integer.parseInt(Id);
			Teacher teacher = teacherService.logincheck(id);
			if (teacher == null) {
				map.put("type", "error");
				map.put("msg", "不存在该老师!");
				return map;
			}
			if (!password.equals(teacher.getPassword())) {
				map.put("type", "error");
				map.put("msg", "密码错误!");
				return map;
			}
			request.getSession().setAttribute("user", teacher);
			request.getSession().setAttribute("userType", type);
		}else if (type == 3) { // 管理员
			int id=Integer.parseInt(Id);
			Manager manager = managerService.logincheck(id);
			if (manager == null) {
				map.put("type", "error");
				map.put("msg", "不存在该管理员!");
				return map;
			}
			if (!password.equals(manager.getPassword())) {
				map.put("type", "error");
				map.put("msg", "密码错误!");
				return map;
			}
			request.getSession().setAttribute("user", manager);
			request.getSession().setAttribute("userType", type);
		}
		
		map.put("type", "success");
		map.put("msg", "登录成功!");
		System.out.println(request.getSession().getAttribute("user"));
		System.out.println(map);
		return map;
	}
	
	@RequestMapping("/changePassword")
	@ResponseBody
	public Msg changePassword(@RequestParam(value = "pw", required = true) String pw,
			@RequestParam(value = "type", required = true) int type,
			@RequestParam(value = "id", required = true) int id){
		if(type==1) {
			int result=studentService.changePassword(pw,id);
			if (result != 0) {
				return Msg.success();				
			} else {
				return Msg.fail();
			}
		}
		if(type==2) {
			int result=teacherService.changePassword(pw,id);
			if (result != 0) {
				return Msg.success();				
			} else {
				return Msg.fail();
			}
		}
		if(type==3) {
			int result=managerService.changePassword(pw,id);
			if (result != 0) {
				return Msg.success();				
			} else {
				return Msg.fail();
			}
		}
		return null;
		
	}
	@RequestMapping("/getuser")
	@ResponseBody
	public Msg getuser(@RequestParam(value = "id", required = true) int id,
			@RequestParam(value = "type", required = true) int type) {
		if(type==1) {
			Student student=studentService.logincheck(id);
			return Msg.success().add("user",student);
		}
		if(type==2) {
			Teacher teacher=teacherService.logincheck(id);
			return Msg.success().add("user",teacher);
		}
		if(type==3) {
			Manager manager=managerService.logincheck(id);
			return Msg.success().add("user",manager);
		}		
		return null;
	}
	@RequestMapping("/saveNotice")
	@ResponseBody
	public Msg saveNotice(@RequestParam(value="title")String title,
			@RequestParam(value="content")String content,
			@RequestParam(value="cId")String cId) {
		Notice notice=new Notice();
		notice.setcId(cId);
		notice.setContent(content);
		notice.setTitle(title);
		Date date=new Date();
		notice.setTime(new java.sql.Date(date.getTime()));
		System.out.println(notice);
		int result=noticeService.saveNotice(notice);
		if(result!=0) {
			return Msg.success();
		}else {
			return Msg.fail();
		}
	}
	@RequestMapping("/getNotice")
	@ResponseBody
	public Msg getNotice(@RequestParam(value="cId")String cId) {
		List<Notice> notices=noticeService.getNotice(cId);
		if(notices.isEmpty()) {
			return Msg.fail();
		}else {
			return Msg.success().add("notices",notices);
		}
	}
	@RequestMapping("/delNotice")
	@ResponseBody
	public Msg delNotice(@RequestParam(value="nId")int nId) {
		int result=noticeService.del(nId);
		if(result!=0) {
			return Msg.success();
		}else {
			return Msg.fail();
		}
	}
}
