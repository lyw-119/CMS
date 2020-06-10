package com.sise.design.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sise.design.bean.Clazz;
import com.sise.design.bean.ClazzExample;
import com.sise.design.bean.Student_Class;
import com.sise.design.bean.Student_ClassExample;
import com.sise.design.bean.Student_ClassExample.Criteria;
import com.sise.design.dao.ClazzMapper;
import com.sise.design.dao.Student_ClassMapper;

@Service
public class Student_ClassService {
	
	@Autowired
	Student_ClassMapper student_ClassMapper;
	
	@Autowired
	ClazzMapper clazzMapper;
	
	public List<Student_Class> selectStudentClass(int id) {
		// TODO Auto-generated method stub
		Student_ClassExample student_ClassExample=new Student_ClassExample();
		Criteria criteria=student_ClassExample.createCriteria();
		criteria.andSIdEqualTo(id);
		return student_ClassMapper.selectByExampleWithcId(student_ClassExample);
	}

	public List<Clazz> getAll(String cId) {
		// TODO Auto-generated method stub
		ClazzExample example=new ClazzExample();
		com.sise.design.bean.ClazzExample.Criteria criteria=example.createCriteria();
		criteria.andCIdEqualTo(cId);
		return clazzMapper.selectByExample(example);
	}

	public List<Clazz> checkClazz(String name, String cId) {
		// TODO Auto-generated method stub
		ClazzExample example=new ClazzExample();
		com.sise.design.bean.ClazzExample.Criteria criteria=example.createCriteria();
		criteria.andCIdEqualTo(cId);
		criteria.andNameEqualTo(name);
		return clazzMapper.selectByExample(example);
	}

	public int saveClazz(String name, String cId) {
		// TODO Auto-generated method stub
		Clazz clazz=new Clazz();
		clazz.setcId(cId);
		clazz.setName(name);
		return clazzMapper.insertSelective(clazz);
	}

	public List<Student_Class> selectClazz(int cl_id) {
		// TODO Auto-generated method stub
		Student_ClassExample student_ClassExample=new Student_ClassExample();
		Criteria criteria=student_ClassExample.createCriteria();
		criteria.andClIdEqualTo(cl_id);
		return student_ClassMapper.selectByExample(student_ClassExample);
	}

	public List<Clazz> getByclId(String cId, int clId) {
		// TODO Auto-generated method stub
		ClazzExample example=new ClazzExample();
		com.sise.design.bean.ClazzExample.Criteria criteria=example.createCriteria();
		criteria.andCIdEqualTo(cId);
		criteria.andClIdEqualTo(clId);
		return clazzMapper.selectByExample(example);
	}

	public List<Student_Class> selectClazzBystudent(int sId, int clId) {
		// TODO Auto-generated method stub
		Student_ClassExample student_ClassExample=new Student_ClassExample();
		Criteria criteria=student_ClassExample.createCriteria();
		criteria.andSIdEqualTo(sId);
		criteria.andClIdEqualTo(clId);
		return student_ClassMapper.selectByExample(student_ClassExample);
	}

	public int delete(int sId, int clId) {
		// TODO Auto-generated method stub
		Student_ClassExample student_ClassExample=new Student_ClassExample();
		Criteria criteria=student_ClassExample.createCriteria();
		criteria.andSIdEqualTo(sId);
		criteria.andClIdEqualTo(clId);
		return student_ClassMapper.deleteByExample(student_ClassExample);
	}

	public Clazz get(int clId) {
		// TODO Auto-generated method stub
		return clazzMapper.selectByPrimaryKey(clId);
	}

	public int saveAppply(int clId, int sId) {
		// TODO Auto-generated method stub
		Student_Class student_Class=new Student_Class();
		student_Class.setClId(clId);
		student_Class.setsId(sId);
		return student_ClassMapper.insertSelective(student_Class);
	}

	
}
