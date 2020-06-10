package com.sise.design.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sise.design.bean.Category;
import com.sise.design.bean.CategoryExample;
import com.sise.design.bean.CategoryExample.Criteria;
import com.sise.design.dao.CategoryMapper;

@Service
public class CategoryService {
	@Autowired
	CategoryMapper categoryMapper;

	public List<Category> checkRC(String cId,String rc) {
		// TODO Auto-generated method stub
		CategoryExample categoryExample=new CategoryExample();
		Criteria criteria=categoryExample.createCriteria();
		criteria.andCIdEqualTo(cId);
		criteria.andNameEqualTo(rc);
		return categoryMapper.selectByExample(categoryExample);
	}

	public int saveRC(String cId, String rc) {
		// TODO Auto-generated method stub
		Category category=new Category();
		category.setcId(cId);
		category.setName(rc);
		return categoryMapper.insertSelective(category);
	}

	public List<Category> getAll(String cId) {
		// TODO Auto-generated method stub
		CategoryExample categoryExample=new CategoryExample();
		Criteria criteria=categoryExample.createCriteria();
		criteria.andCIdEqualTo(cId);
		return categoryMapper.selectByExample(categoryExample);
	}
	
	
}
