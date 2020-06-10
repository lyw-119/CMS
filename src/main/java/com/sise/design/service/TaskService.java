package com.sise.design.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sise.design.bean.TaskExample;
import com.sise.design.bean.TaskExample.Criteria;
import com.sise.design.bean.Task_category;
import com.sise.design.bean.Task_categoryExample;
import com.sise.design.bean.Task;
import com.sise.design.dao.TaskMapper;
import com.sise.design.dao.Task_categoryMapper;



@Service
public class TaskService {
	@Autowired
	TaskMapper taskMapper;
	
	@Autowired
	Task_categoryMapper task_categoryMapper;

	public List<Task> getAll(String cId) {
		// TODO Auto-generated method stub
		TaskExample taskExample = new TaskExample();
		Criteria criteria=taskExample.createCriteria();
		criteria.andCIdEqualTo(cId);
		return taskMapper.selectByExample(taskExample);
	}

	public List<Task_category> getTask_category(int clId) {
		// TODO Auto-generated method stub
		Task_categoryExample example=new Task_categoryExample();
		com.sise.design.bean.Task_categoryExample.Criteria criteria=example.createCriteria();
		criteria.andClIdEqualTo(clId);
		return task_categoryMapper.selectByExample(example);
	}

	public List<Task_category> check(int clId, String tc) {
		// TODO Auto-generated method stub
		Task_categoryExample example=new Task_categoryExample();
		com.sise.design.bean.Task_categoryExample.Criteria criteria=example.createCriteria();
		criteria.andClIdEqualTo(clId);
		criteria.andNameEqualTo(tc);
		return  task_categoryMapper.selectByExample(example);
	}

	public int save(int clId, String tc) {
		// TODO Auto-generated method stub
		Task_category task_category=new Task_category();
		task_category.setClId(clId);
		task_category.setName(tc);
		return task_categoryMapper.insertSelective(task_category);
	}

	public int creatTask(Task task) {
		// TODO Auto-generated method stub
		return taskMapper.insertSelective(task);
	}

	public List<Task> getTaskByCategory(int id) {
		// TODO Auto-generated method stub
		TaskExample example = new TaskExample();
		Criteria criteria=example.createCriteria();
		criteria.andTacIdEqualTo(id);
		return taskMapper.selectByExample(example);
	}

	public int delByName(String name) {
		// TODO Auto-generated method stub
		TaskExample example = new TaskExample();
		Criteria criteria=example.createCriteria();
		criteria.andContentEqualTo(name);
		return taskMapper.deleteByExample(example);
	}

	public List<Task> getTaskByStudent(int sId, int tacId) {
		// TODO Auto-generated method stub
		TaskExample example = new TaskExample();
		Criteria criteria=example.createCriteria();
		criteria.andSIdEqualTo(sId);
		criteria.andTacIdEqualTo(tacId);
		return taskMapper.selectByExample(example);
	}
}
