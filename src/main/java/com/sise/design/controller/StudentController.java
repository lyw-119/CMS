package com.sise.design.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sise.design.bean.Msg;
import com.sise.design.bean.Student;
import com.sise.design.service.StudentService;


/**
 * 
 * @author lyw
 *
 */
@Controller
public class StudentController {

	@Autowired
	StudentService studentService;
	
	@RequestMapping("/checkId")
	@ResponseBody
	public Map<String, Object> checkId(Model model, @RequestParam(value = "id", required = false) int id) {
		Map<String, Object> map = new HashMap<String, Object>();
		Student stu = studentService.logincheck(id);
		if (stu != null) {
			map.put("type", "error");		
		}else {
			map.put("type", "success");
		}
		return map;
	}
	
	@RequestMapping("/registerStudent")
	@ResponseBody
	public Map<String, String> registerStudent(@RequestParam(value = "id", required = true) int id,
			@RequestParam(value = "password", required = true) String password,
			@RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "gender", required = true) String gender,
			@RequestParam(value = "email", required = true) String email,
			@RequestParam(value = "system", required = true) String system,
			@RequestParam(value = "major", required = true) String major, HttpServletRequest request) {
		Map<String, String> map = new HashMap<String, String>();
		if (StringUtils.isEmpty(id)) {
			map.put("type", "error");
			map.put("msg", "学号不能为空!");
			return map;
		}
		if (StringUtils.isEmpty(name)) {
			map.put("type", "error");
			map.put("msg", "姓名不能为空!");
			return map;
		}
		if (StringUtils.isEmpty(password)) {
			map.put("type", "error");
			map.put("msg", "密码不能为空!");
			return map;
		}
		if (StringUtils.isEmpty(email)) {
			map.put("type", "error");
			map.put("msg", "邮箱不能为空!");
			return map;
		}
		if (StringUtils.isEmpty(major)) {
			map.put("type", "error");
			map.put("msg", "专业不能为空!");
			return map;
		}
		Student student = new Student();
		student.setId(id);
		student.setEmail(email);
		student.setGender(gender);
		student.setMajor(major);
		student.setName(name);
		student.setPassword(password);
		student.setSystem(system);
		int result = studentService.insert(student);
		if (result != 0) {
			map.put("type", "success");
			
		} else {
			map.put("type", "error");
			map.put("msg", "注册失败");
		}
		System.out.println(map);
		System.out.println(result);
		return map;

	}
	
	@RequestMapping(value="/updateStudent/{id}")
	@ResponseBody
	public Msg updateStudent(Student student) {
		int result=studentService.updateStudent(student);
		if(result!=0) {
			return Msg.success();
		}else {
			return Msg.fail();
		}		
	}
	
	
}
