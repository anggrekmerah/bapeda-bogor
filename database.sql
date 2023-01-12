-- --------------------------------------------------------
-- Host:                         192.168.101.127
-- Server version:               5.5.68-MariaDB - MariaDB Server
-- Server OS:                    Linux
-- HeidiSQL Version:             12.2.0.6576
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for bapenda
CREATE DATABASE IF NOT EXISTS `bapenda` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `bapenda`;

-- Dumping structure for table bapenda.t_incoming_call_log
CREATE TABLE IF NOT EXISTS `t_incoming_call_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `caller_id` varchar(255) NOT NULL DEFAULT '0',
  `peer_id` varchar(255) NOT NULL DEFAULT '0',
  `call_event` varchar(50) NOT NULL DEFAULT '0',
  `call_date` datetime NOT NULL,
  `call_number` varchar(15) NOT NULL DEFAULT '0',
  `call_receive_number` varchar(15) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `call_receive_number` (`call_receive_number`),
  KEY `caller_id` (`caller_id`),
  KEY `call_date` (`call_date`),
  KEY `call_event` (`call_event`)
) ENGINE=InnoDB AUTO_INCREMENT=239 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
