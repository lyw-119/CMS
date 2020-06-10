package com.sise.design.dao;

import com.sise.design.bean.Problem;
import com.sise.design.bean.ProblemExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ProblemMapper {
    long countByExample(ProblemExample example);

    int deleteByExample(ProblemExample example);

    int deleteByPrimaryKey(Integer qId);

    int insert(Problem record);

    int insertSelective(Problem record);

    List<Problem> selectByExample(ProblemExample example);

    Problem selectByPrimaryKey(Integer qId);

    int updateByExampleSelective(@Param("record") Problem record, @Param("example") ProblemExample example);

    int updateByExample(@Param("record") Problem record, @Param("example") ProblemExample example);

    int updateByPrimaryKeySelective(Problem record);

    int updateByPrimaryKey(Problem record);
}