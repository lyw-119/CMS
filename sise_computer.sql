/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50149
Source Host           : localhost:3306
Source Database       : sise_computer

Target Server Type    : MYSQL
Target Server Version : 50149
File Encoding         : 65001

Date: 2020-04-21 12:56:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `clazz`
-- ----------------------------
DROP TABLE IF EXISTS `clazz`;
CREATE TABLE `clazz` (
  `cl_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `c_id` varchar(10) NOT NULL,
  PRIMARY KEY (`cl_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of clazz
-- ----------------------------
INSERT INTO `clazz` VALUES ('1', 'AMP', 'cm1414');
INSERT INTO `clazz` VALUES ('2', 'AOP', 'dm1414');
INSERT INTO `clazz` VALUES ('3', 'AOP', 'cm1414');

-- ----------------------------
-- Table structure for `clazz_apply`
-- ----------------------------
DROP TABLE IF EXISTS `clazz_apply`;
CREATE TABLE `clazz_apply` (
  `a_id` int(11) NOT NULL AUTO_INCREMENT,
  `s_id` int(11) DEFAULT NULL,
  `cl_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`a_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of clazz_apply
-- ----------------------------

-- ----------------------------
-- Table structure for `curriculum`
-- ----------------------------
DROP TABLE IF EXISTS `curriculum`;
CREATE TABLE `curriculum` (
  `c_id` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `account` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `system` varchar(255) NOT NULL,
  `major` varchar(255) NOT NULL,
  `credit` int(2) NOT NULL,
  `t_id` int(10) NOT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of curriculum
-- ----------------------------
INSERT INTO `curriculum` VALUES ('cm1414', '微信小程序', '带你入门微信小程序开发，了解微信小程序的基本知识', '16847463_1356330874671.jpg', '计算机系', '计算机', '2', '111');
INSERT INTO `curriculum` VALUES ('dm1414', 'java', '编程语言', '16847463_1356330874671.jpg', '计算机系', '计算机', '4', '111');

-- ----------------------------
-- Table structure for `curriculum_resources`
-- ----------------------------
DROP TABLE IF EXISTS `curriculum_resources`;
CREATE TABLE `curriculum_resources` (
  `r_id` int(11) NOT NULL AUTO_INCREMENT,
  `rc_id` int(11) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `c_id` varchar(10) NOT NULL,
  PRIMARY KEY (`r_id`),
  KEY `fk_c` (`c_id`),
  KEY `fk_rc` (`rc_id`),
  CONSTRAINT `fk_c` FOREIGN KEY (`c_id`) REFERENCES `curriculum` (`c_id`),
  CONSTRAINT `fk_rc` FOREIGN KEY (`rc_id`) REFERENCES `resources_category` (`rc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of curriculum_resources
-- ----------------------------
INSERT INTO `curriculum_resources` VALUES ('1', '1', '第1讲 微信小程序简介.pptx', '文件大小:4420KB', 'cm1414');
INSERT INTO `curriculum_resources` VALUES ('2', '1', '第2讲 微信小程序框架目录分析.pptx', '文件大小:3263KB', 'cm1414');
INSERT INTO `curriculum_resources` VALUES ('3', '1', '第3讲 小程序数据绑定.pptx', '文件大小:2109KB', 'cm1414');
INSERT INTO `curriculum_resources` VALUES ('4', '1', '第4讲 微信小程序渲染.pptx', '文件大小:2038KB', 'cm1414');
INSERT INTO `curriculum_resources` VALUES ('5', '5', '第5讲 微信小程序模板与引用.pptx', '文件大小:4241KB', 'cm1414');
INSERT INTO `curriculum_resources` VALUES ('6', '6', '实验1  Java EE开发环境搭建与软件下载.doc', '文件大小:21KB', 'cm1414');
INSERT INTO `curriculum_resources` VALUES ('8', '4', '白果炖鸡(Av16027531,P12).Flv', '文件大小:223952KB', 'cm1414');
INSERT INTO `curriculum_resources` VALUES ('9', '6', '学号-姓名-实验15-交互反馈API的使用.doc', '文件大小:120KB', 'cm1414');
INSERT INTO `curriculum_resources` VALUES ('10', '6', '学号-姓名-实验16-数据库交互操作.doc', '文件大小:207KB', 'cm1414');

-- ----------------------------
-- Table structure for `manager`
-- ----------------------------
DROP TABLE IF EXISTS `manager`;
CREATE TABLE `manager` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of manager
-- ----------------------------
INSERT INTO `manager` VALUES ('123', 'lyw', '111');

-- ----------------------------
-- Table structure for `notice`
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `n_id` int(11) NOT NULL AUTO_INCREMENT,
  `c_id` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `time` date NOT NULL,
  PRIMARY KEY (`n_id`),
  KEY `fk_n` (`c_id`),
  CONSTRAINT `fk_n` FOREIGN KEY (`c_id`) REFERENCES `curriculum` (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES ('1', 'cm1414', '作业', '第一次作业完成较慢，同学们抓紧时间完成并提交', '2020-04-02');

-- ----------------------------
-- Table structure for `problem`
-- ----------------------------
DROP TABLE IF EXISTS `problem`;
CREATE TABLE `problem` (
  `q_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `account` varchar(255) DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  `c_id` varchar(255) DEFAULT NULL,
  `time` date DEFAULT NULL,
  PRIMARY KEY (`q_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of problem
-- ----------------------------
INSERT INTO `problem` VALUES ('3', '微信', '微信小程序需要进行什么操作', '1640706119', 'cm1414', '2020-04-05');
INSERT INTO `problem` VALUES ('4', '微信小程序', '微信小程序需要哪些技术基础', '111', 'cm1414', '2020-04-09');

-- ----------------------------
-- Table structure for `problem_reply`
-- ----------------------------
DROP TABLE IF EXISTS `problem_reply`;
CREATE TABLE `problem_reply` (
  `num` int(11) NOT NULL AUTO_INCREMENT,
  `id` int(11) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `time` date DEFAULT NULL,
  `q_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`num`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of problem_reply
-- ----------------------------
INSERT INTO `problem_reply` VALUES ('4', '111', '微信小程序平台', '2020-04-09', '3');
INSERT INTO `problem_reply` VALUES ('5', '111', '注册平台账号', '2020-04-09', '3');
INSERT INTO `problem_reply` VALUES ('6', '111', 'aaaa', '2020-04-09', '3');

-- ----------------------------
-- Table structure for `resources_category`
-- ----------------------------
DROP TABLE IF EXISTS `resources_category`;
CREATE TABLE `resources_category` (
  `rc_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `c_id` varchar(255) NOT NULL,
  PRIMARY KEY (`rc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of resources_category
-- ----------------------------
INSERT INTO `resources_category` VALUES ('1', '课件', 'cm1414');
INSERT INTO `resources_category` VALUES ('2', '视屏', 'dm1414');
INSERT INTO `resources_category` VALUES ('4', '视屏', 'cm1414');
INSERT INTO `resources_category` VALUES ('5', 'ppt', 'cm1414');
INSERT INTO `resources_category` VALUES ('6', '作业', 'cm1414');

-- ----------------------------
-- Table structure for `student_class`
-- ----------------------------
DROP TABLE IF EXISTS `student_class`;
CREATE TABLE `student_class` (
  `num` int(11) NOT NULL AUTO_INCREMENT,
  `s_id` int(10) NOT NULL,
  `cl_id` int(5) NOT NULL,
  PRIMARY KEY (`num`),
  KEY `fk_student_class` (`cl_id`),
  CONSTRAINT `fk_student_class` FOREIGN KEY (`cl_id`) REFERENCES `clazz` (`cl_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student_class
-- ----------------------------
INSERT INTO `student_class` VALUES ('1', '1640706119', '1');
INSERT INTO `student_class` VALUES ('2', '1640706119', '2');
INSERT INTO `student_class` VALUES ('4', '1640706110', '1');
INSERT INTO `student_class` VALUES ('11', '1640706113', '3');
INSERT INTO `student_class` VALUES ('12', '1640706100', '1');

-- ----------------------------
-- Table structure for `student_info`
-- ----------------------------
DROP TABLE IF EXISTS `student_info`;
CREATE TABLE `student_info` (
  `s_id` int(10) NOT NULL,
  `name` varchar(4) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` varchar(1) NOT NULL,
  `email` varchar(255) NOT NULL,
  `system` varchar(255) NOT NULL,
  `major` varchar(255) NOT NULL,
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student_info
-- ----------------------------
INSERT INTO `student_info` VALUES ('1640706100', 'lsw', '111', 'M', '111@111', '计算机系', '计算机');
INSERT INTO `student_info` VALUES ('1640706101', 'lll', '111', 'M', '111@111', '计算机系', '计算机');
INSERT INTO `student_info` VALUES ('1640706102', 'a', '111', 'M', '111@111', '计算机系', '计算机');
INSERT INTO `student_info` VALUES ('1640706103', 'b', '111', 'M', '111@111', '计算机系', '计算机');
INSERT INTO `student_info` VALUES ('1640706105', '111', '111', 'M', '111@111', '计算机系', '1');
INSERT INTO `student_info` VALUES ('1640706106', '11', '111', 'M', '111@111', '计算机系', '1');
INSERT INTO `student_info` VALUES ('1640706107', '111', '111', 'W', '111@111', '数码媒体系', '1');
INSERT INTO `student_info` VALUES ('1640706108', '111', '111', 'M', '111@111', '计算机系', '1');
INSERT INTO `student_info` VALUES ('1640706109', '111', '111', 'M', '111@111', '计算机系', '1');
INSERT INTO `student_info` VALUES ('1640706110', '111', '111', 'M', '111@111', '计算机系', '1');
INSERT INTO `student_info` VALUES ('1640706111', '111', '111', 'M', '111@111', '计算机系', '1');
INSERT INTO `student_info` VALUES ('1640706112', '111', '111', 'M', '111@111', '计算机系', '111');
INSERT INTO `student_info` VALUES ('1640706113', '111', '111', 'M', '111@111', '计算机系', '111');
INSERT INTO `student_info` VALUES ('1640706119', '林奕威', '111', 'M', '11111', '计算机系', '1');
INSERT INTO `student_info` VALUES ('1640706120', 'a', '111', 'M', '111@111', '计算机系', '111');
INSERT INTO `student_info` VALUES ('1640706121', 'a', '111', 'M', '111@111', '计算机系', '1');
INSERT INTO `student_info` VALUES ('1640706122', 'a', '111', 'M', '111@111', '计算机系', '1');
INSERT INTO `student_info` VALUES ('1640706123', '111', '111', 'M', '111@111', '计算机系', '1');
INSERT INTO `student_info` VALUES ('1640706135', 'whh', '111', 'M', '111@111', '计算机系', '111');

-- ----------------------------
-- Table structure for `task`
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `ta_id` int(11) NOT NULL AUTO_INCREMENT,
  `s_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `tac_id` int(11) NOT NULL,
  `c_id` varchar(11) NOT NULL,
  PRIMARY KEY (`ta_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES ('4', '1640706119', '47KB', '实验报告(实验3 Struts2的基本应用)(1640706119_林奕威).doc', '5', 'cm1414');
INSERT INTO `task` VALUES ('5', '1640706119', '188KB', '实验报告(实验1  Java EE开发环境搭建与软件下载)(1640706119_林奕威).doc', '1', 'cm1414');
INSERT INTO `task` VALUES ('6', '1640706119', '721KB', '1640706119-林奕威-实验1-微信小程序开发工具的使用.doc', '1', 'cm1414');
INSERT INTO `task` VALUES ('7', '1640706119', '176KB', '1640706119-林奕威-实验3-天气微信小程序首页设计.doc', '5', 'cm1414');

-- ----------------------------
-- Table structure for `task_category`
-- ----------------------------
DROP TABLE IF EXISTS `task_category`;
CREATE TABLE `task_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `cl_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of task_category
-- ----------------------------
INSERT INTO `task_category` VALUES ('1', '第一次作业', '1');
INSERT INTO `task_category` VALUES ('2', '第二次作业', '1');
INSERT INTO `task_category` VALUES ('3', '第一次作业', '3');
INSERT INTO `task_category` VALUES ('4', '第二次作业', '3');
INSERT INTO `task_category` VALUES ('5', '第三次作业', '1');
INSERT INTO `task_category` VALUES ('6', '第三次作业', '3');

-- ----------------------------
-- Table structure for `teacher_info`
-- ----------------------------
DROP TABLE IF EXISTS `teacher_info`;
CREATE TABLE `teacher_info` (
  `t_id` int(10) NOT NULL,
  `name` varchar(4) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` varchar(1) NOT NULL,
  `system` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teacher_info
-- ----------------------------
INSERT INTO `teacher_info` VALUES ('111', 'lyw', '111', 'M', '计算机系', '111@111');
INSERT INTO `teacher_info` VALUES ('112', 'lla', '111', 'F', '数码媒体系', '111@111');
INSERT INTO `teacher_info` VALUES ('113', 'a', '111', 'M', '软件系', '111@111');
INSERT INTO `teacher_info` VALUES ('114', 'b', '111', 'F', '管理系', '11@111');
INSERT INTO `teacher_info` VALUES ('115', 'c', '111', 'M', '国贸系', '11@111');
INSERT INTO `teacher_info` VALUES ('14141', 'lll', '111', 'M', '计算机系', '111@111');
