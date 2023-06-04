-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 16, 2022 at 03:30 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vetrine`
--

-- --------------------------------------------------------

--
-- Table structure for table `device_codes`
--

CREATE TABLE `device_codes` (
  `serial_id` char(36) NOT NULL,
  `used` tinyint(1) NOT NULL COMMENT '0=not_used, 1=used'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `project_name` varchar(32) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0=not_ready, 1=building, 2=ready',
  `encoded_path` varchar(128) DEFAULT NULL COMMENT 'path of final encoded file',
  `preview_path` varchar(128) DEFAULT NULL COMMENT 'path of video preview',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `project_templates`
--

CREATE TABLE `project_templates` (
  `id` char(36) NOT NULL,
  `project_id` char(36) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `speed` enum('SLOW','NORMAL','FAST') NOT NULL DEFAULT 'NORMAL',
  `logo_image` char(36) DEFAULT NULL,
  `call_to_action_image` char(36) DEFAULT NULL,
  `data` text NOT NULL DEFAULT '[]',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `temp_value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `email` varchar(128) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0=disabled, 1=enabled',
  `company_name` varchar(64) DEFAULT NULL,
  `contact_name` varchar(32) DEFAULT NULL,
  `telephone` varchar(24) DEFAULT NULL,
  `device_serial_id` char(36) DEFAULT NULL,
  `registration_token` char(200) DEFAULT NULL,
  `forgot_password_token` char(36) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `device_codes`
--
ALTER TABLE `device_codes`
  ADD PRIMARY KEY (`serial_id`),
  ADD KEY `used` (`used`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `project_templates`
--
ALTER TABLE `project_templates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `start_time` (`start_time`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role` (`role`),
  ADD KEY `status` (`status`),
  ADD KEY `registration_token` (`registration_token`),
  ADD KEY `forgot_password_token` (`forgot_password_token`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
