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

 Date: 08/06/2019 13:46:40
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
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_vietnamese_ci ROW_FORMAT = Dynamic;

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
  PRIMARY KEY (`Id`) USING BTREE,
  INDEX `CategorySon_id`(`CategorySon_id`) USING BTREE,
  CONSTRAINT `newspapers_ibfk_1` FOREIGN KEY (`CategorySon_id`) REFERENCES `categorysons` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_vietnamese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of newspapers
-- ----------------------------
INSERT INTO `newspapers` VALUES (1, 'Canon ra mắt PowerShot N, máy ảnh 12MP có thể chụp từ bất kì vị trí nào', 16, '2019-06-08', 'https://drive.google.com/open?id=1ZBTipW16rHBHHD4_HERLTzrhMXS43RSZ', 'https://drive.google.com/open?id=1ZBTipW16rHBHHD4_HERLTzrhMXS43RSZ\r\n\r\nCanon vừa chính thức ra mắt chiếc máy chụp ảnh PowerShot N, một mẫu camera mà người dùng có thể cầm theo mọi hướng nhờ có thiết kế đặc biệt hình vuông. PowerShot N sở hữu ống kính zoom quang 8x (tiêu cự tương đương máy phim là 28-224mm), khẩu độ f/3-5.9. Về mặt hình ảnh, Canon trang bị cho máy cảm biến CMOS 12MP High-Sensitivity cùng bộ xử lí hình ảnh DIGIC 5, hứa hẹn khả năng chụp thiếu sáng tốt với dải ISO 80-6400. Máy cho phép quay video độ phân giải 1080p @ 24fps hoặc 720p @ 32fps. Đèn flash phía trước vừa đóng vai trò trợ sáng khi chụp hình và quay phim, vừa giúp lấy nét trong môi trường tối.\r\n\r\nCanon nói rằng “với một vòng zoom và chụp ảnh được đặt ở phần trên lẫn dưới ống kính, hình có thể được chụp từ bất kì bị trí nào”. Cụ thể hơn, vòng bên ngoài sẽ đảm nhiệm chức năng như một nút chụp ảnh bình thường và có thể nhấn ở bất kì điểm nào, còn vòng bên trong sẽ có chức năng zoom. Màn hình phía sau có kích thước 2,8″ độ phân giải 461.000 pixel, hỗ trợ cảm ứng điện dung và có thể lật được 90 độ, tiện cho việc chụp các cảnh cao quá đầu hoặc những góc rất thấp. Người dùng cũng có thể điều khiển việc chụp ảnh thông qua màn hình này.\r\n\r\nNhà sản xuất cho biết thêm rằng PowerShot N sử dụng thẻ nhớ microSD, pin sạc (có thể sạc qua cổng USB). Máy có một chế độ mang tên Eco sẽ tự động giảm độ sáng và tắt màn hình đi sau 10 giây không sử dụng. Một khi con quay hồi chuyển bên trong thiết bị nhận thấy có sự di chuyển máy thì màn hình sẽ tự bật lại. Canon nói Eco mode sẽ giúp tăng thời gian dùng pin lên 30% so với bình thường.\r\n\r\nNgoài ra, kết nối Wi-Fi tích hợp với một nút Mobile Device Connect riêng sẽ giúp người dùng chia sẻ nội dung theo giao thức ngang hàng (ad-hoc) đến các thiết bị di động. Bằng phần mềm CameraWindow chạy trên Android hoặc iOS, những tấm ảnh từ PowerShot N có thể được nhanh chóng đăng lên các mạng xã hội. Những thiết bị thường dùng sẽ được camera ghi nhớ, cho phép nhấn một nút là truy cập ngay trong những lần sử dụng sau. Người dùng cũng được “đăng lời nhận xét trực tiếp từ camera của mình lên những tấm ảnh đã upload”, “chọn đích đến để tải ảnh lên Facebook – chia sẻ với mọi người hoặc chỉ post lên một số nhóm xác định”.\r\n\r\nCanon nói PowerShot N sẽ được bán ra vào tháng 4 với giá 300$, có hai tùy chọn màu trắng hoặc đen. Canon cũng đang lên kế hoạch ra mắt nhiều phụ kiện để dùng với mẫu compact đặc biệt này, trong đó bao gồm một số thứ giúp đeo camera lên cổ để tiện hơn cho việc chụp ảnh.\r\n\r\nMột số tính năng khác của Canon PowerShot N:\r\n\r\nChế độ chụp ảnh Creative Shot: tự động phân tích ảnh và áp dụng 5 hiệu ứng khác nhau lên tấm hình gốc dựa trên thông số ánh sáng, màu sắc,… Như vậy, người dùng sẽ có thêm 5 phiên bản khác của tấm ảnh mình đã ghi lại\r\nTính năng chống rung “Intelligent Image Stabilization” giúp camera tự chọn chế độ ổn định thích hợp tùy theo điều kiện chụp\r\nNút quay phim được tách riêng\r\nHệ thống “Hybrid Auto” giúp tăng cường tốc độ lấy nét, khả năng “Face ID” giúp máy xác định và khóa nét vào những gương mặt quen thuộc\r\nCó thể tải ảnh lên dịch vụ Canon iMAGE GATEWAYiii thông qua phần mềm trong máy tính\r\nHỗ trợ in ảnh không dây qua giao thức PictBridgeiv với một số máy in Canon\r\nHỗ trợ 58 chế độ cảnh khác nhau trong Smart AUTO Mode\r\nTính năng Smart Shutter giúp bám nét đối tượng, khi nhấc ngón tay ra khỏi màn hình là chụp\r\nKích thước: 79 x 60 x 29mm', 0, 1);
INSERT INTO `newspapers` VALUES (2, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for permissions
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  UNIQUE INDEX `Name`(`Name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_vietnamese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permissions
-- ----------------------------
INSERT INTO `permissions` VALUES (1, 'Admin');
INSERT INTO `permissions` VALUES (2, 'Editor');
INSERT INTO `permissions` VALUES (4, 'Subscriber');
INSERT INTO `permissions` VALUES (3, 'Writer');

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
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_vietnamese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  UNIQUE INDEX `Name`(`Name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_vietnamese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for typecomment
-- ----------------------------
DROP TABLE IF EXISTS `typecomment`;
CREATE TABLE `typecomment`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Type` varchar(20) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  UNIQUE INDEX `Type`(`Type`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_vietnamese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `Password` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `Name` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `Birth_date` date NULL DEFAULT NULL,
  `Pseudonym` varchar(20) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `Subscribe_date` date NULL DEFAULT NULL,
  `Permission` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  INDEX `Permission`(`Permission`) USING BTREE,
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`Permission`) REFERENCES `permissions` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_vietnamese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'tientruongphamnhat@gmail.com', '123456', 'Trương Phạm Nhật Tiến', '1997-11-07', 'Tien', '2019-06-08', 1);
INSERT INTO `users` VALUES (2, 'tringuyen@gmail.com', '234567', 'Nguyễn Minh Trí', '1997-12-19', 'Tri', '2019-06-08', 2);

SET FOREIGN_KEY_CHECKS = 1;
