package com.sise.design.bean;

public class Teacher {
    private Integer tId;

    private String name;

    private String password;

    private String gender;

    private String system;

    private String email;

    public Teacher() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Teacher(Integer tId, String name, String password, String gender, String system, String email) {
		super();
		this.tId = tId;
		this.name = name;
		this.password = password;
		this.gender = gender;
		this.system = system;
		this.email = email;
	}

	@Override
	public String toString() {
		return "Teacher [tId=" + tId + ", name=" + name + ", password=" + password + ", gender=" + gender + ", system="
				+ system + ", email=" + email + "]";
	}

	public Integer getId() {
        return tId;
    }

    public void setId(Integer tId) {
        this.tId = tId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender == null ? null : gender.trim();
    }

    public String getSystem() {
        return system;
    }

    public void setSystem(String system) {
        this.system = system == null ? null : system.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }
}