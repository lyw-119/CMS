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
import com.sise.design.bean.Teacher;
import com.sise.design.service.TeacherService;

@Controller
public class TeacherController {
	
	@Autowired
	TeacherService teacherService;
	
	@RequestMapping(value="/updateTeacher/{id}")
	@ResponseBody
	public Msg updateStudent(Teacher teacher) {
		int result=teacherService.updateTeacher(teacher);
		if(result!=0) {
			return Msg.success();
		}else {
			return Msg.fail();
		}		
	}
	
	@RequestMapping("/registerTeacher")
	@ResponseBody
	public Map<String, String> registerTeacher(@RequestParam(value = "id", required = true) int id,
			@RequestParam(value = "password", required = true) String password,
			@RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "gender", required = true) String gender,
			@RequestParam(value = "email", required = true) String email,
			@RequestParam(value = "system", required = true) String system,HttpServletRequest request) {
		Map<String, String> map = new HashMap<String, String>();
		if (StringUtils.isEmpty(id)) {
			map.put("type", "error");
			map.put("msg", "工号不能为空!");
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

		Teacher teacher = new Teacher();
		teacher.setId(id);
		teacher.setEmail(email);
		teacher.setGender(gender);
		teacher.setName(name);
		teacher.setPassword(password);
		teacher.setSystem(system);
		int result = teacherService.insert(teacher);
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
	
	@RequestMapping("/checktId")
	@ResponseBody
	public Map<String, Object> checktId(Model model, @RequestParam(value = "id", required = false) int id) {
		Map<String, Object> map = new HashMap<String, Object>();
		Teacher tea = teacherService.logincheck(id);
		if (tea != null) {
			map.put("type", "error");		
		}else {
			map.put("type", "success");
		}
		return map;
	}
}
