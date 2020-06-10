package com.sise.design.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.Delayed;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.sise.design.bean.Msg;
import com.sise.design.bean.Task;
import com.sise.design.bean.Task_category;
import com.sise.design.service.TaskService;

@Controller
public class TaskController {
	@Autowired
	TaskService taskService;
	
	@Autowired
	HttpServletRequest req;
	
	@RequestMapping("/getTasks")
	@ResponseBody
	public Msg getTasks(@RequestParam(value="cId")String cId) {
		List<Task> tasks = taskService.getAll(cId);
		return Msg.success().add("tasks", tasks);
	}
	
	@RequestMapping("/getTask_category")
	@ResponseBody
	public Msg getTask_category(@RequestParam(value="clId")int clId) {
		List<Task_category> task_categories=taskService.getTask_category(clId);
		return Msg.success().add("task_category", task_categories);
	}
	
	@RequestMapping("/checkTC")
	@ResponseBody
	public Msg checkTC(@RequestParam(value="clId")int clId,@RequestParam(value="tc")String tc) {
		List<Task_category> task_categories=taskService.check(clId,tc);
		if(task_categories.isEmpty()) {
			  return Msg.success();
		  }else {
			  return Msg.fail();
		  }	
	}
	
	@RequestMapping("/saveTC")
	@ResponseBody
	public Msg saveTC(@RequestParam(value="clId")int clId,@RequestParam(value="tc")String tc) {
		int result=taskService.save(clId,tc);
		if(result!=0) {
			return Msg.success();
		}else {
			return Msg.fail();
		}
	}
	@RequestMapping("/creatTask")
	@ResponseBody 
	public Msg creatResources(@RequestParam(value="file",required=false) MultipartFile file,int rc_id,String cId,int sId) {
		String dir = req.getSession().getServletContext().getRealPath("upload");          
        String filename = file.getOriginalFilename();
        String[] strArray = filename.split("\\.");
        int suffixIndex = strArray.length -1;
        System.out.println("文件名:"+filename);
        System.out.println("文件后缀:"+strArray[suffixIndex]);
        System.out.println("文件大小:"+file.getSize()/1024+"KB");
        //创建要保存文件的路径
        File dirFile = new File(dir,filename);
        if (!dirFile.exists()){
            dirFile.mkdirs();
        }
        try {
            //将文件写入创建的路径
            file.transferTo(dirFile);
            System.out.println("文件保存成功~");
        } catch (IOException e) {
            e.printStackTrace();
        }
        String name=file.getSize()/1024+"KB";
        Task task=new Task();
        task.setcId(cId);
        task.setTacId(rc_id);
        task.setName(name);
        task.setContent(filename);
        task.setsId(sId);
        int result=taskService.creatTask(task);
        if (result != 0){ 
			  return Msg.success(); 
		  } else {
			  return Msg.fail(); 
		  }
	  }
	
	@RequestMapping("/getTaskByCategory")
	@ResponseBody
	public Msg getTaskByCategory(@RequestParam(value="id") int id) {
		List<Task> tasks=taskService.getTaskByCategory(id);
		if(tasks.isEmpty()) {
			  return Msg.fail();
		  }else {
			  return Msg.success().add("tasks", tasks);
		  }	
	}
	
	@RequestMapping("/delAll")
	@ResponseBody
	public Msg downloadAll(@RequestParam(value="Names") String Names) {
		String[] strArray = Names.split("\\,");
        for(int i=0;i<strArray.length;i++) {
        	delTask(strArray[i]);
        }
		return Msg.success();
	}
	
	@RequestMapping("/delTask")
	@ResponseBody
	public Msg delTask(@RequestParam(value="Name") String Name) {
		int result=taskService.delByName(Name);
		if(result!=0) {
			return Msg.success();
		}else {
			return Msg.fail();
		}
	}
	
	@RequestMapping("/getTaskByStudent")
	@ResponseBody
	public Msg getTaskByStudent(@RequestParam(value="sId")int sId,@RequestParam(value="tacId")int tacId) {
		List<Task> tasks=taskService.getTaskByStudent(sId,tacId);
		if(tasks.isEmpty()) {
			  return Msg.fail();
		  }else {
			  return Msg.success().add("tasks", tasks);
		  }	
	}
}
