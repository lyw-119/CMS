package com.sise.design.bean;

public class Category {
    private Integer rcId;

    private String name;

    private String cId;

    public Category() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Category(Integer rcId, String name, String cId) {
		super();
		this.rcId = rcId;
		this.name = name;
		this.cId = cId;
	}

	@Override
	public String toString() {
		return "Category [rcId=" + rcId + ", name=" + name + ", cId=" + cId + "]";
	}

	public Integer getRcId() {
        return rcId;
    }

    public void setRcId(Integer rcId) {
        this.rcId = rcId;
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