package com.sise.design.bean;

public class Clazz {
    private Integer clId;

    private String name;

    private String cId;

    public Clazz() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Clazz(Integer clId, String name, String cId) {
		super();
		this.clId = clId;
		this.name = name;
		this.cId = cId;
	}

	@Override
	public String toString() {
		return "Clazz [clId=" + clId + ", name=" + name + ", cId=" + cId + "]";
	}

	public Integer getClId() {
        return clId;
    }

    public void setClId(Integer clId) {
        this.clId = clId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getcId() {
        return cId;
    }

    public void setcId(String cId) {
        this.cId = cId == null ? null : cId.trim();
    }
}