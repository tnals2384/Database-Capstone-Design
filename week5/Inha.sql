CREATE DATABASE Inha;
USE Inha;
-- -----------------------------------------------------
-- Table `Building`
-- -----------------------------------------------------
CREATE TABLE Building (
  building_id INT NOT NULL AUTO_INCREMENT,
  Bname VARCHAR(45) NOT NULL,
  PRIMARY KEY (building_id));


-- -----------------------------------------------------
-- Table `Room`
-- -----------------------------------------------------
CREATE TABLE Room (
  room_id INT NOT NULL AUTO_INCREMENT,
  Rname VARCHAR(45) ,
  Capacity INT ,
  building_Bid INT NOT NULL,
  PRIMARY KEY (room_id,building_Bid),
  INDEX fk_Room_Building_idx (building_Bid ASC) ,
  CONSTRAINT fk_Room_Building
    FOREIGN KEY (building_bid)
    REFERENCES Building (building_id));
-- -----------------------------------------------------
-- Table `Department`
-- -----------------------------------------------------
CREATE TABLE Department (
  department_id INT NOT NULL AUTO_INCREMENT,
  Dname VARCHAR(45) NOT NULL,
  Email VARCHAR(45) ,
  Phone VARCHAR(20) ,
  PRIMARY KEY (department_id));


-- -----------------------------------------------------
-- Table `Class`
-- -----------------------------------------------------
CREATE TABLE Class (
  class_id INT NOT NULL AUTO_INCREMENT,
  Cname VARCHAR(45) NOT NULL,
  Professor VARCHAR(45) ,
  No_of_participants INT ,
  PRIMARY KEY (class_id));

-- -----------------------------------------------------
-- Table `Student`
-- -----------------------------------------------------
CREATE TABLE Student (
  s_id INT NOT NULL AUTO_INCREMENT,
  Sname VARCHAR(45) NOT NULL,
  Email VARCHAR(45) ,
  Phone VARCHAR(20) ,
  Major INT NOT NULL,
  Student_id INT NOT NULL,
  PRIMARY KEY (s_id),
  INDEX fk_Student_Department_idx (Major ASC) ,
  CONSTRAINT fk_Student_Department
    FOREIGN KEY (Major)
    REFERENCES Department (department_id));

-- -----------------------------------------------------
-- Table `register`
-- -----------------------------------------------------
CREATE TABLE Register (
  id INT NOT NULL AUTO_INCREMENT,
  class_id INT NOT NULL,
  s_id INT NOT NULL,
  INDEX fk_registerClass_Class1_idx (class_id ASC) ,
  INDEX fk_registerClass_Student1_idx (s_id ASC) ,
  PRIMARY KEY (id),
  CONSTRAINT fk_registerClass_Class1
    FOREIGN KEY (class_id)
    REFERENCES Class (class_id)
    ,
  CONSTRAINT fk_registerClass_Student1
    FOREIGN KEY (s_id)
    REFERENCES Student (s_id)
    );

-- -----------------------------------------------------
-- Table `class_room`
-- -----------------------------------------------------
CREATE TABLE class_room (
  id INT NOT NULL AUTO_INCREMENT,
  class_id INT NOT NULL,
  room_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_Class_has_Room_Room1_idx (room_id ASC) ,
  INDEX fk_Class_has_Room_Class1_idx (class_id ASC) ,
  CONSTRAINT fk_Class_has_Room_Class1
    FOREIGN KEY (class_id)
    REFERENCES Class (class_id)
    ,
  CONSTRAINT fk_Class_has_Room_Room1
    FOREIGN KEY (room_id)
    REFERENCES Room (room_id)
    );

-- -----------------------------------------------------
-- Table `club`
-- -----------------------------------------------------
CREATE TABLE Club (
  club_id INT NOT NULL AUTO_INCREMENT,
  club_name VARCHAR(45) NOT NULL,
  PRIMARY KEY (club_id)
  
  );
  -- -----------------------------------------------------
-- Table `Clubmember`
-- -----------------------------------------------------
CREATE TABLE Clubmember (
  id INT NOT NULL AUTO_INCREMENT,
  student_id INT NOT NULL,
  club_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_club_member_student1_idx (student_id ASC) ,
  INDEX fk_club_member_club1_idx (club_id ASC) ,
  CONSTRAINT fk_club_member_student1
    FOREIGN KEY (student_id)
    REFERENCES Student (s_id)
    ,
  CONSTRAINT fk_club_member_club1
    FOREIGN KEY (club_id)
    REFERENCES Club (club_id)
    );
-- -----------------------------------------------------
-- Table `employee`
-- -----------------------------------------------------
CREATE TABLE Employee (
  employee_id INT NOT NULL AUTO_INCREMENT,
  Ename VARCHAR(45) NOT NULL ,
  Position VARCHAR(45),
  Office_room INT,
  D_id INT,
  PRIMARY KEY (employee_id),
  INDEX fk_employee_room_idx (Office_room ASC) ,
  CONSTRAINT fk_employee_room
    FOREIGN KEY (Office_room)
    REFERENCES Room (room_id),
  INDEX fk_employee_department_idx (D_id ASC) ,
  CONSTRAINT fk_employee_department
    FOREIGN KEY (D_id)
    REFERENCES Department (department_id)  
    );

INSERT INTO Building VALUES
  ('1','Main Building'),
  ('2','Building 2'),
  ('3','Building 3'),
  ('4','Building 4'),
  ('5','Inha Hi-Tech Center');

INSERT INTO Room VALUES
  ('1', 'Student Welfare Department office', '10','5'),
  ('2', 'statistics department office',null,'3'),
  ('3', 'fitness room', '30' ,'2'),
  ('4', 'ICE department office','20','1'),
  ('5', 'lecture room', '80','3');

INSERT Department VALUES
  ('1','English Language and Literature',null,'032-860-8010'),
  ('2','Information and Communication Engineering',null,'032-860-7430'),
  ('3','Physical Education',null,'032-860-7880'),
  ('4','Statistics',null,'032-860-7640'),
  ('5','Electrical Engineering',null,'032-860-7390');

INSERT Student VALUES
  ('1','Kim sum','12201869@inha.edu','010-0000-0921','2','12201869'),
  ('2','Kim surin','12192381@inha.edu','010-1111-3221','2','12192381'),
  ('3','Lee jaehyun','12171111@inha.edu','010-9999-0913','3','12171111'),
  ('4','Kim hunyeong','12182222@inha.edu','010-8888-7777','4','12182222'),
  ('5','Kim woo','12219999@inha.edu',null,'5','12219999');


INSERT Class VALUES
  ('1','Tennis','John','30'),
  ('2','Golf','Mac','20'),
  ('3','Operationg System','Kim Kichang','42'),
  ('4','Database','Choi Wonik','30'),
  ('5','Understanding Fairy Tales','Lee mounki','500');

INSERT class_room VALUES
  ('1','1','1'),
  ('2','1','2'),
  ('3','2','1'),
  ('4','3','5'),
  ('5','4','3');

INSERT Register VALUES 
  ('1','1','3'),
  ('2','1','4'),
  ('3','2','1'),
  ('4','5','2'),
  ('5','5','4');


