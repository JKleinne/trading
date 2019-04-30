-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 25, 2019 at 09:45 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 5.6.40

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
(59, 'uyt', 'uyt', 0, 'CAD'),
(60, 'do', 'david', 6, 'USD'),
(61, 'asdf', 'asdf', 0, 'CAD'),
(62, 'jkl', 'jkl', 1, 'CAD'),
(1, 'TEST', 'TEST', 0, 'CAD'),
(63, 'yikes', 'yikes', 0, 'CAD'),
(64, 'pep', 'pep', 0, 'CAD'),
(65, 'gg', 'gg', 0, 'CAD'),
(66, 'gg', 'gg', 0, 'CAD'),
(67, 'rakan', 'rookan', 1, 'CAD'),
(68, 'dododo', 'dododo', 0, 'CAD'),
(69, 'stuff', 'stuff', 0, 'CAD'),
(70, 'momo', 'momo', 0, 'CAD');

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
(1, 1, 5, 4, '999999.99', '1000.000000', '50.00', '0.00', '0000-00-00 00:00:00', 'buy'),
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
(36, 70, 51, 50, '99.99', '0.013349', '5.00', '94.99', '2019-04-25 13:54:24', 'sell');

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
(1, 'TEST', 'TEST', '0', 'user', 'active'),
(2, 'asd', 'asd', '0', '', ''),
(3, 'wqe', 'wqe', '0', '', ''),
(4, 'rty', 'rty', '0', '', ''),
(5, 'tyu', 'tyu', '0', '', ''),
(6, '666', '666', '0', '', ''),
(7, 'daviddo', 'asdf', '0', '', ''),
(9, 'bnm', 'bnm', '0', '', ''),
(11, 'zxc', 'zxc', '0', '', ''),
(51, 'vbn', 'vbn', '0', '', ''),
(56, '88', '88', '0', '', ''),
(57, '11', '11', '0', '', ''),
(58, 'stuff', 'qwe', '0', '', ''),
(59, 'uyt', 'uyt', '0', '', ''),
(60, 'dodavid', 'ewq', '0', '', ''),
(61, 'asdf', 'asdf', '0', '', ''),
(62, 'gg', '$2y$10$Z78hvlDD7PpdBWUMok8paOBv3IqvnJY135xe/szI3K/hhLtLkSnLm', '0', '', ''),
(63, 'yikes', '$2y$10$Qx3Li1cBzzC5DQvdUOBj/ue.kfa902dWl9R8bmIah4HO.xTzyb5HC', '0', '', ''),
(64, 'pep', '$2y$10$R/CLN3m1gDqbbyCKkVU8U.BcxpRmTIpZEnXhQi.zGvWBjzvN3cxce', '0', '', ''),
(65, 'ijeoawlkln', '$2y$10$A/B2k.bMjvzbEL7sF/bT9OcYTZZmgwFcdits/gNmBC9DLv/k3odBS', '0', '', ''),
(66, 'eifjoqur', '$2y$10$3GW3qLwxJD2RH8NxqZKAzOeB6HinVS2kN/ZPL5/SZA5vH3ojCOg9a', '0', '', ''),
(67, 'rakan', '$2y$10$czFg1jF3kMnIj.F.DzV8Q.L7HPjJPrasPmHPTA9xJT5Qm7unD2Q3a', '4FUFFD5BB7MHPXQG', 'admin', 'active'),
(68, 'dododo', '$2y$10$m.Ml5VtplCD/Y.x3fulQB.k12o6.RfBy6aBCwITUR6veCOCnLFTSO', '', '', ''),
(69, 'stuffystuff', '$2y$10$NQnp9OqaFEgA2wy0utb5e.E04W/jgVqSbvaWxVELaX70/7BGnR4aG', '0', '', ''),
(70, 'momo', '$2y$10$uByrVlKQdE0rPBeff.54muTr1MmaSPoMe1ucqWZGGpsH3YnnJF216', '3E4R6PP53WF23D22', 'user', 'frozen');

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

CREATE TABLE `wallet` (
  `wallet_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ticker` char(3) NOT NULL,
  `balance` decimal(14,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `wallet`
--

INSERT INTO `wallet` (`wallet_id`, `user_id`, `ticker`, `balance`) VALUES
(1, 1, 'ADA', '500.000000'),
(2, 1, 'BCH', '500.000000'),
(3, 1, 'BNB', '500.000000'),
(4, 1, 'BTC', '500.000000'),
(5, 1, 'CAD', '1243.000000'),
(6, 1, 'EOS', '1243.000000'),
(7, 1, 'ETC', '564.000000'),
(8, 1, 'LTC', '43.000000'),
(9, 1, 'TRX', '3245.000000'),
(11, 66, 'ADA', '0.000000'),
(12, 66, 'BCH', '0.000000'),
(13, 66, 'BNB', '0.000000'),
(14, 66, 'BTC', '0.000000'),
(15, 66, 'CAD', '0.000000'),
(16, 66, 'EOS', '0.000000'),
(17, 66, 'ETC', '0.000000'),
(18, 66, 'LTC', '0.000000'),
(19, 66, 'TRX', '0.000000'),
(20, 67, 'ADA', '1406.577693'),
(21, 67, 'BCH', '0.000000'),
(22, 67, 'BNB', '9.407338'),
(23, 67, 'BTC', '0.007809'),
(24, 67, 'CAD', '100.004200'),
(25, 67, 'EOS', '0.000000'),
(26, 67, 'ETC', '0.000000'),
(27, 67, 'LTC', '0.000000'),
(28, 67, 'TRX', '8544.574195'),
(29, 68, 'ADA', '0.000000'),
(30, 68, 'BCH', '0.000000'),
(31, 68, 'BNB', '0.000000'),
(32, 68, 'BTC', '0.000000'),
(33, 68, 'CAD', '0.000000'),
(34, 68, 'EOS', '0.000000'),
(35, 68, 'ETC', '0.000000'),
(36, 68, 'LTC', '0.000000'),
(37, 68, 'TRX', '0.000000'),
(38, 69, 'ADA', '0.000000'),
(39, 69, 'BCH', '0.000000'),
(40, 69, 'BNB', '0.000000'),
(41, 69, 'BTC', '0.000000'),
(42, 69, 'CAD', '0.000000'),
(43, 69, 'EOS', '0.000000'),
(44, 69, 'ETC', '0.000000'),
(45, 69, 'LTC', '0.000000'),
(46, 69, 'TRX', '0.000000'),
(47, 70, 'ADA', '0.000000'),
(48, 70, 'BCH', '0.000000'),
(49, 70, 'BNB', '0.000000'),
(50, 70, 'BTC', '0.000000'),
(51, 70, 'CAD', '89.985345'),
(52, 70, 'EOS', '0.000000'),
(53, 70, 'ETC', '0.000000'),
(54, 70, 'LTC', '0.000000'),
(55, 70, 'TRX', '0.000000'),
(56, 70, 'XLM', '0.000000');

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
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `wallet`
--
ALTER TABLE `wallet`
  MODIFY `wallet_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `profile_country_id_fk` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`),
  ADD CONSTRAINT `profile_currency_code_fk` FOREIGN KEY (`currency_code`) REFERENCES `currency` (`ticker`),
  ADD CONSTRAINT `profile_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_buy_wallet_id_fk` FOREIGN KEY (`buy_wallet_id`) REFERENCES `wallet` (`wallet_id`),
  ADD CONSTRAINT `transaction_pay_wallet_id_fk` FOREIGN KEY (`pay_wallet_id`) REFERENCES `wallet` (`wallet_id`),
  ADD CONSTRAINT `transaction_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `wallet`
--
ALTER TABLE `wallet`
  ADD CONSTRAINT `wallet_currency_code_fk` FOREIGN KEY (`ticker`) REFERENCES `currency` (`ticker`),
  ADD CONSTRAINT `wallet_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
