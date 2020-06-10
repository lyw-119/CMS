package com.sise.design.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sise.design.bean.StudentExample.Criteria;
import com.sise.design.bean.Student;
import com.sise.design.bean.StudentExample;
import com.sise.design.dao.StudentMapper;

@Service
public class StudentService {
	
	@Autowired
	StudentMapper studentMapper;
	
	public Student logincheck(int id) {
		return studentMapper.selectByPrimaryKey(id);
	}

	public int insert(Student student) {
		// TODO Auto-generated method stub
		return studentMapper.insert(student);
	}

	public int changePassword(String password,int sId) {
		// TODO Auto-generated method stub
		System.out.println(password);
		return studentMapper.updateByPassword(password, sId);
	}
	
	public List<Student> getAll() {
		// TODO Auto-generated method stub
		return studentMapper.selectByExample(null);
	}

	public List<Student> select(String select, String contend) {
		// TODO Auto-generated method stub
		StudentExample studentExample=new StudentExample();
		Criteria criteria=studentExample.createCriteria();
		System.out.println(select);
		System.out.println(contend);
		if(select.equals("s_id")) {
			int con=Integer.parseInt(contend);
			criteria.andSIdEqualTo(con);
			return studentMapper.selectByExample(studentExample);
		}
		if(select.equals("name")) {
			criteria.andNameEqualTo(contend);
			return studentMapper.selectByExample(studentExample);
		}
		if(select.equals("system")) {
			criteria.andSystemEqualTo(contend);
			return studentMapper.selectByExample(studentExample);
		}
		if(select.equals("major")) {
			criteria.andMajorEqualTo(contend);
			return studentMapper.selectByExample(studentExample);
		}
		return null;
	}

	public int deleteStudent(int id) {
		// TODO Auto-generated method stub
		return studentMapper.deleteByPrimaryKey(id);
	}

	public int updateStudent(Student student) {
		// TODO Auto-generated method stub
		return studentMapper.updateByPrimaryKey(student);
	}

}
