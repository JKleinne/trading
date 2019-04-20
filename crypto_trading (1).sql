-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 17, 2019 at 09:17 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crypto_trading`
--
CREATE DATABASE IF NOT EXISTS `crypto_trading` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
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
  `currency_code` char(3) NOT NULL,
  `currency_name` varchar(25) NOT NULL,
  `currency_type` enum('fiat','crypto') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `currency`
--

INSERT INTO `currency` (`currency_code`, `currency_name`, `currency_type`) VALUES
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
(62, 'gg', 'gg', 0, 'CAD'),
(1, 'TEST', 'TEST', 0, 'CAD');

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
  `buy_amount` decimal(8,2) NOT NULL,
  `fee` decimal(8,2) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`transaction_id`, `user_id`, `pay_wallet_id`, `buy_wallet_id`, `pay_amount`, `buy_amount`, `fee`, `date`) VALUES
(1, 1, 5, 4, '999999.99', '1000.00', '50.00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(73) NOT NULL,
  `two_fa` tinyint(1) NOT NULL COMMENT '0=no2fa, 1=yes2fa',
  `role` enum('user','admin') NOT NULL COMMENT 'values=user, admin',
  `status` enum('active','frozen') NOT NULL COMMENT 'values=active, frozen'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `password`, `two_fa`, `role`, `status`) VALUES
(1, 'TEST', 'TEST', 0, 'user', 'active'),
(2, 'asd', 'asd', 0, '', ''),
(3, 'wqe', 'wqe', 0, '', ''),
(4, 'rty', 'rty', 0, '', ''),
(5, 'tyu', 'tyu', 0, '', ''),
(6, '666', '666', 0, '', ''),
(7, 'daviddo', 'asdf', 0, '', ''),
(9, 'bnm', 'bnm', 0, '', ''),
(11, 'zxc', 'zxc', 0, '', ''),
(51, 'vbn', 'vbn', 0, '', ''),
(56, '88', '88', 0, '', ''),
(57, '11', '11', 0, '', ''),
(58, 'stuff', 'qwe', 0, '', ''),
(59, 'uyt', 'uyt', 0, '', ''),
(60, 'dodavid', 'ewq', 0, '', ''),
(61, 'asdf', 'asdf', 0, '', ''),
(62, 'gg', '$2y$10$Z78hvlDD7PpdBWUMok8paOBv3IqvnJY135xe/szI3K/hhLtLkSnLm', 0, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

CREATE TABLE `wallet` (
  `wallet_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `currency_code` char(3) NOT NULL,
  `balance` decimal(14,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `wallet`
--

INSERT INTO `wallet` (`wallet_id`, `user_id`, `currency_code`, `balance`) VALUES
(1, 1, 'ADA', '500.00'),
(2, 1, 'BCH', '500.00'),
(3, 1, 'BNB', '500.00'),
(4, 1, 'BTC', '500.00'),
(5, 1, 'CAD', '1243.00'),
(6, 1, 'EOS', '1243.00'),
(7, 1, 'ETC', '564.00'),
(8, 1, 'LTC', '43.00'),
(9, 1, 'TRX', '3245.00');

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
  ADD PRIMARY KEY (`currency_code`);

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
  ADD KEY `balance_currency_code_fk` (`currency_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;
--
-- AUTO_INCREMENT for table `wallet`
--
ALTER TABLE `wallet`
  MODIFY `wallet_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `profile_country_id_fk` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`),
  ADD CONSTRAINT `profile_currency_code_fk` FOREIGN KEY (`currency_code`) REFERENCES `currency` (`currency_code`),
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
  ADD CONSTRAINT `wallet_currency_code_fk` FOREIGN KEY (`currency_code`) REFERENCES `currency` (`currency_code`),
  ADD CONSTRAINT `wallet_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
