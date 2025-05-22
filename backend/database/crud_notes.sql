-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2025 at 06:01 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Gunakan database yang sesuai
CREATE DATABASE IF NOT EXISTS notes_129;
USE notes_129;

-- Pastikan tabel tidak ada sebelum dibuat
DROP TABLE IF EXISTS notes;

--
-- Database: `crud_notes`
--

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `date`, `title`, `content`, `createdAt`, `updatedAt`) VALUES
(1, '2025-01-01 00:00:00', 'Notifikasi', 'Hari pertama masuk kuliah dapet tugas baru lur', '2025-02-20 13:45:33', '2025-03-01 16:18:35'),
(3, '2025-02-19 17:00:00', 'Kuliah', 'Tugas baru Mobile Andorid membuat aplikasi sederhana dengan fitur yang sudah ditentukan', '2025-02-20 13:45:33', '2025-02-20 14:10:10'),
(8, '2025-01-22 00:00:00', 'Kuliner', 'Tadi nyobain makanan enak di preksu, mantap coy harganya 23k kayak mukbang besar oi', '2025-03-01 16:57:44', '2025-03-01 16:58:15'),
(9, '2025-02-01 00:00:00', 'Transfer', 'Habis bayar ganti batre laptop euy 1,2jt mahal juga yak', '2025-03-01 17:01:53', '2025-03-03 06:05:26'),
(11, '2025-02-28 17:00:00', 'Kuliah', 'Tugas Praktikum TCC hampir selesai, setelah itu kerjakan tugas yang lain', '2025-02-20 13:45:33', '2025-03-03 06:07:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
