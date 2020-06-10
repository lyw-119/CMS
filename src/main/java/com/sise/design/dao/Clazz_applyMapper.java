package com.sise.design.dao;

import com.sise.design.bean.Clazz_apply;
import com.sise.design.bean.Clazz_applyExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface Clazz_applyMapper {
    long countByExample(Clazz_applyExample example);

    int deleteByExample(Clazz_applyExample example);

    int deleteByPrimaryKey(Integer aId);

    int insert(Clazz_apply record);

    int insertSelective(Clazz_apply record);

    List<Clazz_apply> selectByExample(Clazz_applyExample example);

    Clazz_apply selectByPrimaryKey(Integer aId);

    int updateByExampleSelective(@Param("record") Clazz_apply record, @Param("example") Clazz_applyExample example);

    int updateByExample(@Param("record") Clazz_apply record, @Param("example") Clazz_applyExample example);

    int updateByPrimaryKeySelective(Clazz_apply record);

    int updateByPrimaryKey(Clazz_apply record);
}