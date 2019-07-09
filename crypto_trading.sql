-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2019 at 03:09 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crypto_trading`
--
CREATE DATABASE IF NOT EXISTS `crypto_trading` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `crypto_trading`;

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `country_id` int(3) NOT NULL,
  `country_name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`country_id`, `country_name`) VALUES
(0, 'Australia'),
(1, 'Canada'),
(2, 'France'),
(3, 'Greenland'),
(4, 'Iceland'),
(5, 'Mexico'),
(6, 'Philippines'),
(7, 'Russia'),
(8, 'South Africa'),
(9, 'United States of America'),
(10, 'Zimbabwe');

-- --------------------------------------------------------

--
-- Table structure for table `currency`
--

CREATE TABLE `currency` (
  `ticker` char(3) NOT NULL,
  `currency_name` varchar(25) NOT NULL,
  `currency_type` enum('fiat','crypto') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `currency`
--

INSERT INTO `currency` (`ticker`, `currency_name`, `currency_type`) VALUES
('ADA', 'Cardano', 'crypto'),
('BCH', 'Bitcoin Cash', 'crypto'),
('BNB', 'Binance', 'crypto'),
('BTC', 'Bitcoin', 'crypto'),
('CAD', 'Canadian Dollar', 'fiat'),
('EOS', 'EOS', 'crypto'),
('ETC', 'Ethereum', 'crypto'),
('LTC', 'Litecoin', 'crypto'),
('TRX', 'Tron', 'crypto'),
('USD', 'US Dollar', 'fiat'),
('XLM', 'Stellar', 'crypto'),
('XRP', 'Ripple', 'crypto');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `user_id` int(11) NOT NULL,
  `fname` varchar(30) NOT NULL,
  `lname` varchar(30) DEFAULT NULL,
  `country_id` int(3) NOT NULL,
  `currency_code` char(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`user_id`, `fname`, `lname`, `country_id`, `currency_code`) VALUES
(67, 'rakan', 'rookan', 1, 'CAD'),
(70, 'momo', 'momo', 0, 'CAD'),
(71, 'Jonnie ', 'Quezada', 1, 'CAD'),
(72, 'Michel', 'Pacquette', 1, 'CAD'),
(73, 'I am Groot', 'I am Groot', 6, 'CAD'),
(74, 'Dawson', 'Vanier', 1, 'CAD'),
(76, 'Steve', 'Jobs', 9, 'CAD'),
(77, 'Stephen', 'Hawking', 9, 'CAD'),
(78, 'Warren', 'Buffet', 9, 'CAD'),
(79, 'Mark', 'Zuckerberg', 9, 'CAD'),
(80, 'FBI', 'America', 9, 'CAD'),
(81, 'David', 'Do', 1, 'CAD'),
(82, 'Jonnie', 'Quezada', 6, 'CAD'),
(83, 'John', 'Joe', 9, 'CAD'),
(84, 'Jane', 'Doe', 9, 'CAD'),
(85, 'Bob', 'TheBuilder', 9, 'CAD');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `transaction_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pay_wallet_id` int(11) NOT NULL,
  `buy_wallet_id` int(11) NOT NULL,
  `pay_amount` decimal(8,2) NOT NULL,
  `buy_amount` decimal(14,6) NOT NULL,
  `fee` decimal(8,2) NOT NULL,
  `total` decimal(8,2) NOT NULL,
  `date` datetime NOT NULL,
  `type` enum('buy','sell','deposit','withdraw') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`transaction_id`, `user_id`, `pay_wallet_id`, `buy_wallet_id`, `pay_amount`, `buy_amount`, `fee`, `total`, `date`, `type`) VALUES
(3, 67, 24, 20, '50.00', '483.560000', '2.50', '52.50', '2019-04-20 16:11:42', 'buy'),
(4, 67, 24, 23, '500.00', '0.070000', '25.00', '525.00', '2019-04-20 16:17:00', 'buy'),
(5, 67, 24, 23, '200.00', '0.030000', '10.00', '210.00', '2019-04-20 16:17:49', 'buy'),
(6, 67, 24, 23, '200.00', '0.030000', '10.00', '190.00', '2019-04-20 16:34:21', 'sell'),
(7, 67, 24, 23, '200.00', '0.030000', '10.00', '210.00', '2019-04-20 17:35:51', 'buy'),
(8, 67, 24, 23, '200.00', '0.030000', '10.00', '210.00', '2019-04-20 17:38:30', 'buy'),
(9, 67, 24, 23, '200.00', '0.030000', '10.00', '210.00', '2019-04-20 17:39:43', 'buy'),
(10, 67, 24, 23, '200.00', '0.030000', '10.00', '210.00', '2019-04-20 17:41:09', 'buy'),
(11, 67, 24, 23, '200.00', '0.030000', '10.00', '210.00', '2019-04-20 17:43:05', 'buy'),
(12, 67, 24, 23, '200.00', '0.030000', '10.00', '210.00', '2019-04-20 17:44:00', 'buy'),
(13, 67, 24, 23, '200.00', '0.030000', '10.00', '210.00', '2019-04-20 17:48:12', 'buy'),
(14, 67, 24, 23, '200.00', '0.030000', '10.00', '210.00', '2019-04-20 17:48:14', 'buy'),
(15, 67, 24, 23, '200.00', '0.030000', '10.00', '210.00', '2019-04-20 17:48:39', 'buy'),
(16, 67, 24, 23, '200.00', '0.027852', '10.00', '210.00', '2019-04-20 17:52:59', 'buy'),
(17, 67, 24, 23, '200.00', '0.027852', '10.00', '210.00', '2019-04-20 17:53:55', 'buy'),
(18, 67, 24, 23, '200.00', '0.027852', '10.00', '210.00', '2019-04-20 17:54:52', 'buy'),
(19, 67, 24, 23, '100.00', '0.013918', '5.00', '95.00', '2019-04-20 18:07:41', 'sell'),
(20, 67, 24, 23, '7.19', '0.001000', '0.36', '0.00', '2019-04-20 18:38:45', 'sell'),
(21, 67, 24, 23, '7.21', '0.001000', '0.36', '7.21', '2019-04-20 18:40:08', 'sell'),
(22, 67, 24, 23, '7.21', '0.001000', '0.36', '6.85', '2019-04-20 18:40:52', 'sell'),
(23, 67, 24, 23, '7.21', '0.001000', '0.36', '6.85', '2019-04-20 18:41:32', 'sell'),
(24, 67, 24, 23, '100.00', '0.013875', '5.00', '105.00', '2019-04-20 18:41:55', 'buy'),
(25, 67, 24, 23, '14.30', '0.002000', '0.71', '13.59', '2019-04-20 18:42:45', 'sell'),
(26, 67, 24, 23, '14.41', '0.002000', '0.72', '13.69', '2019-04-20 18:43:04', 'sell'),
(27, 67, 24, 23, '14.41', '0.002000', '0.72', '13.69', '2019-04-20 18:43:28', 'sell'),
(28, 67, 24, 23, '36.03', '0.005000', '1.80', '34.23', '2019-04-20 19:09:37', 'sell'),
(29, 67, 24, 23, '36.03', '0.005000', '1.80', '34.23', '2019-04-20 19:09:58', 'sell'),
(30, 67, 24, 20, '200.00', '1906.577693', '10.00', '210.00', '2019-04-20 21:38:25', 'buy'),
(31, 67, 24, 20, '52.45', '500.000000', '2.62', '49.83', '2019-04-20 21:40:37', 'sell'),
(32, 67, 24, 28, '300.00', '8544.574195', '15.00', '315.00', '2019-04-20 22:15:26', 'buy'),
(33, 67, 24, 22, '300.00', '9.407338', '15.00', '315.00', '2019-04-23 08:44:09', 'buy'),
(35, 70, 51, 50, '100.00', '0.013349', '5.00', '105.00', '2019-04-25 13:53:29', 'buy'),
(36, 70, 51, 50, '99.99', '0.013349', '5.00', '94.99', '2019-04-25 13:54:24', 'sell'),
(37, 67, 24, 23, '95.00', '0.013707', '4.75', '99.75', '2019-04-29 15:53:55', 'buy'),
(38, 67, 23, 24, '69.31', '0.010000', '3.47', '65.84', '2019-04-29 15:54:21', 'sell'),
(39, 67, 23, 24, '456124.50', '65.000000', '22806.23', '433318.27', '2019-04-30 12:52:28', 'sell'),
(40, 67, 23, 24, '999999.99', '433000.000000', '999999.99', '999999.99', '2019-04-30 14:06:00', 'sell'),
(41, 67, 23, 24, '999999.99', '350.000000', '122829.00', '999999.99', '2019-04-30 14:06:26', 'sell'),
(42, 67, 23, 24, '231620.40', '33.000000', '11581.02', '220039.38', '2019-04-30 14:07:34', 'sell'),
(44, 71, 61, 60, '50.00', '0.006954', '2.50', '52.50', '2019-05-02 08:46:53', 'buy'),
(45, 71, 61, 63, '75.00', '9.803922', '3.75', '78.75', '2019-05-02 08:47:54', 'buy'),
(46, 71, 61, 60, '100.00', '0.013908', '5.00', '105.00', '2019-05-02 08:48:00', 'buy'),
(48, 71, 61, 60, '98.00', '0.013611', '4.90', '102.90', '2019-05-02 08:52:22', 'buy'),
(49, 71, 61, 60, '0.08', '0.000011', '0.00', '0.08', '2019-05-02 08:52:55', 'buy'),
(51, 73, 81, 80, '400.00', '0.055348', '20.00', '420.00', '2019-05-02 10:43:13', 'buy'),
(52, 73, 81, 79, '76.00', '2.413465', '3.80', '79.80', '2019-05-02 10:44:00', 'buy'),
(53, 73, 80, 81, '0.05', '361.350000', '18.07', '343.28', '2019-05-02 10:44:32', 'sell'),
(55, 74, 91, 90, '400.00', '0.055317', '20.00', '420.00', '2019-05-02 11:03:00', 'buy'),
(56, 74, 91, 87, '76.00', '840.150343', '3.80', '79.80', '2019-05-02 11:03:34', 'buy'),
(57, 74, 87, 91, '700.00', '63.273000', '3.16', '60.11', '2019-05-02 11:03:53', 'sell'),
(58, 74, 90, 91, '0.05', '390.474000', '19.52', '370.95', '2019-05-02 11:04:07', 'sell');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(73) NOT NULL,
  `two_fa` varchar(300) NOT NULL COMMENT '0=no2fa, 1=yes2fa',
  `role` enum('user','admin') NOT NULL COMMENT 'values=user, admin',
  `status` enum('active','frozen') NOT NULL COMMENT 'values=active, frozen'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `password`, `two_fa`, `role`, `status`) VALUES
(67, 'rakan', '$2y$10$czFg1jF3kMnIj.F.DzV8Q.L7HPjJPrasPmHPTA9xJT5Qm7unD2Q3a', '4FUFFD5BB7MHPXQG', 'admin', 'active'),
(70, 'momo', '$2y$10$uByrVlKQdE0rPBeff.54muTr1MmaSPoMe1ucqWZGGpsH3YnnJF216', '3E4R6PP53WF23D22', 'user', 'frozen'),
(71, 'jkleinne', '$2y$10$h37HuQ5W6CjMRyGsPdmPX.MecyJOjOEc8ppt79WNsTC9fnf2ZaavC', '', 'user', 'frozen'),
(72, 'michelpacquette@gmail.com', '$2y$10$4hrDn37wdYbOKg2Y/sdFguwPj9MtoUz0tVl3GXrWtoBW09hVhby/i', '', 'user', 'active'),
(73, 'jonniequezada@gmail.com', '$2y$10$sjhoIYC7HW4rUldeP3JCYunTKKz22CcUQESHg20wgDLwh6yr1DHAW', '', 'user', 'active'),
(74, 'vanier@college.ca', '$2y$10$E5usNIVEETk1dJZTa1gZ1eD3Hz7YHzWG/m.KdliqMhDcXtetT1C0e', '', 'user', 'active'),
(76, 'steve.jobs@freeze.com', '$2y$10$4hrDn37wdYbOKg2Y/sdFguwPj9MtoUz0tVl3GXrWtoBW09hVhby/i', '', 'user', 'active'),
(77, 'stephen.hawking@freeze.com', '$2y$10$4hrDn37wdYbOKg2Y/sdFguwPj9MtoUz0tVl3GXrWtoBW09hVhby/i', '', 'user', 'active'),
(78, 'warren.buffet@active.com', '$2y$10$4hrDn37wdYbOKg2Y/sdFguwPj9MtoUz0tVl3GXrWtoBW09hVhby/i', '', 'user', 'active'),
(79, 'mark.zuckerberg@active.com', '$2y$10$4hrDn37wdYbOKg2Y/sdFguwPj9MtoUz0tVl3GXrWtoBW09hVhby/i', '', 'user', 'active'),
(80, 'fbi.america@active.com', '$2y$10$4hrDn37wdYbOKg2Y/sdFguwPj9MtoUz0tVl3GXrWtoBW09hVhby/i', '', 'user', 'active'),
(81, 'david.do@active.com', '$2y$10$4hrDn37wdYbOKg2Y/sdFguwPj9MtoUz0tVl3GXrWtoBW09hVhby/i', '', 'user', 'active'),
(82, 'jonnie.quezada@active.com', '$2y$10$4hrDn37wdYbOKg2Y/sdFguwPj9MtoUz0tVl3GXrWtoBW09hVhby/i', '', 'user', 'active'),
(83, 'john.doe@active.com', '$2y$10$4hrDn37wdYbOKg2Y/sdFguwPj9MtoUz0tVl3GXrWtoBW09hVhby/i', '', 'user', 'active'),
(84, 'jane.doe@active.com', '$2y$10$4hrDn37wdYbOKg2Y/sdFguwPj9MtoUz0tVl3GXrWtoBW09hVhby/i', '', 'user', 'active'),
(85, 'bob.thebuilder@active.com', '$2y$10$4hrDn37wdYbOKg2Y/sdFguwPj9MtoUz0tVl3GXrWtoBW09hVhby/i', '', 'user', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

CREATE TABLE `wallet` (
  `wallet_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ticker` char(3) NOT NULL,
  `balance` decimal(20,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `wallet`
--

INSERT INTO `wallet` (`wallet_id`, `user_id`, `ticker`, `balance`) VALUES
(20, 67, 'ADA', '1406.577693'),
(21, 67, 'BCH', '0.000000'),
(22, 67, 'BNB', '9.407338'),
(23, 67, 'BTC', '1.127516'),
(24, 67, 'CAD', '100220039.380000'),
(25, 67, 'EOS', '0.000000'),
(26, 67, 'ETC', '0.000000'),
(27, 67, 'LTC', '0.000000'),
(28, 67, 'TRX', '8544.574195'),
(47, 70, 'ADA', '0.000000'),
(48, 70, 'BCH', '0.000000'),
(49, 70, 'BNB', '0.000000'),
(50, 70, 'BTC', '0.000000'),
(51, 70, 'CAD', '200000.000000'),
(52, 70, 'EOS', '0.000000'),
(53, 70, 'ETC', '0.000000'),
(54, 70, 'LTC', '0.000000'),
(55, 70, 'TRX', '0.000000'),
(56, 70, 'XLM', '0.000000'),
(57, 71, 'ADA', '0.000000'),
(58, 71, 'BCH', '0.000000'),
(59, 71, 'BNB', '0.000000'),
(60, 71, 'BTC', '0.000000'),
(61, 71, 'CAD', '100.000000'),
(62, 71, 'EOS', '0.000000'),
(63, 71, 'ETC', '0.000000'),
(64, 71, 'LTC', '0.000000'),
(65, 71, 'TRX', '0.000000'),
(66, 71, 'XLM', '0.000000'),
(67, 72, 'ADA', '0.000000'),
(68, 72, 'BCH', '0.000000'),
(69, 72, 'BNB', '0.000000'),
(70, 72, 'BTC', '0.000000'),
(71, 72, 'CAD', '200000.000000'),
(72, 72, 'EOS', '0.000000'),
(73, 72, 'ETC', '0.000000'),
(74, 72, 'LTC', '0.000000'),
(75, 72, 'TRX', '0.000000'),
(76, 72, 'XLM', '0.000000'),
(77, 73, 'ADA', '100.000000'),
(78, 73, 'BCH', '100.000000'),
(79, 73, 'BNB', '100.000000'),
(80, 73, 'BTC', '100.000000'),
(81, 73, 'CAD', '100.000000'),
(82, 73, 'EOS', '100.000000'),
(83, 73, 'ETC', '100.000000'),
(84, 73, 'LTC', '100.000000'),
(85, 73, 'TRX', '100.000000'),
(86, 73, 'XLM', '100.000000'),
(87, 74, 'ADA', '0.000000'),
(88, 74, 'BCH', '0.000000'),
(89, 74, 'BNB', '0.000000'),
(90, 74, 'BTC', '0.000000'),
(91, 74, 'CAD', '600000.000000'),
(92, 74, 'EOS', '0.000000'),
(93, 74, 'ETC', '0.000000'),
(94, 74, 'LTC', '0.000000'),
(95, 74, 'TRX', '0.000000'),
(96, 74, 'XLM', '0.000000'),
(97, 76, 'ADA', '0.000000'),
(98, 76, 'BCH', '0.000000'),
(99, 76, 'BNB', '0.000000'),
(100, 76, 'BTC', '0.000000'),
(101, 76, 'CAD', '10200000000.000000'),
(102, 76, 'EOS', '0.000000'),
(103, 76, 'ETC', '0.000000'),
(104, 76, 'LTC', '0.000000'),
(105, 76, 'TRX', '0.000000'),
(106, 76, 'XLM', '0.000000'),
(107, 76, 'XRP', '0.000000'),
(108, 77, 'ADA', '0.000000'),
(109, 77, 'BCH', '0.000000'),
(110, 77, 'BNB', '0.000000'),
(111, 77, 'BTC', '0.000000'),
(112, 77, 'CAD', '7000000.000000'),
(113, 77, 'EOS', '0.000000'),
(114, 77, 'ETC', '0.000000'),
(115, 77, 'LTC', '0.000000'),
(116, 77, 'TRX', '0.000000'),
(117, 77, 'XLM', '0.000000'),
(118, 77, 'XRP', '0.000000'),
(119, 78, 'ADA', '0.000000'),
(120, 78, 'BCH', '0.000000'),
(121, 78, 'BNB', '0.000000'),
(122, 78, 'BTC', '0.000000'),
(123, 78, 'CAD', '89900000000.000000'),
(124, 78, 'EOS', '0.000000'),
(125, 78, 'ETC', '0.000000'),
(126, 78, 'LTC', '0.000000'),
(127, 78, 'TRX', '0.000000'),
(128, 78, 'XLM', '0.000000'),
(129, 78, 'XRP', '0.000000'),
(130, 79, 'ADA', '0.000000'),
(131, 79, 'BCH', '0.000000'),
(132, 79, 'BNB', '0.000000'),
(133, 79, 'BTC', '0.000000'),
(134, 79, 'CAD', '72600000000.000000'),
(135, 79, 'EOS', '0.000000'),
(136, 79, 'ETC', '0.000000'),
(137, 79, 'LTC', '0.000000'),
(138, 79, 'TRX', '0.000000'),
(139, 79, 'XLM', '0.000000'),
(140, 79, 'XRP', '0.000000'),
(141, 80, 'ADA', '0.000000'),
(142, 80, 'BCH', '0.000000'),
(143, 80, 'BNB', '0.000000'),
(144, 80, 'BTC', '0.000000'),
(145, 80, 'CAD', '3000000.000000'),
(146, 80, 'EOS', '0.000000'),
(147, 80, 'ETC', '0.000000'),
(148, 80, 'LTC', '0.000000'),
(149, 80, 'TRX', '0.000000'),
(150, 80, 'XLM', '0.000000'),
(151, 80, 'XRP', '0.000000'),
(152, 81, 'ADA', '0.000000'),
(153, 81, 'BCH', '0.000000'),
(154, 81, 'BNB', '0.000000'),
(155, 81, 'BTC', '0.000000'),
(156, 81, 'CAD', '2500.000000'),
(157, 81, 'EOS', '0.000000'),
(158, 81, 'ETC', '0.000000'),
(159, 81, 'LTC', '0.000000'),
(160, 81, 'TRX', '0.000000'),
(161, 81, 'XLM', '0.000000'),
(162, 81, 'XRP', '0.000000'),
(163, 82, 'ADA', '0.000000'),
(164, 82, 'BCH', '0.000000'),
(165, 82, 'BNB', '0.000000'),
(166, 82, 'BTC', '0.000000'),
(167, 82, 'CAD', '2500.000000'),
(168, 82, 'EOS', '0.000000'),
(169, 82, 'ETC', '0.000000'),
(170, 82, 'LTC', '0.000000'),
(171, 82, 'TRX', '0.000000'),
(172, 82, 'XLM', '0.000000'),
(173, 82, 'XRP', '0.000000'),
(174, 83, 'ADA', '0.000000'),
(175, 83, 'BCH', '0.000000'),
(176, 83, 'BNB', '0.000000'),
(177, 83, 'BTC', '0.000000'),
(178, 83, 'CAD', '50.000000'),
(179, 83, 'EOS', '0.000000'),
(180, 83, 'ETC', '0.000000'),
(181, 83, 'LTC', '0.000000'),
(182, 83, 'TRX', '0.000000'),
(183, 83, 'XLM', '0.000000'),
(184, 83, 'XRP', '0.000000'),
(185, 84, 'ADA', '0.000000'),
(186, 84, 'BCH', '0.000000'),
(187, 84, 'BNB', '0.000000'),
(188, 84, 'BTC', '0.000000'),
(189, 84, 'CAD', '50.000000'),
(190, 84, 'EOS', '0.000000'),
(191, 84, 'ETC', '0.000000'),
(192, 84, 'LTC', '0.000000'),
(193, 84, 'TRX', '0.000000'),
(194, 84, 'XLM', '0.000000'),
(195, 84, 'XRP', '0.000000'),
(196, 85, 'ADA', '0.000000'),
(197, 85, 'BCH', '0.000000'),
(198, 85, 'BNB', '0.000000'),
(199, 85, 'BTC', '0.000000'),
(200, 85, 'CAD', '3000000.000000'),
(201, 85, 'EOS', '0.000000'),
(202, 85, 'ETC', '0.000000'),
(203, 85, 'LTC', '0.000000'),
(204, 85, 'TRX', '0.000000'),
(205, 85, 'XLM', '0.000000'),
(206, 85, 'XRP', '0.000000'),
(207, 67, 'XLM', '0.000000'),
(208, 67, 'XRP', '0.000000'),
(209, 70, 'XRP', '0.000000'),
(212, 72, 'XRP', '0.000000'),
(213, 71, 'XRP', '0.000000'),
(214, 73, 'XRP', '100.000000'),
(215, 74, 'XRP', '0.000000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`country_id`);

--
-- Indexes for table `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`ticker`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `country_id` (`country_id`),
  ADD KEY `currency_code` (`currency_code`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `balance_id` (`pay_wallet_id`),
  ADD KEY `transaction_buy_curr_id_fk` (`buy_wallet_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`wallet_id`),
  ADD KEY `balance_user_id_fk` (`user_id`),
  ADD KEY `balance_currency_code_fk` (`ticker`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `wallet`
--
ALTER TABLE `wallet`
  MODIFY `wallet_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=216;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*2019-07-09*/;
