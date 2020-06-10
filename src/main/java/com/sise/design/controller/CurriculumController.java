package com.sise.design.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.sise.design.bean.Category;
import com.sise.design.bean.Curriculum;
import com.sise.design.bean.Msg;
import com.sise.design.bean.Resources;
import com.sise.design.service.CategoryService;
import com.sise.design.service.CurriculumService;
import com.sise.design.service.ResourcesService;


@Controller
public class CurriculumController {

	@Autowired
	CurriculumService curriculumService;
	
	@Autowired
	CategoryService categoryService;
	
	@Autowired
	ResourcesService resourcesService;
	
	@Autowired
	HttpServletRequest req;

	@RequestMapping("/checkCId")
	@ResponseBody
	public Msg checkCId(@RequestParam(value = "id") String id) {
		Curriculum curriculum = curriculumService.checkCId(id);
		if (curriculum != null) {
			return Msg.fail();
		} else {
			return Msg.success();
		}
	}
	
	
	@RequestMapping(value="/creatCurriculum")
	@ResponseBody 
	public Msg creatCurriculum(@RequestParam(value="file",required=false) MultipartFile file,String id,String Name,String Account,String systems,String Major,int Credit,String Photo,int TId){	  
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
          Curriculum curriculum=new Curriculum();
		  curriculum.setcId(id);
		  curriculum.setAccount(Account);
		  curriculum.setCredit(Credit);
		  curriculum.setMajor(Major);
		  curriculum.setName(Name);
		  curriculum.setPhoto(filename);
		  curriculum.setSystem(systems);
		  curriculum.settId(TId);
		  System.out.println(curriculum);
		  int result = curriculumService.creatCurriculum(curriculum);
		  if (result != 0){ 
			  return Msg.success(); 
		  } else {
			  return Msg.fail(); 
		  }
	  }
	  
	  @RequestMapping("/selectCurriculum")
	  @ResponseBody
	  public Msg selectCurriculum(@RequestParam(value="id")int id) {
		  List<Curriculum> curriculums=curriculumService.select(id);
		  return Msg.success().add("curr", curriculums);
		  
	  }
	  
	  @RequestMapping(value="/del_curriculum/{id}",method=RequestMethod.DELETE)
	  @ResponseBody
	  public Msg del_curriculum(@PathVariable("id")String id) {
		  int result=curriculumService.deleteCurriculum(id);
		  if(result!=0) {
			  return Msg.success();
		  }else {
			  return Msg.fail();
		  }
	  }
	  
	  @RequestMapping("/getcurriculum")
	  @ResponseBody
	  public Msg getcurriculum(@RequestParam(value="cId") String cId) {
		  Curriculum curriculum=curriculumService.selectCurriculum(cId);
		  return Msg.success().add("curr", curriculum);
		  
	  }
	  
	  @RequestMapping("/checkRC")
	  @ResponseBody
	  public Msg checkRC(@RequestParam(value="rc")String rc,@RequestParam(value="cId")String cId) {
		  List<Category> category=categoryService.checkRC(cId,rc);
		  if(category.isEmpty()) {
			  return Msg.success();
		  }else {
			  return Msg.fail();
		  }
	  }
	  
	  @RequestMapping("/saveRC")
	  @ResponseBody
	  public Msg saveRC(@RequestParam(value="rc")String rc,@RequestParam(value="cId")String cId) {
		  int result=categoryService.saveRC(cId,rc);
		  if(result!=0) {
			  return Msg.success();
		  }else {
			  return Msg.fail();
		  }
	  }
	  
	  @RequestMapping("/getRC")
	  @ResponseBody
	  public Msg getRC(@RequestParam(value="cId")String cId) {
		  List<Category> categories=categoryService.getAll(cId);
		  return Msg.success().add("rc", categories);
	  }
	  
	  @RequestMapping("/getResources")
	  @ResponseBody
	  public Msg getResources(@RequestParam(value="cId")String cId) {
		  List<Resources> resources=resourcesService.getAll(cId);
		  return Msg.success().add("resources", resources);
	  }
	  
	  @RequestMapping("/creatResources")
	  @ResponseBody 
	  public Msg creatResources(@RequestParam(value="file",required=false) MultipartFile file,int rc_id,String cId) {
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
          String name="文件大小:"+file.getSize()/1024+"KB";
          Resources resources=new Resources();
          resources.setcId(cId);
          resources.setRcId(rc_id);
          resources.setName(name);
          resources.setContent(filename);
          int result=resourcesService.creatResources(resources);
          if (result != 0){ 
			  return Msg.success(); 
		  } else {
			  return Msg.fail(); 
		  }
	  }
	  
	  @RequestMapping("/getResourcesByRC")
	  @ResponseBody
	  public Msg getResourcesByRC(@RequestParam(value="cId")String cId,@RequestParam(value="rcId")int rcId) {
		  List<Resources> resources=resourcesService.getResourcesByRC(rcId,cId);
		  return Msg.success().add("resource", resources);
	  }
	  
	  @RequestMapping("/getResource")
	  @ResponseBody
	  public Msg getResource(@RequestParam(value="cId")String cId,@RequestParam(value="pn",defaultValue = "1")Integer pn) {
		  PageHelper.startPage(pn,5);
		  List<Resources> resources=resourcesService.getAll(cId);
		  PageInfo page = new PageInfo(resources,5);
		  return Msg.success().add("pageInfo",page);
	  }
	  
	  @RequestMapping("/searchCurriculum")
	  @ResponseBody
	  public Msg searchCurriculum(@RequestParam(value="contend")String contend) {
		  List<Curriculum> curriculums=curriculumService.search(contend);
		  if(curriculums.isEmpty()) {
			  return Msg.fail();
		  }else {
			  return Msg.success().add("curr", curriculums);
		  }
		  
		  
	  }
	  @RequestMapping(value="/updateCurriculum")
	  @ResponseBody 
	  public Msg updateCurriculum(@RequestParam(value="file1",required=false)MultipartFile file,String id,String Name,String Account,String systems,String Major,int Credit){	  			  
		Curriculum curriculum = new Curriculum();
		if (!file.isEmpty()) {
			String dir = req.getSession().getServletContext().getRealPath("upload");
			String filename = file.getOriginalFilename();
			String[] strArray = filename.split("\\.");
			int suffixIndex = strArray.length - 1;
			System.out.println("文件名:" + filename);
			System.out.println("文件后缀:" + strArray[suffixIndex]);
			System.out.println("文件大小:" + file.getSize() / 1024 + "KB");
			// 创建要保存文件的路径
			File dirFile = new File(dir, filename);
			if (!dirFile.exists()) {
				dirFile.mkdirs();
			}
			try {
				// 将文件写入创建的路径
				file.transferTo(dirFile);
				curriculum.setPhoto(filename);
				System.out.println("文件保存成功~");
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		curriculum.setcId(id);
		curriculum.setAccount(Account);
		curriculum.setCredit(Credit);
		curriculum.setMajor(Major);
		curriculum.setName(Name);
		curriculum.setSystem(systems);
		int result = curriculumService.updateCurriculum(curriculum);
		if (result != 0) {
			return Msg.success();
		} else {
			return Msg.fail();
		}
	}
	@RequestMapping("/selectAllCurriculum")
	@ResponseBody
	public Msg selectAllCurriculum() {
		List<Curriculum> curriculums=curriculumService.selectAll();
		if(curriculums.isEmpty()) {
			  return Msg.fail();
		  }else {
			  return Msg.success().add("curr", curriculums);
		  }
	}
	@RequestMapping("/delResources")
	@ResponseBody
	public Msg delResources(@RequestParam(value = "id")int id) {
		int result=resourcesService.delResources(id);
		if (result != 0) {
			return Msg.success();
		} else {
			return Msg.fail();
		}
	}
}
