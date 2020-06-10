package com.sise.design.bean;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Problem {
    private Integer qId;

    private String title;

    private String account;

    private Integer id;

    private String cId;
    
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date time;

    public Problem() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Problem(Integer qId, String title, String account, Integer id, String cId, Date time) {
		super();
		this.qId = qId;
		this.title = title;
		this.account = account;
		this.id = id;
		this.cId = cId;
		this.time = time;
	}

	@Override
	public String toString() {
		return "Problem [qId=" + qId + ", title=" + title + ", account=" + account + ", id=" + id + ", cId=" + cId
				+ ", time=" + time + "]";
	}

	public Integer getqId() {
        return qId;
    }

    public void setqId(Integer qId) {
        this.qId = qId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account == null ? null : account.trim();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getcId() {
        return cId;
    }

    public void setcId(String cId) {
        this.cId = cId == null ? null : cId.trim();
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }
}