/*
 Navicat Premium Data Transfer

 Source Server         : dataWeb
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : newspapers

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 16/06/2019 18:07:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  UNIQUE KEY `Name` (`Name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of categories
-- ----------------------------
BEGIN;
INSERT INTO `categories` VALUES (9, '5G');
INSERT INTO `categories` VALUES (3, 'AI');
INSERT INTO `categories` VALUES (4, 'Camera');
INSERT INTO `categories` VALUES (7, 'Cars');
INSERT INTO `categories` VALUES (5, 'Design');
INSERT INTO `categories` VALUES (6, 'Entertainment');
INSERT INTO `categories` VALUES (2, 'Laptop');
INSERT INTO `categories` VALUES (1, 'Mobile');
INSERT INTO `categories` VALUES (8, 'Smart Home');
COMMIT;

-- ----------------------------
-- Table structure for categorysons
-- ----------------------------
DROP TABLE IF EXISTS `categorysons`;
CREATE TABLE `categorysons` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `NameSon` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `Category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  KEY `Category_id` (`Category_id`) USING BTREE,
  KEY `Name` (`NameSon`) USING BTREE,
  CONSTRAINT `categorysons_ibfk_1` FOREIGN KEY (`Category_id`) REFERENCES `categories` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of categorysons
-- ----------------------------
BEGIN;
INSERT INTO `categorysons` VALUES (1, 'IOS', 1);
INSERT INTO `categorysons` VALUES (2, 'Android', 1);
INSERT INTO `categorysons` VALUES (3, 'Apple', 2);
INSERT INTO `categorysons` VALUES (4, 'Lenovo', 2);
INSERT INTO `categorysons` VALUES (5, 'SamSung', 2);
INSERT INTO `categorysons` VALUES (6, 'Asus', 2);
INSERT INTO `categorysons` VALUES (7, 'Trong nước', 3);
INSERT INTO `categorysons` VALUES (8, 'Ngoài nước', 3);
INSERT INTO `categorysons` VALUES (9, 'Sony', 4);
INSERT INTO `categorysons` VALUES (10, 'Conon', 4);
INSERT INTO `categorysons` VALUES (11, 'Trong nước', 5);
INSERT INTO `categorysons` VALUES (12, 'Ngoài nước', 5);
INSERT INTO `categorysons` VALUES (13, 'Ngoài nước', 6);
INSERT INTO `categorysons` VALUES (14, 'Ngoài nước', 6);
INSERT INTO `categorysons` VALUES (15, 'Trong nước', 7);
INSERT INTO `categorysons` VALUES (16, 'Ngoài nước', 7);
INSERT INTO `categorysons` VALUES (17, 'Trong nước', 8);
INSERT INTO `categorysons` VALUES (18, 'Ngoài nước', 8);
INSERT INTO `categorysons` VALUES (19, 'Trong nước', 9);
INSERT INTO `categorysons` VALUES (20, 'Trong nước', 9);
INSERT INTO `categorysons` VALUES (21, 'Ngoài nước', 9);
COMMIT;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Content` longtext CHARACTER SET utf8 COLLATE utf8_vietnamese_ci,
  `User_id` int(11) DEFAULT NULL,
  `Type_Comment` int(11) DEFAULT NULL,
  `Reply_id` int(11) DEFAULT NULL,
  `Status_reply` int(11) DEFAULT NULL,
  `Created_date` date DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  KEY `User_id` (`User_id`) USING BTREE,
  KEY `Reply_id` (`Reply_id`) USING BTREE,
  KEY `Type_Comment` (`Type_Comment`) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`User_id`) REFERENCES `users` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`Reply_id`) REFERENCES `comment` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`Type_Comment`) REFERENCES `typecomment` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for newspaper_images
-- ----------------------------
DROP TABLE IF EXISTS `newspaper_images`;
CREATE TABLE `newspaper_images` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Newspaper_id` int(11) DEFAULT NULL,
  `Link` mediumtext CHARACTER SET utf8 COLLATE utf8_vietnamese_ci,
  PRIMARY KEY (`Id`) USING BTREE,
  KEY `Newspaper_id` (`Newspaper_id`) USING BTREE,
  CONSTRAINT `newspaper_images_ibfk_1` FOREIGN KEY (`Newspaper_id`) REFERENCES `newspapers` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for newspaper_videos
-- ----------------------------
DROP TABLE IF EXISTS `newspaper_videos`;
CREATE TABLE `newspaper_videos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Newspaper_id` int(11) DEFAULT NULL,
  `Link` mediumtext CHARACTER SET utf8 COLLATE utf8_vietnamese_ci,
  PRIMARY KEY (`Id`) USING BTREE,
  KEY `Newspaper_id` (`Newspaper_id`) USING BTREE,
  CONSTRAINT `newspaper_videos_ibfk_1` FOREIGN KEY (`Newspaper_id`) REFERENCES `newspapers` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for newspapers
-- ----------------------------
DROP TABLE IF EXISTS `newspapers`;
CREATE TABLE `newspapers` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Title` mediumtext CHARACTER SET utf8 COLLATE utf8_vietnamese_ci,
  `CategorySon_id` int(11) DEFAULT NULL,
  `Created_date` date DEFAULT NULL,
  `Thumbnail` mediumtext CHARACTER SET utf8 COLLATE utf8_vietnamese_ci,
  `Content` longtext CHARACTER SET utf8 COLLATE utf8_vietnamese_ci,
  `Is_premium` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `Count_Like` int(255) DEFAULT NULL,
  `Summary` mediumtext CHARACTER SET utf8 COLLATE utf8_vietnamese_ci,
  `Id_Author` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  KEY `CategorySon_id` (`CategorySon_id`) USING BTREE,
  KEY `newspapers_ibfk_2` (`Id_Author`) USING BTREE,
  CONSTRAINT `newspapers_ibfk_1` FOREIGN KEY (`CategorySon_id`) REFERENCES `categorysons` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `newspapers_ibfk_2` FOREIGN KEY (`Id_Author`) REFERENCES `users` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of newspapers
-- ----------------------------
BEGIN;
INSERT INTO `newspapers` VALUES (1, 'Loạt smartphone đáng chú ý giảm giá đầu tháng 6', 1, '2019-06-14', NULL, NULL, 0, 1, 5, 'Nhiều mẫu máy từ cao cấp tới giá rẻ đều được các hệ thống bán lẻ giảm giá.', 2);
INSERT INTO `newspapers` VALUES (2, 'Bảo mật trên Android', 2, '2019-06-14', NULL, NULL, 0, 1, 10, 'Trong một động thái để giải quyết mối quan tâm gắn kết về bảo mật trên Android ...', 2);
INSERT INTO `newspapers` VALUES (3, 'IOS 12.2.1', 1, '2019-06-16', NULL, NULL, 0, 1, 0, 'Cập nhật phiên bản IOS 12.2.1 đem lại nhiều lợi ích cho người dùng', 2);
INSERT INTO `newspapers` VALUES (4, 'Concept \'iPhone Z\' màn hình gập 2 bản lề.', 1, '2019-06-14', NULL, NULL, 0, 1, 0, 'Hãng thiết kế Nga Caviar vừa giới thiệu concept chiếc iPhone với màn hình gập 2 bản lề. Đây có thể là ý tưởng tham khảo tốt cho Apple.', 2);
INSERT INTO `newspapers` VALUES (5, 'Cuối cùng chế độ chụp đêm cũng đã xuất hiện trên Galaxy S10', 2, '2019-06-14', NULL, NULL, 0, 1, 0, 'Samsung vừa ra mắt chế độ chụp đêm trên Galaxy S10', 2);
INSERT INTO `newspapers` VALUES (6, 'Mổ bụng Galaxy Fold - bản lề phức tạp, màn hình dẻo như cao su   ', 2, '2019-06-14', NULL, NULL, 0, 1, 0, 'Những chi tiết cực kì thú vị', 2);
INSERT INTO `newspapers` VALUES (7, 'iPhone 2019 mang tin vui cho người thích selfie', 1, '2019-06-14', NULL, NULL, 0, 1, 0, 'iPhone ra mắt iPhone X có camera cực xịn', 2);
INSERT INTO `newspapers` VALUES (8, 'Đây là những gì bạn cần biết về Galaxy Note 10', 2, '2019-06-14', NULL, NULL, 0, 1, 0, 'Nguồn tin từ GSMArena cho biết Galaxy Note 10 sẽ có giá bán khoảng 1.100-1.200 USD.', 2);
INSERT INTO `newspapers` VALUES (9, 'Năm nay Apple sẽ cải thiện điểm yếu chí mạng bấy lâu của iPhone', 1, '2019-06-16', NULL, NULL, 0, 1, 0, 'Theo EverythingApplePro, Apple đang phát triển tính năng chụp đêm Night Mode độc quyền cho thế hệ iPhone kế tiếp.', 2);
INSERT INTO `newspapers` VALUES (10, 'iPhone XR2 có thể là smartphone pin \'trâu\' nhất của Apple', 1, '2019-06-14', NULL, NULL, 0, 1, 0, 'Theo tin đồn, viên pin của máy sẽ có dung lượng 3.110 mAh, tăng 5% so với thế hệ tiền nhiệm.', 2);
INSERT INTO `newspapers` VALUES (11, 'Vừa lộ ảnh, Google xác nhận luôn thiết kế của Pixel 4', 2, '2019-06-14', NULL, NULL, 0, 1, 0, 'Nhiều người cho rằng Google đang lấy cảm hứng thiết kế Pixel 4 từ iPhone 2019 - model cũng chưa ra mắt cho đến tháng 9.', 2);
INSERT INTO `newspapers` VALUES (12, 'Smartphone Ấn Độ đang gục ngã trên chính sân nhà', 2, '2019-06-14', NULL, NULL, 0, 1, 0, 'Từng nắm giữ hơn 40% thị phần, hiện tại các hãng smartphone nội địa Ấn Độ gần như biến mất khỏi thị trường quốc gia tỷ dân.', 2);
INSERT INTO `newspapers` VALUES (13, 'Bí mật làm hệ điều hành thay Android, Huawei liệu có \'thoát chết\'?', 2, '2019-06-14', NULL, NULL, 0, 1, 0, 'Nhiều nguồn tin khẳng định Huawei đang gặp khó khăn trong việc tạo ra bộ chuyển đổi giúp hệ điều hành do hãng phát triển tương thích với ứng dụng Android.', 2);
INSERT INTO `newspapers` VALUES (14, 'Dùng iOS 13 beta nhiều lỗi và đầy phiền phức nhưng tôi không hối hận', 1, '2019-06-14', NULL, NULL, 0, 1, 0, 'iOS 13 không có quá nhiều thay đổi lớn nhưng Apple đã cho thấy hãng luôn lắng nghe người dùng và mang đến những tính năng cần thiết, đơn giản, ổn định cao.', 2);
INSERT INTO `newspapers` VALUES (15, 'Tại sao iPhone sạc lâu đầy vào mùa hè', 1, '2019-06-14', NULL, NULL, 0, 1, 0, 'iPhone hay bất kỳ điện thoại thông minh và máy tính bảng nào cũng đều gặp tình trạng sạc lâu đầy vào mùa hè. Lý do chính xác là gì?', 2);
INSERT INTO `newspapers` VALUES (16, 'Huawei vẫn nuôi hy vọng chiếm ngôi vương ngành smartphone của Samsung', 2, '2019-06-14', NULL, NULL, 0, 1, 0, 'Mặc dù đang đối mặt nhiều khó khăn, lãnh đạo của Huawei vẫn không từ bỏ mục tiêu giành danh hiệu nhà sản xuất smartphone lớn nhất thế giới từ tay Samsung.', 2);
INSERT INTO `newspapers` VALUES (17, 'Quên Mac đi, iPad sẽ là tương lai điện toán di động của Apple', 1, '2019-06-14', NULL, NULL, 0, 1, 0, 'iPadOS mang tới sức mạnh xử lý công việc tuyệt vời cho iPad, đồng thời kế thừa kho ứng dụng khổng lồ từ iOS.', 2);
INSERT INTO `newspapers` VALUES (18, 'Người dùng iPhone 8 Plus cập nhật ngay iOS 12.3.2 để sửa lỗi camera', 1, '2019-06-14', NULL, NULL, 0, 1, 0, 'iOS 12.3.2 được phát hành riêng cho iPhone 8 Plus nhằm sửa lỗi chế độ chụp chân dung.', 2);
INSERT INTO `newspapers` VALUES (19, '10 tính năng đáng giá trên iOS 13 có thể bạn chưa biết', 1, '2019-06-14', NULL, NULL, 0, 1, 0, 'Với hàng loạt tính năng mới, hệ điều hành iOS 13 hứa hẹn sẽ mang đến cho người dùng trải nghiệm mới lạ, thuận tiện hơn.', 2);
INSERT INTO `newspapers` VALUES (20, 'Oppo Reno bản cao cấp giá 21 triệu đồng', 2, '2019-06-14', NULL, NULL, 0, 1, 0, 'Trong khi bản tiêu chuẩn được bán với giá 13 triệu thì bản cao cấp với 3 camera sau, zoom lai 10x được bán với giá 21 triệu đồng.', 2);
INSERT INTO `newspapers` VALUES (21, 'ASUS giới thiệu loạt laptop sử dụng vi xử lý AMD Ryzen Mobile với mức giá mềm hơn, chỉ từ 9 triệu đồng', 6, '2019-06-14', NULL, NULL, 0, 1, 0, 'ASUS tung 5 laptop phục vụ nhu cầu từ phổ thông cho đến gaming cao cấp, sử dụng chip AMD để giá thành \"nhẹ nhàng\" hơn.', 2);
INSERT INTO `newspapers` VALUES (22, 'Ảnh thực tế loạt laptop ASUS ROG mới: trang bị Core i9, GTX 1660 TI', 6, '2019-06-14', NULL, NULL, 0, 1, 0, 'Theo ASUS, đây là những sản phẩm mới chú trọng về hiệu suất mạnh mẽ không chỉ cho game thủ mà còn quan tâm hơn đến người làm trong ngành sáng tạo nội dung', 2);
INSERT INTO `newspapers` VALUES (23, 'Vấn nạn hỏng bàn phím \'cánh bướm\' trên MacBook Pro tệ hơn Apple nghĩ', 3, '2019-06-14', NULL, NULL, 0, 1, 0, 'Lời xin lỗi vào tuần trước của Apple liệu có đủ hay không?', 2);
INSERT INTO `newspapers` VALUES (24, 'Ra mắt Samsung Notebook 7 thiết kế giống hệt Macbook Pro, giá từ 1.000 USD', 5, '2019-06-16', NULL, NULL, 0, 1, 0, 'Ngay trước sự kiện WWDC 2019, Samsung công bố dòng laptop Notebook 7 mới có thiết kế giống MacBook Pro của Apple đến từng chi...', 2);
INSERT INTO `newspapers` VALUES (25, 'Lenovo ra mắt ThinkPad E series cho doanh nhân, thiết kế đẹp, giá vừa phải', 4, '2019-06-14', NULL, NULL, 0, 1, 10, 'Lenovo vừa công bố  bộ ba laptop ThinkPad E series mới, được thiết kế riêng cho các doanh nghiệp SMB cần duy trì hoạt động...', 2);
INSERT INTO `newspapers` VALUES (26, 'Qualcomm và Lenovo ra mắt laptop 5G đầu tiên trên thế giới', 4, '2019-06-14', NULL, NULL, 0, 1, 0, 'Hôm nay tại triển lãm Computex diễn ra ở Đài Bắc, Qualcomm và Lenovo vừa công bố hợp tác ra mắt mẫu lapto 5G đầu...', 2);
INSERT INTO `newspapers` VALUES (27, 'Ra mắt Lenovo IdeaPad C340, giá từ 15,5 triệu đồng', 5, '2019-06-14', NULL, NULL, 0, 1, 0, 'Lenovo vừa giới thiệu chiếc laptop IdeaPad C340 2-trong-1 mới với mức giá chỉ từ 15,5 triệu dành cho khách hàng muốn có các tính...', 2);
INSERT INTO `newspapers` VALUES (28, 'ASUS VivoBook 14/15 ra mắt, nhỏ gọn, 4 màu sắc', 6, '2019-06-16', NULL, NULL, 0, 1, 0, 'Chiều nay 21/5 tại TP.HCM, ASUS chính thức ra mắt bộ đôi VivoBook 14/15 (A412/A512) tại sự kiện “Vivobook – Cuộc chơi lớn”. Đây là...', 2);
INSERT INTO `newspapers` VALUES (29, 'Lenovo trưng bày mẫu laptop màn hình gập đầu tiên trên thế giới', 6, '2019-06-14', NULL, NULL, 0, 1, 0, 'Lenovo đang phát triển công nghệ màn hình gập để biến chiếc laptop thông thường thành một thiết bị nhỏ gọn và phù hợp với...', 2);
INSERT INTO `newspapers` VALUES (30, 'Ra mắt loạt laptop ASUS trang bị AMD Ryzen Mobile', 6, '2019-06-14', NULL, NULL, 0, 1, 10, 'ASUS vừa công bố chính thức hợp tác chiến lược cùng AMD trong sự kiện chủ đề “The Choice of MORE”, đồng thời giới thiệu...', 2);
INSERT INTO `newspapers` VALUES (31, 'Lenovo Legion Y740 chính thức lên kệ, giá 48 triệu đồng', 4, '2019-06-14', NULL, NULL, 0, 1, 0, 'Với thiết kế tân tiến hiện đại, trang bị hiệu năng mạnh mẽ, Lenovo Legion Y740 hứa hẹn mang đến sự trải nghiệm tốt nhất dành cho...', 2);
INSERT INTO `newspapers` VALUES (32, 'ASUS tổ chức triển lãm Zen Gallery, ra mắt ASUS ZenBook 13 / 14 / 15', 6, '2019-06-14', NULL, NULL, 0, 1, 0, 'Sáng nay tại triển lãm công nghệ và nghệ thuật Zen Gallery, ASUS Việt Nam chính thức ra mắt series ZenBook mới bao gồm ZenBook...', 2);
INSERT INTO `newspapers` VALUES (33, 'Laptop Gaming Lenovo Legion Y730 lên kệ, giá 38 triệu đồng', 4, '2019-06-14', NULL, NULL, 0, 1, 0, 'Lenovo vừa giới thiệu thành viên mới nhất của dòng máy tính gaming là Legion Y730, hội tụ hiệu năng mạnh mẽ và khả năng di...', 2);
INSERT INTO `newspapers` VALUES (34, 'Ra mắt laptop biến hình đột phá Lenovo Yoga C930', 4, '2019-06-14', NULL, NULL, 0, 1, 0, 'Lenovo vừa ra mắt thị trường Việt Nam mẫu laptop biến hình Yoga C930, thành viên mới nhất trong dòng máy Yoga cao cấp. Ông...', 2);
INSERT INTO `newspapers` VALUES (35, 'Samsung ra mắt laptop chuyên game thế hệ mới', 5, '2019-06-14', NULL, NULL, 0, 1, 0, 'Sau thất bại trong việc thu hút sự chú ý cho dòng laptop chuyên game Odyssey, năm nay Samsung giới thiệu một sản phẩm mới...', 2);
INSERT INTO `newspapers` VALUES (36, 'Apple ‘chia tay’ Intel, dùng chip tự sản xuất cho máy Mac tương lai', 3, '2019-06-14', NULL, NULL, 0, 1, 0, 'Apple đang có kế hoạch sử dụng con chip tự sản xuất trên các máy tính Mac từ năm 2020, thay thế sản phẩm của...', 2);
INSERT INTO `newspapers` VALUES (37, 'Lenovo ra mắt laptop IdeaPad 320S nhỏ gọn, giá từ 15 triệu đồng', 4, '2019-06-14', NULL, NULL, 0, 1, 0, 'Lenovo đã ra mắt chiếc IdeaPad 320S 13-inch cho giới trẻ năng động, mong muốn sử dụng thiết bị cho nhu cầu công việc và...', 2);
INSERT INTO `newspapers` VALUES (38, 'Samsung giới thiệu Notebook Spin 7 trước thềm CES', 5, '2019-06-14', NULL, NULL, 0, 1, 0, 'Sau 1 tháng giới thiệu Notebook 9 Series chạy Windows 10, Samsung mới vừa ra mắt chiếc Notebook 7 Spin sau một năm rưỡi vắng...', 2);
INSERT INTO `newspapers` VALUES (39, '5 thủ thuật siêu tốc giúp Macbook của bạn nhanh hơn', 3, '2019-06-14', NULL, NULL, 0, 1, 0, 'Apple luôn tối ưu hóa tốt hệ điều hành iOS trên thiết bị di động và MacOS trên máy tính. Nhưng nếu hiệu quả làm...', 2);
INSERT INTO `newspapers` VALUES (40, 'Bật chế độ toàn màn hình trên Macbook sẽ giúp kéo dài thời gian dùng pin', 3, '2019-06-14', NULL, NULL, 0, 1, 0, 'Dựa vào những kiểm tra từ NotebookCheck, pin trên những chiếc MacBook có sự thay đổi đáng kể khi xem ở chế độ toàn màn...', 2);
INSERT INTO `newspapers` VALUES (41, 'Cùng các chuyên gia đầu ngành trí tuệ nhân tạo trả lời câu hỏi \"AI là gì?\"', 7, '2019-06-14', NULL, NULL, 0, 1, 0, 'Buổi tọa đàm tổ chức vào 22/5 này sẽ giải đáp tất cả những thắc mắc liên quan đến AI của độc giả.', 2);
INSERT INTO `newspapers` VALUES (42, 'Con chip bé nhỏ này sẽ phá bỏ định luật Moore để trở thành kẻ dẫn đầu ngành trí tuệ nhân tạo', 7, '2019-06-14', NULL, NULL, 0, 1, 0, 'Con chip Eyeriss xuất hiện trước những \"tay to mặt lớn\" của ngành công nghệ thế giới, rồi để lại những ấn tượng sâu sắc về tương lai có thể có của ngành trí tuệ nhân tạo.', 2);
INSERT INTO `newspapers` VALUES (43, 'Ở Trung Quốc, đi bộ sai luật cũng sẽ bị trí tuệ nhân tạo phát hiện và xử phạt', 7, '2019-06-14', NULL, NULL, 0, 1, 0, 'Từ một công ty vô danh, Intellifusion đã trở thành cánh tay phải đắc lực của cảnh sát và chính quyền thành phố Thâm Quyến (Trung Quốc), góp phần giữ gìn trật tự giao thông và an ninh công cộng.', 2);
INSERT INTO `newspapers` VALUES (44, 'Ở Amazon, robot có thể đuổi việc con người nếu thấy hợp lý', 7, '2019-06-14', NULL, NULL, 0, 1, 0, 'Thế giới nơi con người bị theo dõi và giám sát bởi máy móc tưởng chừng như chỉ có trong phim khoa học viễn tưởng, nay đã tồn tại ở Amazon.', 2);
INSERT INTO `newspapers` VALUES (45, 'Phần Lan: tù nhân là những người huấn luyện cho AI thông minh hơn', 7, '2019-06-14', NULL, NULL, 0, 1, 10, 'Trong những \"nhà tù mở\" của Phần Lan, có những tù nhân đang ngồi trước màn hình máy tính, nhận công việc dán nhãn dữ liệu nặng nhọc.', 2);
INSERT INTO `newspapers` VALUES (46, 'Apple muốn gì khi tuyển dụng \"đầu não về AI\" Ian Goodfellow từ Google?', 7, '2019-06-14', NULL, NULL, 0, 1, 0, 'Việc Apple âm thầm tuyển dụng hàng loạt các kỹ sư và nhân lực giỏi trong lĩnh vực AI từ đối thủ Google có thể là bước đi đầu tiên nhằm cụ thể hóa nhiều dự án, sản phẩm, dịch vụ ứng dụng AI đột phá trong thời gian tới.', 2);
INSERT INTO `newspapers` VALUES (47, 'Chào mừng bạn đến với Estonia - nơi quan tòa không phải là con người', 7, '2019-06-14', NULL, NULL, 0, 1, 0, 'Chính phủ điện tử là cái gì đó rất gần gũi với người dân Estonia. Họ sẵn sàng ứng dụng trí tuệ nhân tạo vào mọi thứ có thể, tăng hiệu quả làm việc của tất cả những ngành liên quan.', 2);
INSERT INTO `newspapers` VALUES (48, '3 người đàn ông quan trọng nhất trong ngành AI vừa nhận Giải thưởng Turing danh giá kèm 1 triệu USD', 7, '2019-06-14', NULL, NULL, 0, 1, 0, 'Họ là những người đặt viên gạch nền quan trọng, và chính họ cũng tỏ ra đôi chút lo lắng về tương lai của AI.', 2);
INSERT INTO `newspapers` VALUES (49, 'Soi lương ngành IT: Kỹ sư AI, Blockchain nhận lương cao nhất 2.200 USD/tháng, Hardware chỉ hơn 1.000 USD/tháng', 7, '2019-06-14', NULL, NULL, 0, 1, 0, 'Nhóm kỹ sư phát triển phần mềm liên quan đến Blockchain nhận mức lương trung bình là 2.241 USD, nhóm phát triển phần mềm liên quan đến AI có mức lương 1.844 USD, đứng vị trí thứ 3 là Full Stack với mức lương 1.642 USD, theo thống kê của VietnamWorks.', 2);
INSERT INTO `newspapers` VALUES (50, 'Dubai sử dụng camera AI nhìn khuôn mặt người dân để đo lường mức độ hạnh phúc của mọi người', 7, '2019-06-14', NULL, NULL, 0, 1, 0, 'Camera thông minh (smart camera) đã được dùng để đo lường sự hài lòng của khách hàng tại bốn \"Trung tâm Hạnh phúc của Khách hàng\" (Customer Happiness Centers) ở Dubai.', 2);
INSERT INTO `newspapers` VALUES (51, 'Câu đố triệu đô bất khả thi: máy tính cũng phải mất tới vài ngàn năm mới tìm ra câu trả lời', 8, '2019-06-14', NULL, NULL, 0, 1, 0, 'Thậm chí nếu bạn chứng minh được câu đố này bất khả thi với một cỗ máy, bạn cũng nhận được giải thưởng 1 triệu USD.', 2);
INSERT INTO `newspapers` VALUES (52, 'Đây không phải mèo thật, mà chỉ là mèo do AI tạo ra', 8, '2019-06-16', NULL, NULL, 0, 1, 10, 'Trước đó, báo chí cũng đã đưa tin về một website với công cụ AI có thể tạo ra hình ảnh một con người hoàn toàn không tồn tại trên thế giới.', 2);
INSERT INTO `newspapers` VALUES (53, '“Cha đẻ” của trí tuệ nhân tạo lo ngại về việc Trung Quốc lạm dụng AI để giám sát người dân', 8, '2019-06-14', NULL, NULL, 0, 1, 0, 'Nếu không có sự giám sát từ nhiều phía, trí tuệ nhân tạo (AI) có thể sẽ trở thành công cụ tiếp tay cho các mục đích xấu, đặc biệt tại Trung Quốc.', 2);
INSERT INTO `newspapers` VALUES (54, 'Adobe thêm tính năng \'zoom và thêm chi tiết\' bằng AI cho trình chỉnh sửa ảnh Lightroom CC', 8, '2019-06-14', NULL, NULL, 0, 1, 0, 'Chúng ta đang ngày càng gần công nghệ \'Enhance\' như ma thuật của các bộ phim trinh thám!', 2);
INSERT INTO `newspapers` VALUES (55, 'Hoàn thành bản giao hưởng dang dở của Schubert, AI của smartphone đang mở ra một chân trời mới cho nghệ thuật', 8, '2019-06-14', NULL, NULL, 0, 1, 0, 'Nhà soạn nhạc tài năng Schubert đã sáng tác dang dở bản Giao hưởng số 8 nhưng nó vừa được hoàn thiện bởi AI trên một chiếc smartphone.', 2);
INSERT INTO `newspapers` VALUES (56, 'Sử dụng AI, các nhà khoa học có thể mô phỏng cách nhìn của người chỉ với 1 điểm ảnh', 8, '2019-06-14', NULL, NULL, 0, 1, 0, 'Công nghệ nhiếp ảnh bằng AI đang có những bước tiến nhảy vọt.', 2);
INSERT INTO `newspapers` VALUES (57, 'Các nhà khoa học tạo ra thành công AI có thể xuất hình ảnh món ăn dựa trên công thức có sẵn', 8, '2019-06-14', NULL, NULL, 0, 1, 0, 'Thật bất ngờ khi AI giờ đây có thể giúp con người mường tượng trước về hình ảnh món ăn sẽ ra sao ngay cả khi mọi nguyên liệu và công thức mới chỉ nằm trên giấy.', 2);
INSERT INTO `newspapers` VALUES (58, 'AI của Google DeepMind thách đấu cao thủ StarCraft II, thắng 10 trên 11 ván', 8, '2019-06-16', NULL, NULL, 0, 1, 0, 'Hãy cùng xem AI của DeepMind chơi StarCarft II như thế nào.', 2);
INSERT INTO `newspapers` VALUES (59, 'Samsung sẽ tập trung vào AI và IoT tại CES 2019', 8, '2019-06-14', NULL, NULL, 0, 1, 0, 'Ít có khả năng Samsung giới thiệu smartphone mới tại CES 2019.', 2);
INSERT INTO `newspapers` VALUES (60, 'AI khéo léo giấu dữ liệu làm \"phao\", gian lận trong bài thử do các nhà nghiên cứu đặt ra', 8, '2019-06-14', NULL, NULL, 0, 1, 0, '\"Âm mưu\" bị phát hiện ra, người ta vừa mừng vừa lo về sự khéo léo của hệ thống AI.', 2);
INSERT INTO `newspapers` VALUES (61, 'Ý kiến cá nhân: Canon không nên chạy theo xu hướng máy ảnh không gương lật', 10, '2019-06-14', NULL, NULL, 0, 1, 0, 'Cuộc cách mạng máy ảnh không gương lật được tạo ra bởi Sony có lẽ không có chỗ trống cho Canon.', 2);
INSERT INTO `newspapers` VALUES (62, 'Cầm đèn chạy trước ô tô: Một người Nhật đem bán ống kính Sony khi nó còn chưa được công bố', 9, '2019-06-14', NULL, NULL, 0, 1, 0, 'Đây được cho là nguyên mẫu của một sản phẩm sẽ được hãng công bố trong một vài tuần tới.', 2);
INSERT INTO `newspapers` VALUES (63, 'Sony vượt mặt Nikon để trở thành hãng máy ảnh thứ 2 Thế giới', 9, '2019-06-14', NULL, NULL, 0, 1, 0, 'Vị trí đứng nhất vẫn đang thuộc về Canon.', 2);
INSERT INTO `newspapers` VALUES (64, 'Canon thay đổi thiết kế hotshoe trên máy ảnh giá rẻ buộc người dùng phải sử dụng flash của hãng: combo cho người tập sự liệu có còn rẻ?', 10, '2019-06-14', NULL, NULL, 0, 1, 0, 'Canon đang chơi trò chơi \'mèo vờn chuột\' với người dùng, tạo ra những điều gây khó chịu ở các sản phẩm tầm thấp để bắt họ phải mua các dòng máy đắt tiền.', 2);
INSERT INTO `newspapers` VALUES (65, 'Trên tay máy ảnh Sony RX0 mark II: Siêu nhỏ, quay phim 4K, màn hình lật', 9, '2019-06-14', NULL, NULL, 0, 1, 0, 'Có quá nhiều công nghệ được \'nhét\' vào thân máy chỉ cầm lọt trong lòng bàn tay.', 2);
INSERT INTO `newspapers` VALUES (66, 'Sony phát triển cảm biến Full-frame 100MP, quay phim 6K, rất có tiềm năng áp dụng thực tế', 9, '2019-06-14', NULL, NULL, 0, 1, 0, 'Câu hỏi ta phải đặt ra đó là: liệu có ai tận dụng được hết độ phân giải cao như vậy?', 2);
INSERT INTO `newspapers` VALUES (67, 'Máy ảnh không gương lật của Canon không dành cho người thuận mắt trái', 10, '2019-06-14', NULL, NULL, 0, 1, 0, 'Hãng có thể mất tới 1/3 số khách hàng vì lỗi trong thiết kế này.', 2);
INSERT INTO `newspapers` VALUES (68, 'Máy ảnh Sony trị giá 2200 USD \'đi tong\' cảm biến vì quay quá trình xóa hình xăm bằng laser', 9, '2019-06-14', NULL, NULL, 0, 1, 0, 'Lại một lần nữa, laser trở thành đối thủ \'không đội trời chung\' của cảm biến máy ảnh.', 2);
INSERT INTO `newspapers` VALUES (69, 'Canon chính thức ra mắt EOS RP: cảm biến full-frame, kích thước nhỏ gọn, giá 38 triệu đồng', 10, '2019-06-14', NULL, NULL, 0, 1, 0, 'Bên cạnh đó Canon cũng giới thiệu dòng máy in phun PIXMA TS707 với nhiều giải pháp in ấn cho gia đình và doanh nghiệp nhỏ.', 2);
INSERT INTO `newspapers` VALUES (70, 'Canon công bố EOS RP: Máy ảnh Full-frame nhỏ và nhẹ nhất Thế giới, giá rẻ hơn EOS R', 10, '2019-06-16', NULL, NULL, 0, 1, 0, 'Đúng như dự đoán, sản phẩm này có cấu hình khá giống với chiếc 6D Mark II đã có mặt trên thị trường.', 2);
INSERT INTO `newspapers` VALUES (71, 'Sáng tạo bất đắc dĩ: Chế quạt tản nhiệt để chống nóng cho máy ảnh Sony', 9, '2019-06-14', NULL, NULL, 0, 1, 0, 'Quá nhiệt là một trong những điểm yếu cố hữu trên các máy ảnh không gương lật đến từ Sony!', 2);
INSERT INTO `newspapers` VALUES (72, 'Lộ ảnh thiết kế và cấu hình máy ảnh tầm trung Canon EOS RP: 6D Mark II dạng không gương lật?', 10, '2019-06-14', NULL, NULL, 0, 1, 7, 'Đây là sẽ là chiếc máy ảnh không gương lật có cảm biến Fullframe thứ 2 của hãng Canon.', 2);
INSERT INTO `newspapers` VALUES (73, 'Chủ tịch Canon: Thị trường máy ảnh chuyên nghiệp sẽ thu nhỏ còn một nửa trong 2 năm tới', 10, '2019-06-14', NULL, NULL, 0, 1, 0, 'Với sự phát triển vượt bậc của smartphone, máy ảnh chuyên nghiệp đã không còn sức hút mạnh mẽ như trước đây nữa.', 2);
INSERT INTO `newspapers` VALUES (74, 'Sony công bố máy ảnh không gương lật A6400: Cảm biến APS-C, lấy nét tốc độ cao, màn hình lật', 9, '2019-06-14', NULL, NULL, 0, 1, 0, 'Một sản phẩm được Sony thiết kế dành cho những Vlogger và thích chụp ảnh selfie', 2);
INSERT INTO `newspapers` VALUES (75, 'Fstoppers: Canon và Nikon đều đã ra mắt những máy ảnh tệ nhất năm 2018', 10, '2019-06-14', NULL, NULL, 0, 1, 0, 'Mỗi hãng đều mắc những sai lầm khác nhau, nhưng đều tạo ra những máy ảnh chưa mang tính toàn diện.', 2);
INSERT INTO `newspapers` VALUES (76, '5 \'tài\' và 14 \'tật\' của dòng máy ảnh không gương lật Sony E-mount', 9, '2019-06-14', NULL, NULL, 0, 1, 0, 'Sony E-mount có lẽ là dòng máy ảnh không gương lật nổi tiếng nhất hiện nay, nhưng không phải vì vậy mà nó hoàn hảo. Sau đây là 5 điểm tuyệt vời của hệ thống này, nhưng kèm theo đó là 14 nhược điểm cần phải sửa chữa trong tương lai.', 2);
INSERT INTO `newspapers` VALUES (77, 'Từ bỏ máy quay chuyên nghiệp tiền tỷ, Sony quay phim bom tấn Hollywood bằng máy ảnh không gương lật', 9, '2019-06-14', NULL, NULL, 0, 1, 0, 'Không phải Arri Alexa, RED hay thậm chí những máy quay chuyên nghiệp của chính Sony sản xuất, hãng này thử nghiệm quay một bộ phim Hollywood bằng chiếc Alpha A7S II \'giá rẻ\'!', 2);
INSERT INTO `newspapers` VALUES (78, 'Sony: Chúng tôi thừa sức làm ống kính khẩu độ f/1.0, nhưng chả nhiếp ảnh gia nào cần cả!', 9, '2019-06-14', NULL, NULL, 0, 1, 0, 'Đây có phải là lời đáp trả của Sony với những hãng đã nói xấu về ngàm máy ảnh E-mount của họ?', 2);
INSERT INTO `newspapers` VALUES (79, 'Sony phát triển máy ảnh', 9, '2019-06-14', NULL, NULL, 0, 1, 20, 'Đây có lẽ là cảm biến máy ảnh \'toàn năng\' nhất mà Sony sản xuất được từ trước tới nay!', 2);
INSERT INTO `newspapers` VALUES (80, 'Góc gear chất: Cảnh sát giao thông tại Anh sử dụng ống kính Canon 100 - 400mm để bắn tốc độ!', 10, '2019-06-14', NULL, NULL, 0, 1, 0, 'Các quái xế tại Anh chắc chắn sẽ phải run sợ khi nhìn thấy bộ gear bắn tốc độ \'khủng\' của cảnh sát giao thông nước này.', 2);
INSERT INTO `newspapers` VALUES (81, 'Combo 9 khóa học thực chiến cho Designer chỉ 499k, nâng tầm sự nghiệp ngay sau Tết', 11, '2019-06-14', NULL, NULL, 0, 1, 0, 'Thành thạo 9 ứng dụng nổi tiếng cho Designer ngay sau khi học xong với mức giá ưu đãi 80% ... là những gì FEDU dành tặng bạn trong dịp Tết Nguyên Đán sắp tới đây.', 2);
INSERT INTO `newspapers` VALUES (82, '\"Phù thủy thiết kế iPhone\" Jony Ive quay sang thiết kế cây thông giáng sinh', 11, '2019-06-14', NULL, NULL, 0, 1, 0, 'Giám đốc thiết kế Apple Jony Ive từng được biết đến với những mẫu thiết kế đột phá và có tầm ảnh hưởng trên iPhone, iPad và Macbook. Thế nhưng có thể nhiều người không biết rằng đôi khi ông vẫn tham gia thực hiện những dự án ngoài lề rất không liên quan.', 2);
INSERT INTO `newspapers` VALUES (83, 'Dân thiết kế web có cần thiết phải biết code mới có thể thành công?', 11, '2019-06-14', NULL, NULL, 0, 1, 0, 'Một nhà thiết kế web, không nhất thiết phải là chuyên gia về HTML và CSS, nhưng ít nhất phải có hiểu biết cơ bản. Không cần thiết phải code ra một trang web thật chuyên nghiệp, nhưng phải đưa được thiết kế của mình hoạt động được trên trình duyệt (tất nhiên phải giống với bản thiết kế).', 2);
INSERT INTO `newspapers` VALUES (84, 'Sao năm 2016 rồi mà các trang web \"xấu như ma\" vẫn có nhiều người truy cập thế?', 11, '2019-06-14', NULL, NULL, 0, 1, 0, 'Giữa vô vàn những trang web mới với nhiều tính năng hiện đại mỗi ngày, dường như người dùng những trang web này quan tâm đến nhiều điều khác hơn là một thiết kế đẹp.', 2);
INSERT INTO `newspapers` VALUES (85, 'Trưởng bộ phận thiết kế của Uber từ chức', 11, '2019-06-14', NULL, NULL, 0, 1, 0, 'Nhiều người cho rằng nguyên nhân đến từ mẫu logo mới gây không ít tranh cãi của hãng này.', 2);
INSERT INTO `newspapers` VALUES (86, 'Cách Facebook tạo nên thiết kế cho một tỷ người dùng', 11, '2019-06-15', NULL, NULL, 0, 1, 0, 'Việc tạo nên một thiết kế sản phẩm cho một tỷ khách hàng nghe có vẻ khá dễ dàng ngay cả đối với những công ty phi thường. Vấn đề là bạn quan tâm những vấn đề này tới mức độ nào.', 2);
INSERT INTO `newspapers` VALUES (87, 'Polarr 3 - chỉnh sửa ảnh nền web nhanh, nhẹ, chất lượng cao', 11, '2019-06-15', NULL, NULL, 0, 1, 0, 'Dù hoạt động trên nền tảng web đơn giản, Polarr lại cung cấp khả năng chỉnh sửa hình ảnh nhanh, dễ sử dụng và quan trọng là hoàn toàn miễn phí.', 2);
INSERT INTO `newspapers` VALUES (88, '4 thay đổi về thiết kế đáng để nâng cấp lên OS X El Capitan ngay bây giờ', 11, '2019-06-15', NULL, NULL, 0, 1, 0, 'Bên cạnh loạt tính năng mới, OS X El Capitan cũng có nhiều thay đổi về thiết kế, không chỉ đẹp mà còn rất hữu ích.', 2);
INSERT INTO `newspapers` VALUES (89, 'Tại sao Apple thay đổi từ kiểu chữ Helvetica sang San Francisco?', 11, '2019-06-15', NULL, NULL, 0, 1, 0, 'Với sự ra mắt của Apple Watch, Apple đã thay đổi hoàn toàn bộ font hệ thống của hàng loạt thiết bị, nhằm đem lại trải nghiệm \"nhìn\" và \"đọc mãn nhãn hơn.', 2);
INSERT INTO `newspapers` VALUES (90, 'Sử dụng màu sắc trong thiết kế web thế nào cho đúng?', 11, '2019-06-15', NULL, NULL, 0, 1, 10, 'Xu hướng thiết kế phẳng, sử dụng màu khối đang dần khiến các trang web hiện đại ngày càng trở nên khác biệt.', 2);
INSERT INTO `newspapers` VALUES (91, 'Sử dụng màu sắc trong thiết kế web thế nào cho đúng?', 12, '2019-06-15', NULL, NULL, 0, 1, 0, 'Xu hướng thiết kế phẳng, sử dụng màu khối đang dần khiến các trang web hiện đại ngày càng trở nên khác biệt.', 2);
INSERT INTO `newspapers` VALUES (92, 'Bạn có nhận ra sự khác nhau về màu sắc logo Google và Microsoft không?', 12, '2019-06-15', NULL, NULL, 0, 1, 0, 'Những mảng màu tưởng chừng ngẫu hứng nhưng nó vẫn phải tuân theo các quy luật trong thiết kế.', 2);
INSERT INTO `newspapers` VALUES (93, '\"Xin lỗi nhé Apple, dân thiết kế chúng tôi không dùng iPad\"', 12, '2019-06-15', NULL, NULL, 0, 1, 0, 'Nhắm vào nhóm khách hàng là các nhà thiết kế đồ họa hay họa sĩ, Apple đang vô cùng tự tin về khả năng đánh chiếm thị trường của iPad Pro. Tuy nhiên, nhiều dân thiết kế chuyên nghiệp lại tỏ ra khá thờ ơ và… phũ phàng.', 2);
INSERT INTO `newspapers` VALUES (94, 'Tại sao cuộn chuột liên tục để đọc báo lướt web lại trở nên thịnh hành?', 12, '2019-06-15', NULL, NULL, 0, 1, 0, 'Thay vì điều hướng bằng biểu tượng và đường dẫn, xu thế web hiện đại đang nhấn mạnh vào hình thức cuộn trang.', 2);
INSERT INTO `newspapers` VALUES (95, 'Thay vì điều hướng bằng biểu tượng và đường dẫn, xu thế web hiện đại đang nhấn mạnh vào hình thức cuộn trang.', 12, '2019-06-15', NULL, NULL, 0, 1, 30, 'Sau khi cố CEO Steve Jobs qua đời, không một ai tại Apple có tầm ảnh hưởng lớn như Jony Ive - Phó chủ tịch mảng thiết kế của hãng này.', 2);
INSERT INTO `newspapers` VALUES (96, 'Hình ảnh siêu du thuyền năng lượng mặt trời lớn nhất thế giới', 12, '2019-06-15', NULL, NULL, 0, 1, 0, 'Thủ đô London của nước Anh là điểm dừng chân của siêu du thuyền năng lượng mặt trời lớn nhất thế giới MS Turanor Planet Solar.', 2);
INSERT INTO `newspapers` VALUES (97, 'Tổng hợp Stock, Background Pastel miễn phí cho thiết kế', 12, '2019-06-15', NULL, NULL, 0, 1, 0, 'Dưới đây là bộ sưu tập Background Pastel rất đẹp dành cho Designer. Bạn có thể sử dụng cho nhiều công việc thiết kế khác nhau. ...', 2);
INSERT INTO `newspapers` VALUES (98, 'UX Design: Cách làm cho nội dung trong giao diện trực quan hơn', 12, '2019-06-15', NULL, NULL, 0, 1, 0, 'Trong phần trước, chúng tôi đã đề cập đến các yếu tố ảnh hưởng đến khả năng đọc. Trong phần này, chúng...', 2);
INSERT INTO `newspapers` VALUES (99, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for permissions
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  UNIQUE KEY `Name` (`Name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of permissions
-- ----------------------------
BEGIN;
INSERT INTO `permissions` VALUES (1, 'Admin');
INSERT INTO `permissions` VALUES (3, 'Editor');
INSERT INTO `permissions` VALUES (4, 'Subscriber');
INSERT INTO `permissions` VALUES (2, 'Writer');
COMMIT;

-- ----------------------------
-- Table structure for tag_details
-- ----------------------------
DROP TABLE IF EXISTS `tag_details`;
CREATE TABLE `tag_details` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Newspaper_id` int(11) DEFAULT NULL,
  `Tag_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  KEY `Newspaper_id` (`Newspaper_id`) USING BTREE,
  KEY `Tag_id` (`Tag_id`) USING BTREE,
  CONSTRAINT `tag_details_ibfk_1` FOREIGN KEY (`Newspaper_id`) REFERENCES `newspapers` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `tag_details_ibfk_2` FOREIGN KEY (`Tag_id`) REFERENCES `tags` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  UNIQUE KEY `Name` (`Name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for typecomment
-- ----------------------------
DROP TABLE IF EXISTS `typecomment`;
CREATE TABLE `typecomment` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Type` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  UNIQUE KEY `Type` (`Type`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Name` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `Pseudonym` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Subscribe_date` date DEFAULT NULL,
  `Permission` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  KEY `Permission` (`Permission`) USING BTREE,
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`Permission`) REFERENCES `permissions` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES (1, 'tientruongphamnhat@gmail.com', '$2b$10$b3.meIYhqJBU0G/8V6k7c.v5OwrFxE1cScqirYtfSwMpsdVOTtReW', 'Trương Phạm Nhật Tiến', NULL, '2019-06-14', 1);
INSERT INTO `users` VALUES (2, 'nmt@gmail.com', '$2b$10$FBPl1VjH5sFmD/SqSRx.y.Zo2xYzq0H2oKt9PiNZPZqmhJAJXpeI.', 'Nguyễn Minh Trí', NULL, '2019-06-14', 2);
INSERT INTO `users` VALUES (3, 'tnnt@gmail.com', '$2b$10$RzTytxGfYFvXK6YAbj9p3OwOVfMBfIuuNL6nqIuR1YG0/TGTepfXe', 'Trần Nguyễn Ngọc Trường', NULL, '2019-06-14', 3);
INSERT INTO `users` VALUES (4, 'hqt@gmail.com', '$2b$10$1xuJGgOAMMEGwaKXbGsWPuUxlFCTFd9iAJ0KXSo4ef871Xaw3lLqe', 'Hà Quang Trọng', NULL, '2019-06-14', 4);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
