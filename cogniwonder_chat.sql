-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 19, 2020 at 10:29 PM
-- Server version: 5.7.27-log-cll-lve
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cogniwonder_chat`
--

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `from_user_id` varchar(45) DEFAULT NULL,
  `to_user_id` varchar(45) DEFAULT NULL,
  `message` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `from_user_id`, `to_user_id`, `message`) VALUES
(1, '1', '2', 'hi'),
(2, '2', '1', 'hi'),
(3, '1', '2', '\nthis i si a chat message'),
(4, '2', '1', '\nyes'),
(5, '4', '3', 'sdasdasd'),
(6, '4', '3', 'kkkkkkk'),
(7, '3', '4', 'this is a test'),
(8, '3', '4', '\nh'),
(9, '3', '4', '\nh'),
(10, '3', '4', '\nh'),
(11, '3', '4', '\nh'),
(12, '3', '4', '\nh'),
(13, '3', '4', '\nh'),
(14, '3', '4', '\nh'),
(15, '3', '4', '\n'),
(16, '3', '4', '\nh'),
(17, '3', '4', '\n'),
(18, '3', '4', '\n'),
(19, '3', '4', '\n'),
(20, '3', '4', '\n'),
(21, '3', '4', '\n'),
(22, '3', '4', '\n'),
(23, '3', '4', '\n'),
(24, '3', '4', '\n'),
(25, '3', '4', '\n');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(20) NOT NULL,
  `online` enum('N','Y') NOT NULL,
  `socketid` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `online`, `socketid`) VALUES
(1, 'vishnu', 'prasasd', 'N', ''),
(2, 'pooja', 'test', 'N', ''),
(3, 'raj', '1234', 'N', ''),
(4, 'vishnu', 'vish', 'N', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
