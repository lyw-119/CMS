package com.sise.design.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sise.design.bean.Curriculum;
import com.sise.design.bean.CurriculumExample;
import com.sise.design.bean.CurriculumExample.Criteria;
import com.sise.design.dao.CurriculumMapper;

@Service
public class CurriculumService {
	
	@Autowired
	CurriculumMapper curriculumMapper;

	public Curriculum checkCId(String id) {
		// TODO Auto-generated method stub
		return curriculumMapper.selectByPrimaryKey(id);
	}

	public int creatCurriculum(Curriculum curriculum) {
		// TODO Auto-generated method stub
		return curriculumMapper.insert(curriculum);
	}

	public List<Curriculum> select(int id) {
		// TODO Auto-generated method stub
		CurriculumExample curriculumExample=new CurriculumExample();
		Criteria criteria=curriculumExample.createCriteria();
		criteria.andTIdEqualTo(id);
		return curriculumMapper.selectByExample(curriculumExample);
	}

	public int deleteCurriculum(String id) {
		// TODO Auto-generated method stub
		return curriculumMapper.deleteByPrimaryKey(id);
	}

	public Curriculum selectCurriculum(String cId) {
		// TODO Auto-generated method stub
		
		return curriculumMapper.selectByPrimaryKey(cId);
	}

	public List<Curriculum> search(String contend) {
		// TODO Auto-generated method stub
		CurriculumExample curriculumExample=new CurriculumExample();
		Criteria criteria=curriculumExample.createCriteria();
		criteria.andNameEqualTo(contend);
		return curriculumMapper.selectByExample(curriculumExample);
	}

	public int updateCurriculum(Curriculum curriculum) {
		// TODO Auto-generated method stub
		return curriculumMapper.updateByPrimaryKeySelective(curriculum);
	}

	public List<Curriculum> selectAll() {
		// TODO Auto-generated method stub
		return curriculumMapper.selectAll();
	}
	
}
