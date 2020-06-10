package com.sise.design.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sise.design.bean.ProblemExample;
import com.sise.design.bean.ProblemExample.Criteria;
import com.sise.design.bean.Problem_reply;
import com.sise.design.bean.Problem_replyExample;
import com.sise.design.bean.Problem;
import com.sise.design.dao.ProblemMapper;
import com.sise.design.dao.Problem_replyMapper;

@Service
public class ProblemService {
	@Autowired
	ProblemMapper problemMapper;
	
	@Autowired
	Problem_replyMapper problem_replyMapper;

	public List<Problem> getAll(String cId) {
		// TODO Auto-generated method stub
		ProblemExample example=new ProblemExample();
		Criteria criteria=example.createCriteria();
		criteria.andCIdEqualTo(cId);
		return problemMapper.selectByExample(example);
	}

	public int addProblem(Problem problem) {
		// TODO Auto-generated method stub
		return problemMapper.insertSelective(problem);
	}

	public Problem getProblem(int id) {
		// TODO Auto-generated method stub
		return problemMapper.selectByPrimaryKey(id);
	}

	public int add(Problem_reply problem_reply) {
		// TODO Auto-generated method stub
		return problem_replyMapper.insertSelective(problem_reply);
	}

	public int delProblem(int id) {
		// TODO Auto-generated method stub
		return problemMapper.deleteByPrimaryKey(id);
	}

	public int delReply(int id) {
		// TODO Auto-generated method stub
		Problem_replyExample example=new Problem_replyExample();
		com.sise.design.bean.Problem_replyExample.Criteria criteria=example.createCriteria();
		criteria.andQIdEqualTo(id);
		return problem_replyMapper.deleteByExample(example);
	}

	public List<Problem_reply> getReply(int id) {
		// TODO Auto-generated method stub
		Problem_replyExample example=new Problem_replyExample();
		com.sise.design.bean.Problem_replyExample.Criteria criteria=example.createCriteria();
		criteria.andQIdEqualTo(id);
		return problem_replyMapper.selectByExample(example);
	}

	public int delReplyByNum(int num) {
		// TODO Auto-generated method stub
		return problem_replyMapper.deleteByPrimaryKey(num);
	}

	public List<Problem> get(String cId, int id) {
		// TODO Auto-generated method stub
		ProblemExample example=new ProblemExample();
		Criteria criteria=example.createCriteria();
		criteria.andCIdEqualTo(cId);
		criteria.andIdEqualTo(id);
		return problemMapper.selectByExample(example);
	}

}
