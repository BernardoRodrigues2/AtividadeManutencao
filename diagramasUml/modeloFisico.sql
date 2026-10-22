-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: a2
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agendamentos`
--

DROP TABLE IF EXISTS `agendamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agendamentos` (
  `codAgendamento` int NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `hora` time NOT NULL,
  `tipoServico` varchar(100) NOT NULL,
  `idCliente` int NOT NULL,
  `idConsole` int NOT NULL,
  PRIMARY KEY (`codAgendamento`),
  KEY `idCliente` (`idCliente`),
  KEY `idConsole` (`idConsole`),
  CONSTRAINT `agendamentos_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`codCliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `agendamentos_ibfk_2` FOREIGN KEY (`idConsole`) REFERENCES `consoles` (`codConsole`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agendamentos`
--

LOCK TABLES `agendamentos` WRITE;
/*!40000 ALTER TABLE `agendamentos` DISABLE KEYS */;
INSERT INTO `agendamentos` VALUES (1,'2026-10-25','14:00:00','Manutenção',1,1),(2,'2026-10-26','10:30:00','Limpeza',2,2),(3,'2026-10-27','15:00:00','Manutenção completa',2,2);
/*!40000 ALTER TABLE `agendamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `codCliente` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `cpf` varchar(255) NOT NULL,
  `telefone` varchar(50) NOT NULL,
  PRIMARY KEY (`codCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Marcos','marcos@gmail.com','U2FsdGVkX19KhuCCaxZfEdjJF2of3zJqHWOFUqdD9Sk=','U2FsdGVkX19kuMEhX9X9dD6cZ/DSfh9TLOK/X+2ONzA=','48999998888'),(2,'Ana','ana@gmail.com','U2FsdGVkX1/Cw4BMlClaOIfEsCf35yaf1j/TzJYw4Fw=','U2FsdGVkX1/NaOvqFThDoVMuZPzL6Pt7muf1OMrNIcY=','48988887777'),(3,'Roberto','roberto@gmail.com','U2FsdGVkX1+pKf71iptfqMG4kedkS+Y5lRxxb6r7hUc=','U2FsdGVkX1/J4nZUMDGo7zZySBz/eNmx5rDntyRrMcc=','48977776666');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consoles`
--

DROP TABLE IF EXISTS `consoles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consoles` (
  `codConsole` int NOT NULL AUTO_INCREMENT,
  `modelo` varchar(50) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `numSerie` varchar(255) NOT NULL,
  `tipo` varchar(40) NOT NULL,
  `idCliente` int NOT NULL,
  PRIMARY KEY (`codConsole`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `consoles_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`codCliente`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consoles`
--

LOCK TABLES `consoles` WRITE;
/*!40000 ALTER TABLE `consoles` DISABLE KEYS */;
INSERT INTO `consoles` VALUES (1,'PlayStation 5','Sony','U2FsdGVkX1+Yjcwx5UlZQTYnVDsTkxxGsjhbTTiT0oE=','Videogame',1),(2,'Xbox Series S','Microsoft','U2FsdGVkX18xKpawj06OnyzatB6wnELaCVDpPTo+p5E=','Videogame',2);
/*!40000 ALTER TABLE `consoles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-22  9:37:20
