package com.sise.design.dao;

import com.sise.design.bean.Task_category;
import com.sise.design.bean.Task_categoryExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface Task_categoryMapper {
    long countByExample(Task_categoryExample example);

    int deleteByExample(Task_categoryExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Task_category record);

    int insertSelective(Task_category record);

    List<Task_category> selectByExample(Task_categoryExample example);

    Task_category selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Task_category record, @Param("example") Task_categoryExample example);

    int updateByExample(@Param("record") Task_category record, @Param("example") Task_categoryExample example);

    int updateByPrimaryKeySelective(Task_category record);

    int updateByPrimaryKey(Task_category record);
}