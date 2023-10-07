-- --------------------------------------------------------
-- Host:                         103.41.206.214
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


-- Dumping database structure for api_logs
CREATE DATABASE IF NOT EXISTS `api_logs` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `api_logs`;

-- Dumping structure for table api_logs.log_01
CREATE TABLE IF NOT EXISTS `log_01` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_02
CREATE TABLE IF NOT EXISTS `log_02` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_03
CREATE TABLE IF NOT EXISTS `log_03` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_04
CREATE TABLE IF NOT EXISTS `log_04` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_05
CREATE TABLE IF NOT EXISTS `log_05` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_06
CREATE TABLE IF NOT EXISTS `log_06` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_07
CREATE TABLE IF NOT EXISTS `log_07` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_08
CREATE TABLE IF NOT EXISTS `log_08` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_09
CREATE TABLE IF NOT EXISTS `log_09` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_10
CREATE TABLE IF NOT EXISTS `log_10` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_11
CREATE TABLE IF NOT EXISTS `log_11` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_12
CREATE TABLE IF NOT EXISTS `log_12` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_13
CREATE TABLE IF NOT EXISTS `log_13` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_14
CREATE TABLE IF NOT EXISTS `log_14` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_15
CREATE TABLE IF NOT EXISTS `log_15` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_16
CREATE TABLE IF NOT EXISTS `log_16` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_17
CREATE TABLE IF NOT EXISTS `log_17` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_18
CREATE TABLE IF NOT EXISTS `log_18` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_19
CREATE TABLE IF NOT EXISTS `log_19` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_20
CREATE TABLE IF NOT EXISTS `log_20` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_21
CREATE TABLE IF NOT EXISTS `log_21` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_22
CREATE TABLE IF NOT EXISTS `log_22` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_23
CREATE TABLE IF NOT EXISTS `log_23` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_24
CREATE TABLE IF NOT EXISTS `log_24` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_25
CREATE TABLE IF NOT EXISTS `log_25` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_26
CREATE TABLE IF NOT EXISTS `log_26` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_27
CREATE TABLE IF NOT EXISTS `log_27` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_28
CREATE TABLE IF NOT EXISTS `log_28` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_29
CREATE TABLE IF NOT EXISTS `log_29` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_30
CREATE TABLE IF NOT EXISTS `log_30` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table api_logs.log_31
CREATE TABLE IF NOT EXISTS `log_31` (
  `system_id` varchar(20) NOT NULL DEFAULT '',
  `method_used` varchar(50) NOT NULL DEFAULT '-',
  `last_accessed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_ip` varchar(20) DEFAULT NULL,
  `last_user_input` varchar(2000) DEFAULT NULL,
  `last_response` varchar(4000) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  KEY `ID` (`system_id`,`method_used`,`last_accessed`),
  KEY `last_user_input` (`last_user_input`(1000)),
  KEY `last_response` (`last_response`(1000))
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
