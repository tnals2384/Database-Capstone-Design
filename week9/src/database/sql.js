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
    getStudent: async () => {
        const [rows] = await promisePool.query(`select * from student`);
        console.log(rows)
        return rows
    },
    getDepartment : async () => {
        const [rows] = await promisePool.query(`select * from department `);
      
        return rows
    },
    getRegister : async () => {
        const [rows] = await promisePool.query(`select * from register `);
      
        return rows
    },getBuilding : async () => {
        const [rows] = await promisePool.query(`select * from building `);
      
        return rows
    },getRoom : async () => {
        const [rows] = await promisePool.query(`select * from room `);
      
        return rows
    },getClass : async () => {
        const [rows] = await promisePool.query(`select * from class `);
      
        return rows
    },getClassRoom : async () => {
        const [rows] = await promisePool.query(`select * from class_room `);
      
        return rows
    },getClub : async () => {
        const [rows] = await promisePool.query(`select * from club `);
      
        return rows
    },
    getClubMember : async () => {
        const [rows] = await promisePool.query(`select * from clubmember `);
      
        return rows
    },
    getEmployee : async () => {
        const [rows] = await promisePool.query(`select * from employee `);
      
        return rows
    },
}

// insert query
export const insertSql = {
    setStudent : async (data) => {
        const sql = `insert into student values (
            "${data.s_id}","${data.Sname}","${data.Email}","${data.Phone}","${data.Major}",
            "${data.Student_id}"
        )`;
        
        await promisePool.query(sql);
    },
}

// update query
export const updateSql = {
    updateStudent : async (data) => {
        const sql = `update student set S_id = "${data.s_id}" where s_id="${data.originalSid}" and "${data.s_id}" != ""`;
        const sql2 = `update student set Sname = "${data.Sname}" where s_id="${data.originalSid}" and "${data.Sname}" != ""`;
        const sql3 = `update student set Phone = "${data.Phone}" where s_id="${data.originalSid}" and "${data.Phone}" != ""`;
        const sql4 = `update student set Email = "${data.Email}" where s_id="${data.originalSid}" and "${data.Email}" != ""`;
        const sql5 = `update student set Major = "${data.Major}" where s_id="${data.originalSid}" and "${data.Major}" != ""`;
        const sql6 = `update student set Student_id = "${data.Student_id}" where s_id="${data.originalSid}" and "${data.Student_id}" != ""`;

        await promisePool.query(sql);
        await promisePool.query(sql2);
        await promisePool.query(sql3);
        await promisePool.query(sql4);
        await promisePool.query(sql5);
        await promisePool.query(sql6);
    },
}
