package com.sise.design.bean;

public class Clazz_apply {
    private Integer aId;

    private Integer sId;

    private Integer clId;

    private Integer status;

    public Clazz_apply() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Clazz_apply(Integer aId, Integer sId, Integer clId, Integer status) {
		super();
		this.aId = aId;
		this.sId = sId;
		this.clId = clId;
		this.status = status;
	}

	@Override
	public String toString() {
		return "Clazz_apply [aId=" + aId + ", sId=" + sId + ", clId=" + clId + ", status=" + status + "]";
	}

	public Integer getaId() {
        return aId;
    }

    public void setaId(Integer aId) {
        this.aId = aId;
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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}