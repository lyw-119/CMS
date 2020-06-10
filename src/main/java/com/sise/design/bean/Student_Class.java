package com.sise.design.bean;

public class Student_Class {
    private Integer num;

    private Integer sId;

    private Integer clId;

    private Clazz c;
    
    public Student_Class(Integer num, Integer sId, Integer clId) {
		super();
		this.num = num;
		this.sId = sId;
		this.clId = clId;
	}

	public Student_Class() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Student_Class [num=" + num + ", sId=" + sId + ", clId=" + clId + ", c=" + c + "]";
	}

	public Clazz getC() {
		return c;
	}

	public void setC(Clazz c) {
		this.c = c;
	}

	public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    public Integer getsId() {
        return sId;
    }

    public void setsId(Integer sId) {
        this.sId = sId;
    }

    public Integer getClId() {
        return clId;
    }

    public void setClId(Integer clId) {
        this.clId = clId;
    }
}