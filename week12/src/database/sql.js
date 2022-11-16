import mysql from "mysql2";

// 데이터베이스 연결
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    database: 'inha',
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
  getUsers: async () => {
    const [rows] = await promisePool.query(`select * from student`);
    return rows
  },
  getStudent : async (Sname) => {
    const sql = `select s_id, Sname,student.Email,student.Phone,Dname,Student_id from student,department
     where Sname="${Sname}" and major=department_id`
    const [rows] = await promisePool.query(sql);
    return rows
},
  getClasses : async () => {
    const sql=`select C.class_id,Cname, Professor, No_of_participants, No_of_participants-count(s_id) as '여석' 
     from class as C left join register as R on C.class_id=R.class_id group by C.class_id`
    const [rows] = await promisePool.query(sql);
    return rows
  },
  getClass : async (Sname) => {
    const sql = `select C.class_id,Cname,Professor,No_of_participants from class AS C, register AS R ,student AS S 
    where C.class_id=R.class_id and R.s_id=S.s_id and Sname="${Sname}"`
    const [rows] = await promisePool.query(sql);
    return rows
  },
}

export const insertSql = {
  insertClass : async (data) => {
    const sql = `insert into register(class_id,s_id) values (
      ${data.Class_id}, (select s_id from student where SName="${data.Sname}")
    )`;
    await promisePool.query(sql);
  }
}