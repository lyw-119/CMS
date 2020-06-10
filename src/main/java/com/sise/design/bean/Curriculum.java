package com.sise.design.bean;

public class Curriculum {
    private String cId;

    private String name;

    private String account;

    private String photo;

    private String system;

    private String major;

    private Integer credit;

    private Integer tId;

    public Curriculum() {
		
		// TODO Auto-generated constructor stub
	}

	public Curriculum(String cId, String name, String account, String photo, String system, String major,
			Integer credit, Integer tId) {
		
		this.cId = cId;
		this.name = name;
		this.account = account;
		this.photo = photo;
		this.system = system;
		this.major = major;
		this.credit = credit;
		this.tId = tId;
	}

	@Override
	public String toString() {
		return "Curriculum [cId=" + cId + ", name=" + name + ", account=" + account + ", photo=" + photo + ", system="
				+ system + ", major=" + major + ", credit=" + credit + ", tId=" + tId + "]";
	}

	public String getcId() {
        return cId;
    }

    public void setcId(String cId) {
        this.cId = cId == null ? null : cId.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account == null ? null : account.trim();
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo == null ? null : photo.trim();
    }

    public String getSystem() {
        return system;
    }

    public void setSystem(String system) {
        this.system = system == null ? null : system.trim();
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major == null ? null : major.trim();
    }

    public Integer getCredit() {
        return credit;
    }

    public void setCredit(Integer credit) {
        this.credit = credit;
    }

    public Integer gettId() {
        return tId;
    }

    public void settId(Integer tId) {
        this.tId = tId;
    }
}