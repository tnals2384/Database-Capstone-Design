import mysql from "mysql2";

// 데이터베이스 연결
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    database: 'CAR_DEALER',
    password: '1111111111',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);

// async / await 사용
const promisePool = pool.promise();

// select query
export const selectSql = {
  getUsers: async () => { //customer 조회
    const [rows] = await promisePool.query(`select * from customer`);
    return rows
  },
  getEmployees : async () => { //employee 조회
    const [rows] = await promisePool.query(`select * from employee`);
    return rows
  },
  getSaleperson : async () => { //판매자 조회
    const [rows] = await promisePool.query(`select * from saleperson`);
    return rows
  },
  getMyReservation : async (Cid) => { //내 예약 조회(user 페이지)
    const sql=`select ID, Vin, Model,Date, State, Name as'판매담당자' from ReservationModel left join SalePersonName on Id=Sale_ID 
    where Cid=${Cid} and state='예약중'`;
    const [rows] = await promisePool.query(sql);
    return rows
  },
  getReservations: async () => { //예약 조회(관리자 페이지)
    const sql=`select * from ReservationModel left join SalePerson on ID=Sale_ID where state='예약중'`;
    const [rows] = await promisePool.query(sql);
    return rows
  },
  getSales: async () => { // 판매 내역 조회
    const sql=`select * from ReservationModel left join SalePerson on ID=Sale_ID where state='판매완료' or state='판매실패'`;
    const [rows] = await promisePool.query(sql);
    return rows
  },
  //admin update에서 사용
  getCars : async () => {
    const sql=`select * from Vehicle natural join Car where Car_type='Car' order by Vin desc LIMIT 100 `
    const [rows] = await promisePool.query(sql);
    return rows
  },
  getSUVs : async () => {
    const sql=`select * from Vehicle natural join Suv where Car_type='Suv' order by Vin desc LIMIT 100`
    const [rows] = await promisePool.query(sql);
    return rows
  },
  getTrucks : async () => {
    const sql=`select * from Vehicle natural join Truck where Car_type='Truck' order by Vin desc LIMIT 100`
    const [rows] = await promisePool.query(sql);
    return rows
  },
  //user 페이지 차량 예약에서 사용
  //예약중, 판매완료 상태인 차량은 조회하지 않음
  //최신 등록된 순으로 100개까지 조회해서 화면에 출력하도록
  getCarsUser : async () => {
    const sql=`select * from Vehicle natural join Car where Car_type='Car' and 
    Vin not in (select R.Vin from Reservation R where state='예약중' or state='판매완료') order by Vin desc LIMIT 100`
    const [rows] = await promisePool.query(sql);
    return rows
  },
  getSUVsUser : async () => {
    const sql=`select * from Vehicle natural join Suv where Car_type='Suv' and 
    Vin not in (select R.Vin from Reservation R where state='예약중' or state='판매완료') order by Vin desc LIMIT 100`
    const [rows] = await promisePool.query(sql);
    return rows
  },
  getTrucksUser : async () => {
    const sql=`select * from Vehicle natural join Truck where Car_type='Truck' and 
    Vin not in (select R.Vin from Reservation R where state='예약중' or state='판매완료') order by Vin desc LIMIT 100`
    const [rows] = await promisePool.query(sql);
    return rows
  },
  
}

//insert query
export const insertSql = {
  insertVehicle : async (data) => { //차량정보 insert
      const sql = `insert into Vehicle(Price,Car_type,Model,Plate_Number,Model_year,Color,Mileage,Engine) values (
        ${data.Price}, "${data.Car_type}", "${data.Model}", "${data.PlateNumber}",
        ${data.ModelYear},"${data.Color}",${data.Mileage},"${data.Engine}"
      )`;
      await promisePool.query(sql);

      /*type에 따라 table에 insert */
      //LAST_INSERT_ID()는 가장 최근 AUTO_INCREMENT된 값을 의미함
      if (data.Car_type==='Car') {
        await promisePool.query(`insert into Car values ( (SELECT LAST_INSERT_ID()),
          "${data.Size}",${data.Maxspeed}
        )`);
      }
      else if(data.Car_type==='Suv') {
        await promisePool.query(`insert into Suv values ( 
          (SELECT LAST_INSERT_ID()),"${data.No_seats}","${data.Suvsize}"
        )`);
      }
      else {
        await promisePool.query(`insert into Truck values ( 
          (SELECT LAST_INSERT_ID()),${data.Tonnage},${data.No_of_axles}
        )`);
      }
  },
  //판매자 정보 insert
  insertSalePerson: async(data) => {
    const sql= `insert into Saleperson values (${data.ID},"${data.Sid}")`;
    await promisePool.query(sql);
  },
  //예약 정보 insert
  insertReservation: async(data) => {
    const sql = `insert into Reservation(Vin,Cid,Date,State) values (
      ${data.Vin}, ${data.Cid}, "${data.Date}", "예약중")`;
    await promisePool.query(sql);
  }
}

//update query
export const updateSql = {
  //예약 정보 update
  updateReservation : async (data) => {
      const sql = `update Reservation set Date = "${data.Date}" where ID="${data.ID}" `;
      const sql2 = `update Reservation set State = "${data.State}" where ID="${data.ID}"`;
      await promisePool.query(sql);
      await promisePool.query(sql2);
  },
  //판매자 정보 update
  updateSaleperson : async(data) => {
    const sql = `update Saleperson set Sid="${data.Sid}" where Sale_ID=${data.ID}`;
    await promisePool.query(sql);
  },
  //Vehicle 정보 update
  updateVehicle: async(data) => {
    const sql = `update Vehicle set Price=${data.Price}, Model="${data.Model}", Plate_number="${data.PlateNumber}",
    Model_year=${data.ModelYear},Color="${data.Color}",Mileage=${data.Mileage},Engine="${data.Engine}" where Vin=${data.Vin}`;
    await promisePool.query(sql);
  },
  //차량 type에 따른 table update
  updateCar : async(data) => {
    const sql = `update Car set Size="${data.Size}", Max_speed="${data.Maxspeed}" where Vin=${data.Vin}`;
    await promisePool.query(sql);
  },
  updateSuv : async(data) => {
    const sql = `update Suv set Size="${data.Size}", No_seats="${data.No_seats}" where Vin=${data.Vin}`;
    await promisePool.query(sql);
  },
  updateTruck : async(data) => {
    const sql = `update Truck set Tonnage="${data.Tonnage}", No_of_axles="${data.No_of_axles}" where Vin=${data.Vin}`;
    await promisePool.query(sql);
  }
}

//delete query
export const deleteSql = { 
  //on delete cascade 제약조건 설정되어있기 때문에, 
  //vehicle만 삭제해도 같은 Vin의 car,suv,truck table 정보도 같이 삭제
  deleteVehicle: async (data) => {
    const sql = `delete from Vehicle where Vin=${data.Vin}`
    await promisePool.query(sql);
  },
  //예약 삭제
  //on delete cascade 제약조건으로 Reservation만 삭제해도 같은 ID의 saleperson 정보도 삭제
  deleteReservation: async (data) => {
    const sql = `delete from Reservation where ID=${data.ID}`;
    await promisePool.query(sql);
  }
};
