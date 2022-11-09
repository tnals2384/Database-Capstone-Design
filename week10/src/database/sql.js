import mysql from "mysql2";

// 데이터 베이스 연결 
const pool = mysql.createPool(
    process.env.JAWSDB_URL ?? {
        host : 'localhost',
        user : 'root',
        database : 'inha',
        password : '1111111111',
        waitForConnections : true,
        connectionLimit : 10,
        queueLimit : 0
    }
);

// async / await 사용
const promisePool = pool.promise();

// select query
export const selectSql = {
    getStudents : async () => {
        const [rows] = await promisePool.query(`select Sname, S.Email,S.Phone,Dname, Student_id, password from student AS S, Department AS D where major=department_id`);
        return rows
    },
     getStudent : async (student_id) => {
         const [rows] = await promisePool.query(`select Sname,student.Email,student.Phone,Dname,Student_id from student,department where student_id="${student_id}" and major=department_id`);
         return rows
    },
    getClasses : async () => {
        const [rows] = await promisePool.query(`select * from class`);
      
        return rows
    },
    getClass : async (student_id) => {
        const [rows] = await promisePool.query(`select C.class_id,Cname,Professor from class AS C, register AS R ,student AS S where C.class_id=R.class_id and R.s_id=S.s_id and student_id="${student_id}" `);
      
        return rows
    },
};

//delete query
export const deleteSql = {
    deleteClass: async (data) => {
        const sql = `delete from register where class_id=${data.Class_id}`

        await promisePool.query(sql);
    },
};