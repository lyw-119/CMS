package com.sise.design.bean;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Problem_reply {
    private Integer num;

    private Integer id;

    private String content;

    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date time;

    private Integer qId;

    public Problem_reply() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Problem_reply(Integer num, Integer id, String content, Date time, Integer qId) {
		super();
		this.num = num;
		this.id = id;
		this.content = content;
		this.time = time;
		this.qId = qId;
	}

	@Override
	public String toString() {
		return "Problem_reply [num=" + num + ", id=" + id + ", content=" + content + ", time=" + time + ", qId=" + qId
				+ "]";
	}

	public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public Integer getqId() {
        return qId;
    }

    public void setqId(Integer qId) {
        this.qId = qId;
    }
}