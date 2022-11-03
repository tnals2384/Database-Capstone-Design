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
    getEmployee : async () => {
        const [rows] = await promisePool.query(`select * from employee`);
        console.log(rows)
        return rows
    },
    getDepartment : async () => {
        const [rows] = await promisePool.query(`select * from department`);
      
        return rows
    },
}

// insert query
export const insertSql = {
    setEmployee : async (data) => {
        const sql = `insert into employee values (
            "${data.Fname}","${data.Minit}","${data.Lname}","${data.Ssn}","${data.Bdate}",
            "${data.Address}","${data.Sex}","${data.Salary}","${data.Super_ssn}","${data.Dno}"
        )`;
        
        await promisePool.query(sql);
    },
    setDepartment : async (data) => {
        const sql = `insert into department values (
            "${data.Dname}","${data.Dnumber}","${data.Mgr_ssn}","${data.Mgr_start_date}"
        )`;
        
        await promisePool.query(sql);
    },
}

// update query
export const updateSql = {
    updateEmployee : async () => {
        const sql = `update employee set salary = 500 where Minit = "F"`;
        await promisePool.query(sql);
    },
    updateDepartment : async () => {
        const sql = `update department set dname = "${data.Dname}" where Dnumber = "5"`;
        await promisePool.query(sql);
    },
}