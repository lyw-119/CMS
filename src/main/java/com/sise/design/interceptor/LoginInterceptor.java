package com.sise.design.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;


public class LoginInterceptor implements HandlerInterceptor {

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
			Exception exception) throws Exception {
		

	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndViewodelAndView) throws Exception {
		
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		// 获取请求的URL
		String url = request.getRequestURI();
		String per3 = "students teachers getSelectStudent getSelectTeacher delStudent delTeacher updateManager";
		String per2 = "delResources updateTeacher getTaskByStudent delNotice saveNotice delApply agrApply getClassName getApply updateCurriculum registerTeacher checktId checkCId creatCurriculum selectCurriculum del_curriculum checkRC saveRC checkClazz saveClazz creatResources deleteStudentByClazz deleteAll checkTC saveTC delAll delTask Teacher_curriculum";
	    String per1 = "checkId saveApply getApplyByStudent registerStudent updateStudent selectStudentClass creatTask Student_curriculum selectStudentByCId";
	    String publicUri = "selectAllCurriculum FirstPage getNotice delReplyByNum delProblem delReply getReply saveReply getProblem getAllProblem getMyProblem addProblem details searchCurriculum system logout changePassword getuser getcurriculum getResources getRC getResourcesByRC getClazz getStudents getStudentByClazz getClazzByStudent getTasks getTask_category getTaskByCategory";
		// 获取Session
		HttpSession session = request.getSession();
		if(session.getAttribute("user")!=null) {
			int type=(int) session.getAttribute("userType");
		    String uri = url.substring(url.lastIndexOf("/")+1);
		    if(publicUri.contains(uri)){
	            return true;    //不拦截
	        }
		    boolean bRet = false;
		    switch (type){
            	case 3:
            		bRet = per3.contains(uri);
            		break;
            	case 2:
            		bRet = per2.contains(uri);
            		break;
            	case 1:
            		bRet = per1.contains(uri);
            		break;
		    }
		    System.out.println((bRet?"不拦截":"拦截")+" uri:"+uri+" ret:"+bRet);
        	return  bRet;
		}
		
		// 不符合条件的给出提示信息，并转发到登录页面
		request.setAttribute("msg", "您还没有登录，请先登录！");
		request.getRequestDispatcher("/WEB-INF/jsp/login.jsp").forward(request, response);
		return false;
	}

}
