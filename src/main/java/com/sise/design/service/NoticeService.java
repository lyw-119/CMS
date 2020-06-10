package com.sise.design.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sise.design.bean.Notice;
import com.sise.design.bean.NoticeExample;
import com.sise.design.bean.NoticeExample.Criteria;
import com.sise.design.dao.NoticeMapper;

@Service
public class NoticeService {
	
	@Autowired
	NoticeMapper noticeMapper;

	public int saveNotice(Notice notice) {
		// TODO Auto-generated method stub
		return noticeMapper.insertSelective(notice);
	}

	public List<Notice> getNotice(String cId) {
		// TODO Auto-generated method stub
		NoticeExample example=new NoticeExample();
		Criteria criteria=example.createCriteria();
		criteria.andCIdEqualTo(cId);
		return noticeMapper.selectByExample(example);
	}

	public int del(int nId) {
		// TODO Auto-generated method stub
		return noticeMapper.deleteByPrimaryKey(nId);
	}
}
