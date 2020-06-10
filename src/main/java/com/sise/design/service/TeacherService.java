package com.sise.design.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sise.design.bean.Student;
import com.sise.design.bean.Teacher;
import com.sise.design.bean.TeacherExample;
import com.sise.design.bean.TeacherExample.Criteria;
import com.sise.design.dao.TeacherMapper;

@Service
public class TeacherService {
	
	@Autowired
	TeacherMapper teacherMapper;
	
	public Teacher logincheck(int id) {
		return teacherMapper.selectByPrimaryKey(id);
	}
	public int insert(Teacher teacher) {
		// TODO Auto-generated method stub
		return teacherMapper.insert(teacher);
	}
	public int changePassword(String password, int id) {
		// TODO Auto-generated method stub
		return teacherMapper.updateByPassword(password, id);
	}
	public List<Teacher> getAll() {
		// TODO Auto-generated method stub
		return teacherMapper.selectByExample(null);
	}
	public List<Teacher> select(String select, String contend) {
		// TODO Auto-generated method stub
		TeacherExample teacherExample= new TeacherExample();
		Criteria criteria=teacherExample.createCriteria();
		System.out.println(select);
		System.out.println(contend);
		if(select.equals("t_id")) {
			int con=Integer.parseInt(contend);
			criteria.andTIdEqualTo(con);
			return teacherMapper.selectByExample(teacherExample);
		}
		if(select.equals("name")) {
			criteria.andNameEqualTo(contend);
			return teacherMapper.selectByExample(teacherExample);
		}
		if(select.equals("system")) {
			criteria.andSystemEqualTo(contend);
			return teacherMapper.selectByExample(teacherExample);
		}
		return null;
	}
	public int deleteTeacher(int id) {
		// TODO Auto-generated method stub
		return teacherMapper.deleteByPrimaryKey(id);
	}
	public int updateTeacher(Teacher teacher) {
		// TODO Auto-generated method stub
		return teacherMapper.updateByPrimaryKey(teacher);
	}
}
