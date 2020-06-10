package com.sise.design.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.sise.design.bean.Manager;
import com.sise.design.bean.Msg;
import com.sise.design.bean.Student;
import com.sise.design.bean.Teacher;
import com.sise.design.service.ManagerService;
import com.sise.design.service.StudentService;
import com.sise.design.service.TeacherService;

@Controller
public class ManagerController {
	
	@Autowired
	ManagerService managerService;
	
	@Autowired
	StudentService studentService;
	
	@Autowired
	TeacherService teacherService;
	
	@RequestMapping("/students")
	@ResponseBody
	public Msg getStudent(@RequestParam(value="pn",defaultValue = "1")Integer pn) {
		PageHelper.startPage(pn,10);
		List<Student> stu=studentService.getAll();
		PageInfo page = new PageInfo(stu,5);
		return Msg.success().add("pageInfo",page);
	}
	
	@RequestMapping("/teachers")
	@ResponseBody
	public Msg getTeacher(@RequestParam(value="pn",defaultValue = "1")Integer pn) {
		PageHelper.startPage(pn,10);
		List<Teacher> tea=teacherService.getAll();
		PageInfo page = new PageInfo(tea,5);
		return Msg.success().add("pageInfo",page);
		
	}
	
	@RequestMapping("/getSelectStudent")
	@ResponseBody
	public Msg selectStudent(@RequestParam(value="select")String select,
			@RequestParam(value="contend")String contend,
			@RequestParam(value="pn",defaultValue = "1")Integer pn) {
		PageHelper.startPage(pn,10);
		List<Student> students=studentService.select(select,contend);
		PageInfo page=new PageInfo(students,5);
		return Msg.success().add("pageInfo", page);		
	}
	
	@RequestMapping("/getSelectTeacher")
	@ResponseBody
	public Msg selectTeacehr(@RequestParam(value="select")String select,
			@RequestParam(value="contend")String contend,
			@RequestParam(value="pn",defaultValue = "1")Integer pn) {
		PageHelper.startPage(pn,10);
		List<Teacher> teachers=teacherService.select(select,contend);
		PageInfo page=new PageInfo(teachers,5);
		return Msg.success().add("pageInfo", page);
		
	}
	
	@RequestMapping(value="/delStudent/{id}",method=RequestMethod.DELETE)
	@ResponseBody
	public Msg deleteStudentById(@PathVariable("id")int id) {
		int result=studentService.deleteStudent(id);
		if(result!=0) {
			return Msg.success();
		}else {
			return Msg.fail();
		}
	}
	
	@RequestMapping(value="/delTeacher/{id}",method=RequestMethod.DELETE)
	@ResponseBody
	public Msg deleteTeacherById(@PathVariable("id")int id) {
		int result=teacherService.deleteTeacher(id);
		if(result!=0) {
			return Msg.success();
		}else {
			return Msg.fail();
		}
	}
	
	@RequestMapping(value="/updateManager/{id}")
	@ResponseBody
	public Msg updateManager(Manager manager) {
		int result=managerService.updateManager(manager);
		if(result!=0) {
			return Msg.success();
		}else {
			return Msg.fail();
		}
	}
}
