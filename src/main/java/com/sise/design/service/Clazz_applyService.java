package com.sise.design.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sise.design.bean.Clazz;
import com.sise.design.bean.Clazz_apply;
import com.sise.design.bean.Clazz_applyExample;
import com.sise.design.bean.Clazz_applyExample.Criteria;
import com.sise.design.dao.Clazz_applyMapper;

@Service
public class Clazz_applyService {
	@Autowired
	Clazz_applyMapper clazz_applyMapper;

	public int saveApply(Clazz_apply clazz_apply) {
		// TODO Auto-generated method stub
		return clazz_applyMapper.insertSelective(clazz_apply);
	}

	public List<Clazz_apply> getApply(int sId) {
		// TODO Auto-generated method stub
		Clazz_applyExample example=new Clazz_applyExample();
		Criteria criteria=example.createCriteria();
		criteria.andSIdEqualTo(sId);
		return clazz_applyMapper.selectByExample(example);
	}

	public List<Clazz_apply> getApplyByClId(Clazz cl) {
		// TODO Auto-generated method stub
		Clazz_applyExample example=new Clazz_applyExample();
		Criteria criteria=example.createCriteria();
		criteria.andClIdEqualTo(cl.getClId());
		return clazz_applyMapper.selectByExample(example);
	}

	public int del(int clId, int sId) {
		// TODO Auto-generated method stub
		Clazz_applyExample example=new Clazz_applyExample();
		Criteria criteria=example.createCriteria();
		criteria.andClIdEqualTo(clId);
		criteria.andSIdEqualTo(sId);
		return clazz_applyMapper.deleteByExample(example);
	}
}
