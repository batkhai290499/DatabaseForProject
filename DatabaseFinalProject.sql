-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 30, 2020 lúc 11:35 AM
-- Phiên bản máy phục vụ: 10.4.11-MariaDB
-- Phiên bản PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `project`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id_account` int(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `age` int(15) NOT NULL,
  `address` varchar(1000) NOT NULL,
  `phone` int(20) NOT NULL,
  `id_department` int(100) NOT NULL,
  `id_salary` int(100) NOT NULL,
  `id_shift` int(100) NOT NULL,
  `id_position` int(100) NOT NULL,
  `id_role` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id_account`, `username`, `password`, `name`, `age`, `address`, `phone`, `id_department`, `id_salary`, `id_shift`, `id_position`, `id_role`) VALUES
(1, 'Admin', '123', 'adminName', 22, 'Hanoi', 964695956, 3, 3, 1, 3, 1),
(35, 'thuan', '123', 'Thuan', 12, 'Hanoi', 964695956, 2, 2, 5, 2, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `attendance`
--

CREATE TABLE `attendance` (
  `id_attendance` int(100) NOT NULL,
  `id_account` int(100) NOT NULL,
  `id_shift` int(100) NOT NULL,
  `date` date NOT NULL,
  `time_in` datetime NOT NULL,
  `time_out` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `attendance`
--

INSERT INTO `attendance` (`id_attendance`, `id_account`, `id_shift`, `date`, `time_in`, `time_out`) VALUES
(1, 35, 5, '2020-09-12', '2020-09-12 08:11:00', '2020-09-12 20:30:00'),
(2, 35, 5, '2020-09-19', '2020-09-13 09:36:00', '2020-09-13 17:37:04'),
(3, 35, 5, '2020-09-14', '2020-09-14 08:20:00', '2020-09-14 18:30:00'),
(4, 35, 5, '2020-09-15', '2020-09-15 07:50:00', '2020-09-15 17:40:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chat`
--

CREATE TABLE `chat` (
  `id_chat` int(100) NOT NULL,
  `chat_to` int(100) NOT NULL,
  `chat_from` int(100) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `chat`
--

INSERT INTO `chat` (`id_chat`, `chat_to`, `chat_from`, `content`, `time`) VALUES
(29, 35, 1, '123', '2020-07-23 16:04:27'),
(30, 1, 35, '123123', '2020-07-23 16:04:59'),
(31, 1, 35, 'test', '2020-11-27 19:11:09'),
(32, 1, 35, 'test', '2020-11-27 19:11:33'),
(33, 1, 35, '123123123123', '2020-11-27 19:14:24'),
(34, 35, 1, 'hello', '2020-11-27 20:50:34');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `department`
--

CREATE TABLE `department` (
  `id_department` int(100) NOT NULL,
  `department_name` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `department`
--

INSERT INTO `department` (`id_department`, `department_name`) VALUES
(1, 'Product'),
(2, 'Sales'),
(3, 'Director');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `mission`
--

CREATE TABLE `mission` (
  `id_mission` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `comment` varchar(100) NOT NULL,
  `id_account` int(100) NOT NULL,
  `name_file` varchar(100) NOT NULL,
  `start_time` date NOT NULL,
  `end_time` date NOT NULL,
  `status` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `mission`
--

INSERT INTO `mission` (`id_mission`, `title`, `comment`, `id_account`, `name_file`, `start_time`, `end_time`, `status`) VALUES
(31, '123', '123', 1, '3317-Lizzie.docx', '2020-09-11', '2020-09-24', 3),
(32, '123', '123123123123123', 35, '3317-Lizzie.docx', '2020-09-11', '2020-09-26', 3),
(33, '123', '123', 35, '211301.jpg', '2020-09-11', '2020-09-20', 3),
(34, 'Giới Thiệu', '123', 35, '211301.jpg', '2020-09-14', '2020-09-24', 1),
(35, 'Giới Thiệu', '12312312', 1, '211301.jpg', '2020-09-10', '2020-09-12', 2),
(36, 'Giới Thiệu', '123123', 35, 'dragon-ball-super-4k-high-resolution-wallpaper-preview.jpg', '2020-09-14', '2020-09-26', 2),
(37, 'Giới Thiệu', '12312312123', 35, '92459810_219544072639848_2477641159887814656_o.jpg', '2020-09-15', '2020-09-14', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_entry`
--

CREATE TABLE `order_entry` (
  `id_Order` int(100) NOT NULL,
  `name` varchar(1000) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `date_in` date NOT NULL,
  `id_supplier` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `position`
--

CREATE TABLE `position` (
  `id_position` int(100) NOT NULL,
  `position_name` varchar(1000) NOT NULL,
  `id_department` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `position`
--

INSERT INTO `position` (`id_position`, `position_name`, `id_department`) VALUES
(1, 'Manager Product', 1),
(2, 'Manager Sales', 2),
(3, 'Director', 3),
(13, 'Shipper', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `producer`
--

CREATE TABLE `producer` (
  `id_producer` int(100) NOT NULL,
  `name` varchar(1000) NOT NULL,
  `address` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id_product` int(100) NOT NULL,
  `name` varchar(1000) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `price_in` float NOT NULL,
  `price_out` float NOT NULL,
  `id_supplier` int(100) NOT NULL,
  `id_type` int(100) NOT NULL,
  `id_order` int(100) NOT NULL,
  `id_producer` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_type`
--

CREATE TABLE `product_type` (
  `id_type` int(100) NOT NULL,
  `name` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `resign`
--

CREATE TABLE `resign` (
  `id_resign` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` varchar(45) NOT NULL,
  `id_account` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `resign`
--

INSERT INTO `resign` (`id_resign`, `title`, `content`, `id_account`, `date`, `status`) VALUES
(6, 'Giới Thiệu', '12312', 35, '2020-10-15 00:00:00', 0),
(7, 'Giới Thiệu', '12312', 35, '2020-10-15 00:00:00', 1),
(8, 'Giới Thiệu', '123', 35, '2020-10-03 00:00:00', 1),
(10, 'test', 'like', 35, '2020-11-30 00:00:00', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role`
--

CREATE TABLE `role` (
  `id_role` int(100) NOT NULL,
  `role_name` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `role`
--

INSERT INTO `role` (`id_role`, `role_name`) VALUES
(1, 'Admin'),
(2, 'Manager Product'),
(3, 'Manager Employee'),
(4, 'Employee'),
(5, 'Shipper');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `salary`
--

CREATE TABLE `salary` (
  `id_salary` int(100) NOT NULL,
  `money` float NOT NULL,
  `id_position` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `salary`
--

INSERT INTO `salary` (`id_salary`, `money`, `id_position`) VALUES
(1, 10000, 1),
(2, 12000, 2),
(3, 20000, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shift`
--

CREATE TABLE `shift` (
  `id_shift` int(100) NOT NULL,
  `shift_name` varchar(1000) NOT NULL,
  `time_in` time NOT NULL,
  `time_out` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `shift`
--

INSERT INTO `shift` (`id_shift`, `shift_name`, `time_in`, `time_out`) VALUES
(1, 'Sang', '07:00:00', '12:00:00'),
(2, 'Chieu', '14:00:00', '18:00:00'),
(5, 'All day', '08:00:00', '18:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `status_mission`
--

CREATE TABLE `status_mission` (
  `id_status_mission` int(100) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `status_mission`
--

INSERT INTO `status_mission` (`id_status_mission`, `status`) VALUES
(1, 'In Process'),
(2, 'To Verify'),
(3, 'Done');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `supplier`
--

CREATE TABLE `supplier` (
  `id_supplier` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `address` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id_account`),
  ADD KEY `id_department` (`id_department`),
  ADD KEY `id_salary` (`id_salary`),
  ADD KEY `id_shift` (`id_shift`),
  ADD KEY `id_position` (`id_position`),
  ADD KEY `id_role` (`id_role`);

--
-- Chỉ mục cho bảng `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id_attendance`),
  ADD KEY `Id_account` (`id_account`),
  ADD KEY `Id_shift_atten` (`id_shift`);

--
-- Chỉ mục cho bảng `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id_chat`),
  ADD KEY `chat_to` (`chat_to`),
  ADD KEY `chat_from` (`chat_from`);

--
-- Chỉ mục cho bảng `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id_department`);

--
-- Chỉ mục cho bảng `mission`
--
ALTER TABLE `mission`
  ADD PRIMARY KEY (`id_mission`),
  ADD KEY `missionstatus` (`status`),
  ADD KEY `mission_id_account` (`id_account`);

--
-- Chỉ mục cho bảng `order_entry`
--
ALTER TABLE `order_entry`
  ADD PRIMARY KEY (`id_Order`),
  ADD KEY `order_id_supplier` (`id_supplier`);

--
-- Chỉ mục cho bảng `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`id_position`),
  ADD KEY `position_id_department` (`id_department`);

--
-- Chỉ mục cho bảng `producer`
--
ALTER TABLE `producer`
  ADD PRIMARY KEY (`id_producer`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `id_supplier` (`id_supplier`),
  ADD KEY `id_type` (`id_type`),
  ADD KEY `id_order` (`id_order`),
  ADD KEY `id_producer` (`id_producer`);

--
-- Chỉ mục cho bảng `product_type`
--
ALTER TABLE `product_type`
  ADD PRIMARY KEY (`id_type`);

--
-- Chỉ mục cho bảng `resign`
--
ALTER TABLE `resign`
  ADD PRIMARY KEY (`id_resign`),
  ADD KEY `resign_account` (`id_account`);

--
-- Chỉ mục cho bảng `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_role`);

--
-- Chỉ mục cho bảng `salary`
--
ALTER TABLE `salary`
  ADD PRIMARY KEY (`id_salary`),
  ADD KEY `salary_id_position` (`id_position`);

--
-- Chỉ mục cho bảng `shift`
--
ALTER TABLE `shift`
  ADD PRIMARY KEY (`id_shift`);

--
-- Chỉ mục cho bảng `status_mission`
--
ALTER TABLE `status_mission`
  ADD PRIMARY KEY (`id_status_mission`);

--
-- Chỉ mục cho bảng `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id_supplier`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `id_account` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT cho bảng `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id_attendance` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT cho bảng `chat`
--
ALTER TABLE `chat`
  MODIFY `id_chat` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT cho bảng `department`
--
ALTER TABLE `department`
  MODIFY `id_department` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `mission`
--
ALTER TABLE `mission`
  MODIFY `id_mission` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT cho bảng `order_entry`
--
ALTER TABLE `order_entry`
  MODIFY `id_Order` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `position`
--
ALTER TABLE `position`
  MODIFY `id_position` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `producer`
--
ALTER TABLE `producer`
  MODIFY `id_producer` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id_product` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `product_type`
--
ALTER TABLE `product_type`
  MODIFY `id_type` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `resign`
--
ALTER TABLE `resign`
  MODIFY `id_resign` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `role`
--
ALTER TABLE `role`
  MODIFY `id_role` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `salary`
--
ALTER TABLE `salary`
  MODIFY `id_salary` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `shift`
--
ALTER TABLE `shift`
  MODIFY `id_shift` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `status_mission`
--
ALTER TABLE `status_mission`
  MODIFY `id_status_mission` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id_supplier` int(100) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `id_department` FOREIGN KEY (`id_department`) REFERENCES `department` (`id_department`),
  ADD CONSTRAINT `id_position` FOREIGN KEY (`id_position`) REFERENCES `position` (`id_position`),
  ADD CONSTRAINT `id_role` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`),
  ADD CONSTRAINT `id_salary` FOREIGN KEY (`id_salary`) REFERENCES `salary` (`id_salary`),
  ADD CONSTRAINT `id_shift` FOREIGN KEY (`id_shift`) REFERENCES `shift` (`id_shift`);

--
-- Các ràng buộc cho bảng `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `Id_account` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Id_shift_atten` FOREIGN KEY (`id_shift`) REFERENCES `shift` (`id_shift`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_from` FOREIGN KEY (`chat_from`) REFERENCES `account` (`id_account`),
  ADD CONSTRAINT `chat_to` FOREIGN KEY (`chat_to`) REFERENCES `account` (`id_account`);

--
-- Các ràng buộc cho bảng `mission`
--
ALTER TABLE `mission`
  ADD CONSTRAINT `mission_id_account` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`),
  ADD CONSTRAINT `missionstatus` FOREIGN KEY (`status`) REFERENCES `status_mission` (`id_status_mission`);

--
-- Các ràng buộc cho bảng `order_entry`
--
ALTER TABLE `order_entry`
  ADD CONSTRAINT `order_id_supplier` FOREIGN KEY (`id_supplier`) REFERENCES `supplier` (`id_supplier`);

--
-- Các ràng buộc cho bảng `position`
--
ALTER TABLE `position`
  ADD CONSTRAINT `position_id_department` FOREIGN KEY (`id_department`) REFERENCES `department` (`id_department`);

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `id_order` FOREIGN KEY (`id_order`) REFERENCES `order_entry` (`id_Order`),
  ADD CONSTRAINT `id_producer` FOREIGN KEY (`id_producer`) REFERENCES `producer` (`id_producer`),
  ADD CONSTRAINT `id_supplier` FOREIGN KEY (`id_supplier`) REFERENCES `supplier` (`id_supplier`),
  ADD CONSTRAINT `id_type` FOREIGN KEY (`id_type`) REFERENCES `product_type` (`id_type`);

--
-- Các ràng buộc cho bảng `resign`
--
ALTER TABLE `resign`
  ADD CONSTRAINT `resign_account` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `salary`
--
ALTER TABLE `salary`
  ADD CONSTRAINT `salary_id_position` FOREIGN KEY (`id_position`) REFERENCES `position` (`id_position`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
