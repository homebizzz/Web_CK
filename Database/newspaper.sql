/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : newspaper

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 14/06/2019 17:24:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  UNIQUE INDEX `Name`(`Name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_vietnamese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES (9, '5G');
INSERT INTO `categories` VALUES (3, 'AI');
INSERT INTO `categories` VALUES (4, 'Camera');
INSERT INTO `categories` VALUES (7, 'Cars');
INSERT INTO `categories` VALUES (5, 'Design');
INSERT INTO `categories` VALUES (6, 'Entertainment');
INSERT INTO `categories` VALUES (2, 'Laptop');
INSERT INTO `categories` VALUES (1, 'Mobile');
INSERT INTO `categories` VALUES (8, 'Smart Home');

-- ----------------------------
-- Table structure for categorysons
-- ----------------------------
DROP TABLE IF EXISTS `categorysons`;
CREATE TABLE `categorysons`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `Category_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  INDEX `Category_id`(`Category_id`) USING BTREE,
  INDEX `Name`(`Name`) USING BTREE,
  CONSTRAINT `categorysons_ibfk_1` FOREIGN KEY (`Category_id`) REFERENCES `categories` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_vietnamese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categorysons
-- ----------------------------
INSERT INTO `categorysons` VALUES (1, 'IOS', 1);
INSERT INTO `categorysons` VALUES (2, 'Android', 1);
INSERT INTO `categorysons` VALUES (3, 'Apple', 2);
INSERT INTO `categorysons` VALUES (4, 'Dell', 2);
INSERT INTO `categorysons` VALUES (5, 'Sony', 2);
INSERT INTO `categorysons` VALUES (6, 'Acer', 2);
INSERT INTO `categorysons` VALUES (7, 'Trong nước', 3);
INSERT INTO `categorysons` VALUES (8, 'Ngoài nước', 3);
INSERT INTO `categorysons` VALUES (15, 'Sony', 4);
INSERT INTO `categorysons` VALUES (16, 'Conon', 4);
INSERT INTO `categorysons` VALUES (17, 'Trong nước', 5);
INSERT INTO `categorysons` VALUES (18, 'Ngoài nước', 5);
INSERT INTO `categorysons` VALUES (19, 'Ngoài nước', 6);
INSERT INTO `categorysons` VALUES (20, 'Ngoài nước', 6);
INSERT INTO `categorysons` VALUES (21, 'Trong nước', 7);
INSERT INTO `categorysons` VALUES (22, 'Ngoài nước', 7);
INSERT INTO `categorysons` VALUES (23, 'Trong nước', 8);
INSERT INTO `categorysons` VALUES (24, 'Ngoài nước', 8);
INSERT INTO `categorysons` VALUES (25, 'Trong nước', 9);
INSERT INTO `categorysons` VALUES (26, 'Trong nước', 9);
INSERT INTO `categorysons` VALUES (27, 'Ngoài nước', 9);

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Content` longtext CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL,
  `User_id` int(11) NULL DEFAULT NULL,
  `Type_Comment` int(11) NULL DEFAULT NULL,
  `Reply_id` int(11) NULL DEFAULT NULL,
  `Status_reply` int(11) NULL DEFAULT NULL,
  `Created_date` date NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  INDEX `User_id`(`User_id`) USING BTREE,
  INDEX `Reply_id`(`Reply_id`) USING BTREE,
  INDEX `Type_Comment`(`Type_Comment`) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`User_id`) REFERENCES `users` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`Reply_id`) REFERENCES `comment` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`Type_Comment`) REFERENCES `typecomment` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_vietnamese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for newspaper_images
-- ----------------------------
DROP TABLE IF EXISTS `newspaper_images`;
CREATE TABLE `newspaper_images`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Newspaper_id` int(11) NULL DEFAULT NULL,
  `Link` mediumtext CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  INDEX `Newspaper_id`(`Newspaper_id`) USING BTREE,
  CONSTRAINT `newspaper_images_ibfk_1` FOREIGN KEY (`Newspaper_id`) REFERENCES `newspapers` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_vietnamese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for newspaper_videos
-- ----------------------------
DROP TABLE IF EXISTS `newspaper_videos`;
CREATE TABLE `newspaper_videos`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Newspaper_id` int(11) NULL DEFAULT NULL,
  `Link` mediumtext CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  INDEX `Newspaper_id`(`Newspaper_id`) USING BTREE,
  CONSTRAINT `newspaper_videos_ibfk_1` FOREIGN KEY (`Newspaper_id`) REFERENCES `newspapers` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_vietnamese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for newspapers
-- ----------------------------
DROP TABLE IF EXISTS `newspapers`;
CREATE TABLE `newspapers`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Title` mediumtext CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL,
  `CategorySon_id` int(11) NULL DEFAULT NULL,
  `Created_date` date NULL DEFAULT NULL,
  `Thumbnail` mediumtext CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL,
  `Content` longtext CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL,
  `Is_premium` int(11) NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT NULL,
  `Count_Like` int(255) NULL DEFAULT NULL,
  `Summary` mediumtext CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL,
  `Id_Author` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  INDEX `CategorySon_id`(`CategorySon_id`) USING BTREE,
  INDEX `newspapers_ibfk_2`(`Id_Author`) USING BTREE,
  CONSTRAINT `newspapers_ibfk_1` FOREIGN KEY (`CategorySon_id`) REFERENCES `categorysons` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `newspapers_ibfk_2` FOREIGN KEY (`Id_Author`) REFERENCES `users` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_vietnamese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for permissions
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  UNIQUE INDEX `Name`(`Name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permissions
-- ----------------------------
INSERT INTO `permissions` VALUES (1, 'Admin');
INSERT INTO `permissions` VALUES (3, 'Editor');
INSERT INTO `permissions` VALUES (4, 'Subscriber');
INSERT INTO `permissions` VALUES (2, 'Writer');

-- ----------------------------
-- Table structure for tag_details
-- ----------------------------
DROP TABLE IF EXISTS `tag_details`;
CREATE TABLE `tag_details`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Newspaper_id` int(11) NULL DEFAULT NULL,
  `Tag_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  INDEX `Newspaper_id`(`Newspaper_id`) USING BTREE,
  INDEX `Tag_id`(`Tag_id`) USING BTREE,
  CONSTRAINT `tag_details_ibfk_1` FOREIGN KEY (`Newspaper_id`) REFERENCES `newspapers` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `tag_details_ibfk_2` FOREIGN KEY (`Tag_id`) REFERENCES `tags` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  UNIQUE INDEX `Name`(`Name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for typecomment
-- ----------------------------
DROP TABLE IF EXISTS `typecomment`;
CREATE TABLE `typecomment`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Type` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  UNIQUE INDEX `Type`(`Type`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `Password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `Name` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `Pseudonym` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `Subscribe_date` date NULL DEFAULT NULL,
  `Permission` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  INDEX `Permission`(`Permission`) USING BTREE,
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`Permission`) REFERENCES `permissions` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'tientruongphamnhat@gmail.com', '$2b$10$b3.meIYhqJBU0G/8V6k7c.v5OwrFxE1cScqirYtfSwMpsdVOTtReW', 'Trương Phạm Nhật Tiến', NULL, '2019-06-14', 1);
INSERT INTO `users` VALUES (2, 'nmt@gmail.com', '$2b$10$FBPl1VjH5sFmD/SqSRx.y.Zo2xYzq0H2oKt9PiNZPZqmhJAJXpeI.', 'Nguyễn Minh Trí', NULL, '2019-06-14', 2);
INSERT INTO `users` VALUES (3, 'tnnt@gmail.com', '$2b$10$RzTytxGfYFvXK6YAbj9p3OwOVfMBfIuuNL6nqIuR1YG0/TGTepfXe', 'Trần Nguyễn Ngọc Trường', NULL, '2019-06-14', 3);
INSERT INTO `users` VALUES (4, 'hqt@gmail.com', '$2b$10$1xuJGgOAMMEGwaKXbGsWPuUxlFCTFd9iAJ0KXSo4ef871Xaw3lLqe', 'Hà Quang Trọng', NULL, '2019-06-14', 4);

SET FOREIGN_KEY_CHECKS = 1;
