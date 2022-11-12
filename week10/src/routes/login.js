import express from "express";
import {selectSql } from "../database/sql";

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const vars = req.body;
    const students = await selectSql.getStudents();
    let whoAmI = '';
    let checkLogin = false;

    students.map((student)=> {
        if(vars.id == student.Student_id && vars.password === student.password) {
            console.log('login success!');
            checkLogin = true;
            
            whoAmI ='student';
        }
        else if( vars.id === 'admin' && vars.password === 'admin1234') {
            checkLogin = true;
            whoAmI = 'admin';
            
        }
    })
    if(checkLogin && whoAmI==='student') {
        res.redirect('/delete/'+vars.id)
    }
    else if(checkLogin && whoAmI==='admin') {
        res.redirect('/select')

    }
    else {
        console.log('login failed!');
        res.send("<script>alert('로그인에 실패했습니다.'); location.href='/';</script>");
    }

})
module.exports= router;