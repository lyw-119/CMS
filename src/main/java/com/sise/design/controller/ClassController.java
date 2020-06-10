package com.sise.design.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sise.design.bean.Clazz;
import com.sise.design.bean.Clazz_apply;
import com.sise.design.bean.Curriculum;
import com.sise.design.bean.Msg;
import com.sise.design.bean.Notice;
import com.sise.design.bean.Student;
import com.sise.design.bean.Student_Class;
import com.sise.design.service.Clazz_applyService;
import com.sise.design.service.CurriculumService;
import com.sise.design.service.StudentService;
import com.sise.design.service.Student_ClassService;


@Controller
public class ClassController {
	
	@Autowired
	Student_ClassService classService;
	
	@Autowired
	CurriculumService curriculumService;
	
	@Autowired
	StudentService studentService;
	
	@Autowired
	Clazz_applyService clazz_applyService;
	
	@RequestMapping("/selectStudentClass")
	@ResponseBody
	public Msg selectStudentClass(@RequestParam(value="id")int id) {
		  List<Student_Class> classes=classService.selectStudentClass(id);
		  List<String> list = new ArrayList<String>();
		  List<Curriculum> curriculums=new ArrayList<Curriculum>();
		  for(Student_Class cl:classes) {
			  list.add(cl.getC().getcId());
		  }		   
		  for(int i = 0 ; i < list.size() ; i++) { 
			    String c_id=list.get(i);
			    Curriculum curriculum=curriculumService.selectCurriculum(c_id);
			    curriculums.add(curriculum);
		  }
		  return Msg.success().add("student_curr", curriculums);  
	}
	
	@RequestMapping("/getClazz")
	@ResponseBody
	public Msg getClazz(@RequestParam(value="cId")String cId) {
		List<Clazz> clazzs=classService.getAll(cId);
		return Msg.success().add("clazz", clazzs);
	}
	
	@RequestMapping("/checkClazz")
	@ResponseBody
	public Msg checkClazz(@RequestParam(value="clazz")String name,@RequestParam(value="cId")String cId) {
		List<Clazz> clazzs=classService.checkClazz(name,cId);
		if(clazzs.isEmpty()) {
			return Msg.success();
		}else {
			return Msg.fail();
		}
	}
	
	@RequestMapping("/saveClazz")
	@ResponseBody
	public Msg saveClazz(@RequestParam(value="clazz")String name,@RequestParam(value="cId")String cId) {
		int result=classService.saveClazz(name,cId);
		if(result!=0) {
			return Msg.success();
		}else {
			return Msg.fail();
		}
	}
	
	@RequestMapping("/getStudents")
	@ResponseBody
	public Msg getStudents(@RequestParam(value="cId")String cId) {
		List<Clazz> clazzs=classService.getAll(cId);
		List<String> list = new ArrayList<String>();
		List<String> list2= new ArrayList<String>();
		List<Student> students= new ArrayList<Student>();
		for(Clazz cl:clazzs) {
			String clString=cl.getClId().toString();
			list.add(clString);
		}
		for(int i = 0 ; i < list.size() ; i++) {
			int cl_id=Integer.parseInt(list.get(i));
			List<Student_Class> student_Classes=classService.selectClazz(cl_id);
			for(Student_Class sClass:student_Classes) {
				String a=sClass.getsId().toString();
				list2.add(a);
			}
		}
		for(int j = 0 ; j <list2.size(); j++) {
			int s_id=Integer.parseInt(list2.get(j));
			Student student=studentService.logincheck(s_id);
			students.add(student);
		}
		return Msg.success().add("students", students);
	}
	@RequestMapping("/getStudentByClazz")
	@ResponseBody
	public Msg getStudentByClazz(@RequestParam(value="cId")String cId,@RequestParam(value="clId")int clId) {
		List<Clazz> clazzs=classService.getByclId(cId,clId);
		List<String> list = new ArrayList<String>();
		List<String> list2= new ArrayList<String>();
		List<Student> students= new ArrayList<Student>();
		for(Clazz cl:clazzs) {
			String clString=cl.getClId().toString();
			list.add(clString);
		}
		for(int i = 0 ; i < list.size() ; i++) {
			int cl_id=Integer.parseInt(list.get(i));
			List<Student_Class> student_Classes=classService.selectClazz(cl_id);
			for(Student_Class sClass:student_Classes) {
				String a=sClass.getsId().toString();
				list2.add(a);
			}
		}
		for(int j = 0 ; j <list2.size(); j++) {
			int s_id=Integer.parseInt(list2.get(j));
			Student student=studentService.logincheck(s_id);
			students.add(student);
		}
		return Msg.success().add("students", students);	
	}
	
	@RequestMapping("/getClazzByStudent")
	@ResponseBody
	public Msg getClazzByStudent(@RequestParam(value="cId")String cId,@RequestParam(value="sId")int sId) {
		List<Clazz> clazzs=classService.getAll(cId);
		for(Clazz cl:clazzs) {
			int clId=cl.getClId();
			List<Student_Class> student_Classes=classService.selectClazzBystudent(sId,clId);
			if(!student_Classes.isEmpty()) {
				return Msg.success().add("clId", clId);
			}
		}
		return null;
	}
	
	@RequestMapping("/deleteStudentByClazz")
	@ResponseBody
	public Msg deleteStudentByClazz(@RequestParam(value="clId")int clId,@RequestParam(value="id")int sId) {
		int result=classService.delete(sId,clId);
		if(result!=0) {
			return Msg.success();
		}else {
			return Msg.fail();
		}
	}
	
	@ResponseBody
	@RequestMapping(value="/deleteAll/{ids}")
	public Msg deleteAll(@PathVariable("ids")String ids,@RequestParam(value="cId")String cId){
		String[] strArray = ids.split("\\-");
        for(int i=0;i<strArray.length;i++) {
        	int id=Integer.parseInt(strArray[i]);
        	Map<String, Object> extend = getClazzByStudent(cId,id).getExtend();
        	int clId=Integer.parseInt(extend.get("clId").toString());
        	System.out.println(clId);
        	deleteStudentByClazz(clId,id);
        }
        
		return Msg.success();
		
	}
	@RequestMapping("/selectStudentByCId")
	@ResponseBody
	public Msg selectStudentByCId(@RequestParam(value="id")int id,@RequestParam(value="cId")String cId) {
		
		List<Student_Class> classes=classService.selectStudentClass(id);
		List<String> list = new ArrayList<String>();
		for(Student_Class cl:classes) {
			list.add(cl.getC().getcId());
		}		   
		for(int i = 0 ; i < list.size() ; i++) {
			
			String c_id=list.get(i);
			if(c_id.equals(cId)) {
				return Msg.success();
			}else {
				return Msg.fail();
		    }
		}
		return null; 
	}
	@RequestMapping("/saveApply")
	@ResponseBody
	public Msg saveApply(@RequestParam(value="clId")int clId,@RequestParam(value="s_id")int sId) {
		Clazz_apply clazz_apply=new Clazz_apply();
		clazz_apply.setClId(clId);
		clazz_apply.setsId(sId);
		clazz_apply.setStatus(0);
		int result = clazz_applyService.saveApply(clazz_apply);
		if(result!=0) {
			return Msg.success();
		}else {
			return Msg.fail();
		}
	}
	@RequestMapping("/getApplyByStudent")
	@ResponseBody
	public Msg getApplyByStudent(@RequestParam(value="id")int sId) {
		List<Clazz_apply> clazz_applies=clazz_applyService.getApply(sId);
		if(clazz_applies.isEmpty()) {
			return Msg.fail();
		}else{
			return Msg.success();
		}
	}
	
	@RequestMapping("/getApply")
	@ResponseBody
	public Msg getApply(@RequestParam(value = "cId")String cId) {
		List<Clazz> clazzs=classService.getAll(cId);
		List<Clazz_apply> clazz=new ArrayList<Clazz_apply>();
		for(Clazz cl:clazzs) {
			List<Clazz_apply> clazz_applies=clazz_applyService.getApplyByClId(cl);
			for(Clazz_apply clazz_apply:clazz_applies) {
				clazz.add(clazz_apply);
			}
		}
		return Msg.success().add("clazz", clazz);
	}
	@RequestMapping("/getClassName")
	@ResponseBody
	public Msg getClassName(@RequestParam(value = "clId")int clId) {
		Clazz clazz=classService.get(clId);
		return Msg.success().add("name", clazz.getName());
	}
	@RequestMapping("/delApply")
	@ResponseBody
	public Msg delApply(@RequestParam(value="clId")int clId,@RequestParam(value="sId")int sId) {
		int result=clazz_applyService.del(clId,sId);
		if(result!=0) {
			return Msg.success();
		}else {
			return Msg.fail();
		}
	}
	@RequestMapping("/agrApply")
	@ResponseBody
	public Msg agrApply(@RequestParam(value="clId")int clId,@RequestParam(value="sId")int sId) {
		int result=classService.saveAppply(clId,sId);
		if(result!=0) {
			int result1=clazz_applyService.del(clId,sId);
			if(result1!=0) {
				return Msg.success();
			}else {
				return Msg.fail();
			}
		}else {
			return Msg.fail();
		}
		
	}
	
}
