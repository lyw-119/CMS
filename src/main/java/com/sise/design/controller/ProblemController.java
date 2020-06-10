package com.sise.design.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sise.design.bean.Msg;
import com.sise.design.bean.Problem;
import com.sise.design.bean.Problem_reply;
import com.sise.design.service.ProblemService;

@Controller
public class ProblemController {
	
	@Autowired
	ProblemService problemService;
	
	@RequestMapping("/getAllProblem")
	@ResponseBody
	public Msg getAllProblem(@RequestParam(value = "cId")String cId) {
		List<Problem> problems=problemService.getAll(cId);
		if(problems.isEmpty()) {
			return Msg.fail();
		}else {
			return Msg.success().add("problems",problems);
		}
	}
	@RequestMapping("/getMyProblem")
	@ResponseBody
	public Msg getMyProblem(@RequestParam(value = "cId")String cId,@RequestParam(value = "id")int id) {
		List<Problem> problems=problemService.get(cId,id);
		if(problems.isEmpty()) {
			return Msg.fail();
		}else {
			return Msg.success().add("problems",problems);
		}
	}
	@SuppressWarnings("deprecation")
	@RequestMapping("/addProblem")
	@ResponseBody
	public Msg addProblem(Problem problem) {
		Date date=new Date();
		problem.setTime(new java.sql.Date(date.getTime()));
		int result=problemService.addProblem(problem);
		if(result!=0) {
			return Msg.success();
		}else {
			return Msg.fail();
		}
	}
	@RequestMapping("/getProblem")
	@ResponseBody
	public Msg getProblem(@RequestParam(value = "id")int id) {
		Problem problem=problemService.getProblem(id);
		if(problem==null) {
			return Msg.fail();
		}else {
			return Msg.success().add("problems",problem);
		}
	}
	@RequestMapping("/saveReply")
	@ResponseBody
	public Msg saveReply(Problem_reply p) {
		Date date=new Date();
		p.setTime(new java.sql.Date(date.getTime()));
		int result = problemService.add(p);
		if(result!=0) {
			return Msg.success();
		}else {
			return Msg.fail();
		}
	}
	@RequestMapping("/delProblem")
	@ResponseBody
	public Msg delProblem(@RequestParam(value = "id")int id) {
		int result=problemService.delProblem(id);
		if(result!=0) {
			return Msg.success();
		}else {
			return Msg.fail();
		}
	}
	@RequestMapping("/delReply")
	@ResponseBody
	public Msg delReply(@RequestParam(value = "id")int id) {
		int result=problemService.delReply(id);
		if(result!=0) {
			return Msg.success();
		}else {
			return Msg.fail();
		}
	}
	@RequestMapping("/getReply")
	@ResponseBody
	public Msg getReply(@RequestParam(value = "id")int id) {
		List<Problem_reply> problem_replies=problemService.getReply(id);
		if(problem_replies.isEmpty()) {
			return Msg.fail();
		}else {
			return Msg.success().add("replies", problem_replies);
		}
	}
	@RequestMapping("/delReplyByNum")
	@ResponseBody
	public Msg delReplyByNum(@RequestParam(value = "num")int num) {
		int result=problemService.delReplyByNum(num);
		if(result!=0) {
			return Msg.success();
		}else {
			return Msg.fail();
		}
	}
	
}
