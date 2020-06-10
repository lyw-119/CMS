package com.sise.design.bean;

public class Student {
    private Integer sId;

    private String name;

    private String password;

    private String gender;

    private String email;

    private String system;

    private String major;

    public Student() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Student(Integer sId, String name, String password, String gender, String email, String system,
			String major) {
		super();
		this.sId = sId;
		this.name = name;
		this.password = password;
		this.gender = gender;
		this.email = email;
		this.system = system;
		this.major = major;
	}

	@Override
	public String toString() {
		return "Student [sId=" + sId + ", name=" + name + ", password=" + password + ", gender=" + gender + ", email="
				+ email + ", system=" + system + ", major=" + major + "]";
	}

	public Integer getId() {
        return sId;
    }

    public void setId(Integer sId) {
        this.sId = sId;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
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
}