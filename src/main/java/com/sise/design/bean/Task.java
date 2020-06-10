package com.sise.design.bean;

public class Task {
    private Integer taId;

    private Integer sId;

    private String name;

    private String content;

    private Integer tacId;

    private String cId;

    public Integer getTaId() {
        return taId;
    }

    public void setTaId(Integer taId) {
        this.taId = taId;
    }

    public Integer getsId() {
        return sId;
    }

    public void setsId(Integer sId) {
        this.sId = sId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public Integer getTacId() {
        return tacId;
    }

    public void setTacId(Integer tacId) {
        this.tacId = tacId;
    }

    public String getcId() {
        return cId;
    }

    public void setcId(String cId) {
        this.cId = cId == null ? null : cId.trim();
    }
}