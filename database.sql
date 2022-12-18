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

-- Dumping data for table bapenda.m_black_list: ~0 rows (approximately)

-- Dumping data for table bapenda.m_extension: ~0 rows (approximately)

-- Dumping data for table bapenda.m_group: ~3 rows (approximately)
INSERT IGNORE INTO `m_group` (`id_group`, `group_name`, `group_desc`, `active`, `created_datetime`, `user_created`, `update_datetime`, `user_updated`) VALUES
	(2, 'test', 'test', 'N', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0),
	(3, 'test12', 'test12', 'Y', '2022-12-18 01:48:06', 0, '2022-12-18 11:19:33', 1),
	(4, 'test3', 'test', 'Y', '2022-12-18 11:24:32', 1, '0000-00-00 00:00:00', 0);

-- Dumping data for table bapenda.m_group menu: ~0 rows (approximately)

-- Dumping data for table bapenda.m_menu: ~11 rows (approximately)
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
	(12, 'Dashboard Agent', 'Dashboard Agent', '/dashboard-agent', 0, 'fa-solid fa-gauge', 1, 'Y', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0);

-- Dumping data for table bapenda.m_phone_book: ~0 rows (approximately)

-- Dumping data for table bapenda.m_sitemap: ~0 rows (approximately)

-- Dumping data for table bapenda.m_users: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
