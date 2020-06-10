package com.sise.design.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sise.design.bean.Resources;
import com.sise.design.bean.ResourcesExample;
import com.sise.design.bean.ResourcesExample.Criteria;
import com.sise.design.dao.ResourcesMapper;

@Service
public class ResourcesService {
	
	@Autowired
	ResourcesMapper resourcesMapper;

	public List<Resources> getAll(String cId) {
		// TODO Auto-generated method stub
		ResourcesExample example=new ResourcesExample();
		Criteria criteria=example.createCriteria();
		criteria.andCIdEqualTo(cId);
		return resourcesMapper.selectByExample(example);
	}

	public int creatResources(Resources resources) {
		// TODO Auto-generated method stub
		return resourcesMapper.insertSelective(resources);
	}

	public List<Resources> getResourcesByRC(int rcId, String cId) {
		// TODO Auto-generated method stub
		ResourcesExample example=new ResourcesExample();
		Criteria criteria=example.createCriteria();
		criteria.andCIdEqualTo(cId);
		criteria.andRcIdEqualTo(rcId);
		return resourcesMapper.selectByExample(example);
	}

	public int delResources(int id) {
		// TODO Auto-generated method stub
		return resourcesMapper.deleteByPrimaryKey(id);
	}
}
