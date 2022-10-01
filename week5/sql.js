import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1111111111',
    database: 'inha',
})

const promisePool = pool.promise();

const sql = {
    InsertClub: async () => {
        const values = [
            ['1','Coding'],
            ['2','volunteer'],
            ['3','vocal'],
            ['4','dance'],
            ['5','Book']
        ]
        const results = await promisePool.query(
            `INSERT INTO Club VALUES ?`, [values])
    },
    InsertClubMember: async () => {
        const values = [
            ['1','2','1'],
            ['2','2','2'],
            ['3','2','3'],
            ['4','4','1'],
            ['5','5','5']
        ]
        const results = await promisePool.query(
            `INSERT INTO Clubmember VALUES ?`, [values])
    },
    InsertEmployee: async () => {
        const values = [
            ['1', 'Kevin','professor','2','4'],
            ['2', 'Jennie','professor','4','2'],
            ['3', 'choi woong','researcher','4','2'],
            ['4', 'oh inju','researcher','4','2'],
            ['5', 'kim haein','head of administration','1',null]
        ]
        const results = await promisePool.query(
            `INSERT INTO Employee VALUES ?`, [values])
    },
    getClub: async () => {
        const results = await promisePool.query(`select * from club`)

        return results;
    },
    getClubMember: async () => {
        const results = await promisePool.query(`select * from clubmember`)

        return results;
    },
    getEmployee: async () => {
        const results = await promisePool.query(`select * from employee`)

        return results;
    }
   
};

export default sql;