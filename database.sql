-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.27-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
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
CREATE DATABASE IF NOT EXISTS `bapenda` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `bapenda`;

-- Dumping structure for table bapenda.m_extension
CREATE TABLE IF NOT EXISTS `m_extension` (
  `id_extension` int(11) NOT NULL AUTO_INCREMENT,
  `extension` varchar(10) NOT NULL,
  `active` enum('Y','N') NOT NULL DEFAULT 'Y',
  `created_datetime` datetime NOT NULL,
  `user_created` int(11) NOT NULL,
  `update_datetime` datetime NOT NULL,
  `user_updated` int(11) NOT NULL,
  PRIMARY KEY (`id_extension`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table bapenda.m_extension: ~2 rows (approximately)
INSERT IGNORE INTO `m_extension` (`id_extension`, `extension`, `active`, `created_datetime`, `user_created`, `update_datetime`, `user_updated`) VALUES
	(1, '8001', 'Y', '2022-12-20 21:50:31', 1, '2022-12-20 21:50:57', 1),
	(2, '31001', 'Y', '2022-12-29 00:01:18', 1, '0000-00-00 00:00:00', 0);

-- Dumping structure for table bapenda.m_group
CREATE TABLE IF NOT EXISTS `m_group` (
  `id_group` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(50) NOT NULL DEFAULT '0',
  `group_desc` varchar(100) NOT NULL,
  `active` enum('Y','N') NOT NULL DEFAULT 'Y',
  `created_datetime` datetime NOT NULL,
  `user_created` int(11) NOT NULL,
  `update_datetime` datetime NOT NULL,
  `user_updated` int(11) NOT NULL,
  PRIMARY KEY (`id_group`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table bapenda.m_group: ~5 rows (approximately)
INSERT IGNORE INTO `m_group` (`id_group`, `group_name`, `group_desc`, `active`, `created_datetime`, `user_created`, `update_datetime`, `user_updated`) VALUES
	(2, 'test', 'test', 'N', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
	(3, 'test12', 'test12', 'Y', '2022-12-18 01:48:06', 0, '2022-12-18 11:19:33', 1),
	(4, 'test3', 'test', 'Y', '2022-12-18 11:24:32', 1, '0000-00-00 00:00:00', 0),
	(5, 'test3', 'test3', 'Y', '2022-12-20 00:32:22', 1, '2022-12-20 00:55:44', 1),
	(6, 'testt23', 'testst23', 'N', '2022-12-20 00:35:12', 1, '2022-12-20 00:40:02', 1);

-- Dumping structure for table bapenda.m_group_menu
CREATE TABLE IF NOT EXISTS `m_group_menu` (
  `id_group_menu` int(11) NOT NULL AUTO_INCREMENT,
  `id_group` int(11) NOT NULL,
  `id_menu` int(11) NOT NULL,
  `active` enum('Y','N') NOT NULL DEFAULT 'Y',
  `created_datetime` datetime NOT NULL,
  `user_created` int(11) NOT NULL,
  PRIMARY KEY (`id_group_menu`),
  KEY `id_group` (`id_group`),
  KEY `id_menu` (`id_menu`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table bapenda.m_group_menu: ~12 rows (approximately)
INSERT IGNORE INTO `m_group_menu` (`id_group_menu`, `id_group`, `id_menu`, `active`, `created_datetime`, `user_created`) VALUES
	(72, 3, 11, 'Y', '2022-12-21 23:25:54', 1),
	(73, 3, 12, 'Y', '2022-12-21 23:25:54', 1),
	(74, 3, 1, 'Y', '2022-12-21 23:25:54', 1),
	(75, 3, 2, 'Y', '2022-12-21 23:25:54', 1),
	(76, 3, 3, 'Y', '2022-12-21 23:25:54', 1),
	(77, 3, 4, 'Y', '2022-12-21 23:25:54', 1),
	(78, 3, 5, 'Y', '2022-12-21 23:25:54', 1),
	(79, 3, 6, 'Y', '2022-12-21 23:25:54', 1),
	(80, 3, 7, 'Y', '2022-12-21 23:25:54', 1),
	(81, 3, 8, 'Y', '2022-12-21 23:25:54', 1),
	(82, 3, 9, 'Y', '2022-12-21 23:25:54', 1),
	(83, 3, 10, 'Y', '2022-12-21 23:25:54', 1);

-- Dumping structure for table bapenda.m_menu
CREATE TABLE IF NOT EXISTS `m_menu` (
  `id_menu` int(11) NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(100) NOT NULL,
  `menu_desc` varchar(100) NOT NULL,
  `menu_url` varchar(255) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `icon` varchar(100) NOT NULL,
  `order_menu` int(11) NOT NULL DEFAULT 0,
  `active` enum('Y','N') NOT NULL DEFAULT 'Y',
  `created_datetime` datetime NOT NULL,
  `user_created` int(11) NOT NULL,
  `update_datetime` datetime NOT NULL,
  `user_updated` int(11) NOT NULL,
  PRIMARY KEY (`id_menu`),
  KEY `parent_id` (`parent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table bapenda.m_menu: ~19 rows (approximately)
INSERT IGNORE INTO `m_menu` (`id_menu`, `menu_name`, `menu_desc`, `menu_url`, `parent_id`, `icon`, `order_menu`, `active`, `created_datetime`, `user_created`, `update_datetime`, `user_updated`) VALUES
	(1, 'Settings', 'Menu setting', '', 0, 'fa-solid fa-gear', 2, 'Y', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
	(2, 'Group', 'Group', '/group', 1, 'fa-solid fa-bars-sort', 4, 'Y', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
	(3, 'Users', 'Users', '/users', 1, 'fa-solid fa-user', 5, 'Y', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
	(4, 'Menus', 'Menus', '/menu', 1, 'fa-solid fa-bars', 6, 'Y', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
	(5, 'Group Menus', 'Group Menus', '/group-menu', 1, 'fa-solid fa-bars-filter', 7, 'Y', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
	(6, 'Sitemap', 'Sitemap', '/sitemap', 1, 'fa-solid fa-sitemap', 8, 'Y', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
	(7, 'Phone', 'Phone', '', 0, 'fa-solid fa-phone', 3, 'Y', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
	(8, 'Phone Book', 'Phone Book', '/phone-book', 7, 'fa-solid fa-book', 9, 'Y', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
	(9, 'Black List', 'Black List', '/black-list', 7, 'fa-duotone fa-book-skull', 10, 'Y', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
	(10, 'Extension', 'Extension', '/extension', 7, 'fa-solid fa-puzzle-piece', 11, 'Y', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
	(11, 'Dashboard', 'Dashboard', '/dashboard', 0, 'fa-solid fa-gauge', 0, 'Y', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
	(12, 'Dashboard Agent', 'Dashboard Agent', '/dashboard-agent', 0, 'fa-solid fa-gauge', 1, 'Y', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
	(13, 'test1', 'test', '/test1', 1, 'fas fa-check', 1, 'N', '2022-12-21 00:06:12', 1, '2022-12-21 00:07:15', 1),
	(14, 'Report', 'report parent', '', 0, 'fa-solid fa-book', 4, 'Y', '2022-12-23 23:06:57', 1, '0000-00-00 00:00:00', 0),
	(15, 'Receive', 'report Receive', '/report/receive', 14, '', 0, 'Y', '2022-12-23 23:08:30', 1, '0000-00-00 00:00:00', 0),
	(16, 'Abandon', 'report Abandon', '/report/abandon', 14, '', 1, 'Y', '2022-12-23 23:08:57', 1, '0000-00-00 00:00:00', 0),
	(17, 'Outgoing', 'report Outgoing', '/report/outgoing', 14, '', 2, 'Y', '2022-12-23 23:09:24', 1, '0000-00-00 00:00:00', 0),
	(18, 'User Activity', 'report User Activity', '/report/user-activity', 14, '', 3, 'Y', '2022-12-23 23:09:51', 1, '0000-00-00 00:00:00', 0),
	(19, 'KPI Call Frequency', 'report KPI Call Frequency', '/report/kpi-call', 14, '', 4, 'Y', '2022-12-23 23:10:14', 1, '0000-00-00 00:00:00', 0);

-- Dumping structure for table bapenda.m_phone_book
CREATE TABLE IF NOT EXISTS `m_phone_book` (
  `id_phone_book` bigint(20) NOT NULL AUTO_INCREMENT,
  `phone_name` varchar(100) NOT NULL DEFAULT '0',
  `phone_number` varchar(15) NOT NULL,
  `notes` varchar(255) NOT NULL,
  `created_datetime` datetime NOT NULL,
  `user_created` int(11) NOT NULL,
  `update_datetime` datetime NOT NULL,
  `user_updated` int(11) NOT NULL,
  `active` enum('Y','N') NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`id_phone_book`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table bapenda.m_phone_book: ~0 rows (approximately)
INSERT IGNORE INTO `m_phone_book` (`id_phone_book`, `phone_name`, `phone_number`, `notes`, `created_datetime`, `user_created`, `update_datetime`, `user_updated`, `active`) VALUES
	(1, 'test12', '082122071291', 'teststeststsetset232342', '2022-12-20 20:45:04', 1, '2022-12-20 20:45:54', 1, 'Y');

-- Dumping structure for table bapenda.m_sitemap
CREATE TABLE IF NOT EXISTS `m_sitemap` (
  `id_sitemap` int(11) NOT NULL AUTO_INCREMENT,
  `id_group` int(11) NOT NULL,
  `hirarcy_ordered` int(11) NOT NULL,
  `active` enum('Y','N') NOT NULL DEFAULT 'Y',
  `created_datetime` datetime NOT NULL,
  `user_created` int(11) NOT NULL,
  `update_datetime` datetime NOT NULL,
  `user_updated` int(11) NOT NULL,
  PRIMARY KEY (`id_sitemap`) USING BTREE,
  KEY `id_group` (`id_group`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table bapenda.m_sitemap: ~2 rows (approximately)
INSERT IGNORE INTO `m_sitemap` (`id_sitemap`, `id_group`, `hirarcy_ordered`, `active`, `created_datetime`, `user_created`, `update_datetime`, `user_updated`) VALUES
	(4, 3, 1, 'N', '2022-12-20 22:25:48', 1, '0000-00-00 00:00:00', 0),
	(5, 3, 1, 'Y', '2022-12-20 22:28:14', 1, '0000-00-00 00:00:00', 0),
	(6, 4, 2, 'Y', '2022-12-20 22:37:51', 1, '0000-00-00 00:00:00', 0);

-- Dumping structure for table bapenda.m_users
CREATE TABLE IF NOT EXISTS `m_users` (
  `id_user` int(11) NOT NULL DEFAULT 0,
  `id_group` int(11) NOT NULL,
  `id_extension` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `ages` int(11) NOT NULL,
  `last_login` datetime NOT NULL,
  `last_logout` datetime NOT NULL,
  `created_datetime` datetime NOT NULL,
  `user_created` int(11) NOT NULL,
  `update_datetime` datetime NOT NULL,
  `user_updated` int(11) NOT NULL,
  `parent_user` int(11) DEFAULT NULL,
  `active` enum('Y','N') DEFAULT 'Y',
  `active_login` enum('Y','N') DEFAULT 'N',
  PRIMARY KEY (`id_user`),
  KEY `id_group` (`id_group`),
  KEY `id_extension` (`id_extension`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table bapenda.m_users: ~2 rows (approximately)
INSERT IGNORE INTO `m_users` (`id_user`, `id_group`, `id_extension`, `email`, `password`, `first_name`, `last_name`, `photo`, `ages`, `last_login`, `last_logout`, `created_datetime`, `user_created`, `update_datetime`, `user_updated`, `parent_user`, `active`, `active_login`) VALUES
	(1, 4, 2, 'admin-test@m.com', '$2a$10$gUkrLx./Fno7YccWe93WKewGTt0vN4/gP5Wz/R8dlMKzH.pRIiP7m', 'test', 'test', 'Logo-Resmi-Bapenda-Kota-Bogor.png', 21, '2022-12-29 21:36:57', '2022-12-29 21:54:36', '2022-12-23 23:54:53', 1, '0000-00-00 00:00:00', 0, 8, 'Y', 'N'),
	(8, 3, 1, 'admin@m.com', '$2a$10$PxrZP0OrugMnCEA70LHOl.AyugABDyuqk6rnBNW0bwfAjCSoMQ7Ce', 'test', 'test', 'Logo-Resmi-Bapenda-Kota-Bogor.png', 21, '2022-12-29 21:37:09', '2022-12-29 21:54:32', '2022-12-22 22:17:50', 1, '0000-00-00 00:00:00', 0, 0, 'Y', 'N');

-- Dumping structure for table bapenda.t_counter
CREATE TABLE IF NOT EXISTS `t_counter` (
  `id_counter` int(11) NOT NULL AUTO_INCREMENT,
  `call_type` varchar(50) NOT NULL DEFAULT '0',
  `call_counter` int(11) NOT NULL DEFAULT 0,
  `update_date` date DEFAULT NULL,
  PRIMARY KEY (`id_counter`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table bapenda.t_counter: ~2 rows (approximately)
INSERT IGNORE INTO `t_counter` (`id_counter`, `call_type`, `call_counter`, `update_date`) VALUES
	(1, 'incoming', 4, '2022-12-29'),
	(2, 'receive', 8, '2022-12-28'),
	(3, 'abandon', 2, '2022-12-28');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
