package com.sise.design.service;

import java.util.List;

import org.aspectj.apache.bcel.generic.ReturnaddressType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sise.design.bean.Manager;
import com.sise.design.bean.Student;
import com.sise.design.dao.ManagerMapper;
import com.sise.design.dao.StudentMapper;

@Service
public class ManagerService {
	
	@Autowired
	ManagerMapper managerMapper;
	
	
	public Manager logincheck(int id) {
		return managerMapper.selectByPrimaryKey(id);
	}
	public int changePassword(String password,int Id) {
		// TODO Auto-generated method stub
		System.out.println(password);
		return managerMapper.updateByPassword(password, Id);
	}
	public int updateManager(Manager manager) {
		// TODO Auto-generated method stub
		return managerMapper.updateByPrimaryKey(manager);
	}
	
}
