package com.sise.design.dao;

import com.sise.design.bean.Clazz;
import com.sise.design.bean.ClazzExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ClazzMapper {
    long countByExample(ClazzExample example);

    int deleteByExample(ClazzExample example);

    int deleteByPrimaryKey(Integer clId);

    int insert(Clazz record);

    int insertSelective(Clazz record);

    List<Clazz> selectByExample(ClazzExample example);

    Clazz selectByPrimaryKey(Integer clId);

    int updateByExampleSelective(@Param("record") Clazz record, @Param("example") ClazzExample example);

    int updateByExample(@Param("record") Clazz record, @Param("example") ClazzExample example);

    int updateByPrimaryKeySelective(Clazz record);

    int updateByPrimaryKey(Clazz record);
}