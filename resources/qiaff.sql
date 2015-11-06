-- MySQL dump 10.14  Distrib 5.5.32-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: qiaff
-- ------------------------------------------------------
-- Server version	5.5.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config` (
  `key` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `value` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
INSERT INTO `config` VALUES ('currency','Currency','$'),('session_timeout','Session timeout','0');
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log` (
  `date_time` datetime NOT NULL,
  `log` varchar(255) NOT NULL,
  `idlog_type` tinyint(4) NOT NULL,
  `iduser` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`date_time`),
  KEY `fk_log_log_type1_idx` (`idlog_type`),
  KEY `fk_log_user1_idx` (`iduser`),
  CONSTRAINT `fk_log_log_type1` FOREIGN KEY (`idlog_type`) REFERENCES `log_type` (`idlog_type`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_log_user1` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log`
--

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
/*!40000 ALTER TABLE `log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_type`
--

DROP TABLE IF EXISTS `log_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log_type` (
  `idlog_type` tinyint(4) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`idlog_type`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_type`
--

LOCK TABLES `log_type` WRITE;
/*!40000 ALTER TABLE `log_type` DISABLE KEYS */;
INSERT INTO `log_type` VALUES (1,'User manager');
/*!40000 ALTER TABLE `log_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilege`
--

DROP TABLE IF EXISTS `privilege`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `privilege` (
  `privilege` varchar(20) NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`privilege`),
  UNIQUE KEY `privilege_UNIQUE` (`privilege`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilege`
--

LOCK TABLES `privilege` WRITE;
/*!40000 ALTER TABLE `privilege` DISABLE KEYS */;
INSERT INTO `privilege` VALUES ('material_view',''),('product_add',''),('product_delete',''),('product_edit',''),('product_view',''),('user_manager','');
/*!40000 ALTER TABLE `privilege` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilege_group`
--

DROP TABLE IF EXISTS `privilege_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `privilege_group` (
  `iduser_group` tinyint(3) unsigned NOT NULL,
  `privilege` varchar(20) NOT NULL,
  UNIQUE KEY `iduser_group_UNIQUE` (`iduser_group`,`privilege`),
  KEY `fk_privilege_group_privilege1_idx` (`privilege`),
  CONSTRAINT `fk_privilege_group_privilege1` FOREIGN KEY (`privilege`) REFERENCES `privilege` (`privilege`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_privilege_group_user_group1` FOREIGN KEY (`iduser_group`) REFERENCES `user_group` (`iduser_group`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilege_group`
--

LOCK TABLES `privilege_group` WRITE;
/*!40000 ALTER TABLE `privilege_group` DISABLE KEYS */;
INSERT INTO `privilege_group` VALUES (2,'material_view'),(2,'product_view');
/*!40000 ALTER TABLE `privilege_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilege_user`
--

DROP TABLE IF EXISTS `privilege_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `privilege_user` (
  `iduser` smallint(5) unsigned NOT NULL,
  `privilege` varchar(20) NOT NULL,
  UNIQUE KEY `iduser_UNIQUE` (`iduser`,`privilege`),
  KEY `fk_privilege_user_privilege1_idx` (`privilege`),
  CONSTRAINT `fk_privilege_user_privilege1` FOREIGN KEY (`privilege`) REFERENCES `privilege` (`privilege`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_privilege_user_user1` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilege_user`
--

LOCK TABLES `privilege_user` WRITE;
/*!40000 ALTER TABLE `privilege_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `privilege_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilege_user_revoke`
--

DROP TABLE IF EXISTS `privilege_user_revoke`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `privilege_user_revoke` (
  `iduser` smallint(5) unsigned NOT NULL,
  `privilege` varchar(20) NOT NULL,
  UNIQUE KEY `iduser_UNIQUE` (`iduser`,`privilege`),
  KEY `fk_privilege_user_revoke_user1_idx` (`iduser`),
  KEY `fk_privilege_user_revoke_privilege1_idx` (`privilege`),
  CONSTRAINT `fk_privilege_user_revoke_privilege1` FOREIGN KEY (`privilege`) REFERENCES `privilege` (`privilege`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_privilege_user_revoke_user1` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilege_user_revoke`
--

LOCK TABLES `privilege_user_revoke` WRITE;
/*!40000 ALTER TABLE `privilege_user_revoke` DISABLE KEYS */;
/*!40000 ALTER TABLE `privilege_user_revoke` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `iduser` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL COMMENT 'Automatically same with email address if empty',
  `password` varchar(45) NOT NULL,
  `iduser_group` tinyint(3) unsigned NOT NULL,
  `email` varchar(45) NOT NULL,
  `company_name` varchar(45) NOT NULL DEFAULT '',
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(45) NOT NULL DEFAULT '',
  `postal_code` varchar(10) NOT NULL DEFAULT '',
  `fullname` varchar(40) DEFAULT '',
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_user_user_group1_idx` (`iduser_group`),
  CONSTRAINT `fk_user_user_group1` FOREIGN KEY (`iduser_group`) REFERENCES `user_group` (`iduser_group`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'bayu','a430e06de5ce438d499c2e4063d60fd6',0,'bayucandra@gmail.com','Wisanka','Jalan jalan','','','Bayu'),(6,'ahmadcandra','61243c7b9a4022cb3f8dc3106767ed12',0,'ahmadcandra@localhost','',NULL,'','','Ahmad Candra'),(7,'dienasyauqia','fb468ca8e5c700ce6a4371c6cceb186b',2,'qia@localhost','',NULL,'','','Diena syauqia edited');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_group`
--

DROP TABLE IF EXISTS `user_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_group` (
  `iduser_group` tinyint(3) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`iduser_group`),
  UNIQUE KEY `description_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_group`
--

LOCK TABLES `user_group` WRITE;
/*!40000 ALTER TABLE `user_group` DISABLE KEYS */;
INSERT INTO `user_group` VALUES (2,'employee'),(1,'nogroup'),(0,'root');
/*!40000 ALTER TABLE `user_group` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-11-06 15:36:04
