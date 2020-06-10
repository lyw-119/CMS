package com.sise.design.dao;

import com.sise.design.bean.Problem_reply;
import com.sise.design.bean.Problem_replyExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface Problem_replyMapper {
    long countByExample(Problem_replyExample example);

    int deleteByExample(Problem_replyExample example);

    int deleteByPrimaryKey(Integer num);

    int insert(Problem_reply record);

    int insertSelective(Problem_reply record);

    List<Problem_reply> selectByExample(Problem_replyExample example);

    Problem_reply selectByPrimaryKey(Integer num);

    int updateByExampleSelective(@Param("record") Problem_reply record, @Param("example") Problem_replyExample example);

    int updateByExample(@Param("record") Problem_reply record, @Param("example") Problem_replyExample example);

    int updateByPrimaryKeySelective(Problem_reply record);

    int updateByPrimaryKey(Problem_reply record);
}