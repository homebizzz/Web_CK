CREATE TABLE PERMISSIONS(
    Id int not null primary key auto_increment,
    Name varchar(20) unique
);

CREATE TABLE USERS (
    Id int not null primary key auto_increment,
    Email varchar(50),
    Password varchar(50),
    Name varchar(50),
    Birth_date date,
    Pseudonym varchar(20),
    Subscribe_date date,
		Permission int,
		foreign key (Permission) references PERMISSIONS(Id)
);

CREATE TABLE CATEGORIES(
    Id int not null primary key auto_increment,
    Name varchar(50) unique
);

CREATE TABLE NEWSPAPERS (
    Id int not null primary key auto_increment,
    Title mediumtext,
    Category_id int,
    Created_date date,
    Thumbnail mediumtext,
    Content longtext,
    Is_premium int,
    status int,
    foreign key (Category_id) references CATEGORIES(Id)
);

CREATE TABLE NEWSPAPER_IMAGES(
    Id int not null primary key auto_increment,
    Newspaper_id int,
    Link MEDIUMTEXT,
    foreign key (Newspaper_id) references NEWSPAPERS(Id)
);

CREATE TABLE NEWSPAPER_VIDEOS(
    Id int not null primary key auto_increment,
    Newspaper_id int,
    Link mediumtext,
    foreign key (Newspaper_id) references NEWSPAPERS(Id)
);

CREATE TABLE TYPECOMMENT (
    Id int not null primary key auto_increment,
    Type varchar(20) unique
);

CREATE TABLE COMMENT (
    Id int not null primary key auto_increment,
    Content longtext,
    User_id int,
    Type_Comment int,
    Reply_id int,
    Status_reply int,
    Created_date date,
    foreign key (User_id) references USERS(Id),
		foreign key (Reply_id) references COMMENT(Id),
		foreign key (Type_Comment) references TYPECOMMENT(Id)
);

CREATE TABLE TAGS (
    Id int not null primary key auto_increment,
    Name varchar(20) unique
);

CREATE TABLE TAG_DETAILS (
    Id int not null primary key auto_increment,
    Newspaper_id int,
    Tag_id int,
    foreign key (Newspaper_id) references NEWSPAPERS(Id),
    foreign key (Tag_id) references TAGS(Id)
);