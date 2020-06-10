package com.sise.design.dao;

import com.sise.design.bean.Student_Class;
import com.sise.design.bean.Student_ClassExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface Student_ClassMapper {
    long countByExample(Student_ClassExample example);

    int deleteByExample(Student_ClassExample example);

    int deleteByPrimaryKey(Integer num);

    int insert(Student_Class record);

    int insertSelective(Student_Class record);

    List<Student_Class> selectByExample(Student_ClassExample example);

    Student_Class selectByPrimaryKey(Integer num);
    
    List<Student_Class> selectByExampleWithcId(Student_ClassExample example);

    Student_Class selectByPrimaryKeyWithcId(Integer num);

    int updateByExampleSelective(@Param("record") Student_Class record, @Param("example") Student_ClassExample example);

    int updateByExample(@Param("record") Student_Class record, @Param("example") Student_ClassExample example);

    int updateByPrimaryKeySelective(Student_Class record);

    int updateByPrimaryKey(Student_Class record);
}