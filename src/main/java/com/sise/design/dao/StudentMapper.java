package com.sise.design.dao;

import com.sise.design.bean.Student;
import com.sise.design.bean.StudentExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentMapper {
    long countByExample(StudentExample example);

    int deleteByExample(StudentExample example);

    int deleteByPrimaryKey(Integer sId);

    int insert(Student record);

    int insertSelective(Student record);

    List<Student> selectByExample(StudentExample example);

    Student selectByPrimaryKey(Integer sId);

    int updateByExampleSelective(@Param("record") Student record, @Param("example") StudentExample example);
    
    int updateByPassword(@Param("password")String password,@Param("sId")Integer sId);

    int updateByExample(@Param("record") Student record, @Param("example") StudentExample example);

    int updateByPrimaryKeySelective(Student record);

    int updateByPrimaryKey(Student record);
}