CREATE DATABASE CAR_DEALER;
USE CAR_DEALER;
-- -----------------------------------------------------
-- Table `Vehicle`
-- -----------------------------------------------------
CREATE TABLE Vehicle (
  Vin INT NOT NULL AUTO_INCREMENT,
  Price INT NOT NULL,
  Car_type VARCHAR(10) NOT NULL,
  Model VARCHAR(45) NOT NULL,
  Plate_number VARCHAR(20) NOT NULL UNIQUE,
  Model_year INT,
  Color VARCHAR(20),
  Mileage INT,
  Engine VARCHAR(20),
  PRIMARY KEY(Vin),
  INDEX Vehicle_Model_idx (Model) VISIBLE,
  INDEX Car_type_idx (Vin) VISIBLE
);

-- -----------------------------------------------------
-- Table `Car`
-- -----------------------------------------------------
CREATE TABLE Car (
  Vin INT NOT NULL,
  Size VARCHAR(10),
  Max_speed INT,
  PRIMARY KEY (Vin),
  INDEX fk_Car_Vehicle_idx (Vin) VISIBLE,
  CONSTRAINT fk_Car_Vehicle
    FOREIGN KEY (Vin)
    REFERENCES Vehicle (Vin)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
-- -----------------------------------------------------
-- Table `Suv`
-- -----------------------------------------------------
CREATE TABLE Suv (
  Vin INT NOT NULL,
  No_seats INT,
  Size VARCHAR(10),
  PRIMARY KEY (Vin),
  INDEX fk_Suv_Vehicle_idx (Vin) VISIBLE,
  CONSTRAINT fk_Suv_Vehicle1
    FOREIGN KEY (Vin)
    REFERENCES Vehicle (Vin)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table `Truck`
-- -----------------------------------------------------
CREATE TABLE Truck (
  Vin INT NOT NULL,
  Tonnage INT ,
  No_of_axles INT,
  PRIMARY KEY (Vin),
  INDEX fk_Truck_Vehicle_idx (Vin ) VISIBLE,
  CONSTRAINT fk_Truck_Vehicle1
    FOREIGN KEY (Vin)
    REFERENCES Vehicle (Vin)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
-- -----------------------------------------------------
-- Table `Customer`
-- -----------------------------------------------------
CREATE TABLE Customer (
  Cid INT NOT NULL,
  Cname VARCHAR(45) NOT NULL,
  Email VARCHAR(45),
  addr VARCHAR(20),
  Phone VARCHAR(20) ,
  Password VARCHAR(45) NOT NULL,
  PRIMARY KEY (Cid)
  );

-- -----------------------------------------------------
-- Table `Reservation`
-- -----------------------------------------------------
CREATE TABLE Reservation (
  ID INT NOT NULL AUTO_INCREMENT,
  Vin INT NOT NULL,
  Cid INT NOT NULL,
  Date VARCHAR(20) NOT NULL,
  State VARCHAR(20) NOT NULL,
  PRIMARY KEY (ID),
  INDEX fk_rsv_Vehicle1_idx (Vin) VISIBLE,
  INDEX fk_rsv_Customer1_idx (Cid) VISIBLE,
  INDEX sale_state_idx (State) VISIBLE,
  CONSTRAINT fk_rsv_Vehicle1
    FOREIGN KEY (Vin)
    REFERENCES Vehicle (Vin),
  CONSTRAINT fk_rsv_Customer1
    FOREIGN KEY (Cid)
    REFERENCES Customer (Cid)
);

-- -----------------------------------------------------
-- Table `Employee`
-- -----------------------------------------------------
CREATE TABLE Employee (
  Sid VARCHAR(20) NOT NULL,
  Name VARCHAR(45) NOT NULL,
  Email VARCHAR(45),
  Phone VARCHAR(20),
  Password VARCHAR(45) NOT NULL,
  PRIMARY KEY (Sid),
  INDEX Emloyee_name_idx (Name) VISIBLE
);

-- -----------------------------------------------------
-- Table 'SalePerson'
-- -----------------------------------------------------
CREATE TABLE SalePerson(
  Sale_ID INT NOT NULL,
  Sid VARCHAR(20) NOT NULL,
  PRIMARY KEY (Sale_ID),
  INDEX fk_SalePerson_Employee1_idx (Sid) VISIBLE,
  CONSTRAINT fk_SalePerson_Sale1
    FOREIGN KEY (Sale_ID)
    REFERENCES Reservation (ID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_SalePerson_Employee1
    FOREIGN KEY (Sid)
    REFERENCES Employee (Sid)
);

INSERT INTO Customer Values 
  (1111, '김수민', 'sumin@gmail.com', '인천', '010-1111-1111', 'p1111'),
  (2222, '홍길동', 'hohohoho@gmail.com', '인천', '010-2222-2222', 'p2222'),
  (3333, '이주연', 'juju@gmail.com', '서울', '010-3333-3333', 'p3333')
; 

INSERT INTO Employee Values 
  ('admin1', '김관리', 'admin1@gmail.com', '010-2222-1111', 'admin1111'),
  ('admin2', '이관리', 'admin2@gmail.com', '010-2222-3333', 'admin2222'),
  ('admin3', '최관리', 'admin3@gmail.com', '010-2222-4444', 'admin3333')
;

Create view SalePersonName as select Sale_ID, S.Sid, Name from SalePerson S, Employee E where S.Sid=E.Sid;
Create View ReservationModel as select ID, Cid, R.Vin, Model, Date, State from Reservation R,Vehicle V where R.Vin=V.Vin;

