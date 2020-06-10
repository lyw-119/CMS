package com.sise.design.bean;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Notice {
    private Integer nId;

    private String cId;

    private String title;

    private String content;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date time;

    @Override
	public String toString() {
		return "Notice [nId=" + nId + ", cId=" + cId + ", title=" + title + ", content=" + content + ", time=" + time
				+ "]";
	}

	public Notice() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Notice(Integer nId, String cId, String title, String content, Date time) {
		super();
		this.nId = nId;
		this.cId = cId;
		this.title = title;
		this.content = content;
		this.time = time;
	}

	public Integer getnId() {
        return nId;
    }

    public void setnId(Integer nId) {
        this.nId = nId;
    }

    public String getcId() {
        return cId;
    }

    public void setcId(String cId) {
        this.cId = cId == null ? null : cId.trim();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
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
}