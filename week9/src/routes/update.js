import express from "express";
import {selectSql, updateSql } from "../database/sql";

const router = express.Router();

router.get('/student', async (req, res) => {
    const std_res = await selectSql.getStudent();
    res.render('updateStudent', {
        title: "학생 테이블 갱신",
        std_res
    });
});

router.post('/student',async (req, res) => {
    const vars = req.body;
    console.log(vars.phone);

    const data = {
        originalSid: vars.sid,
        s_id: vars.s_id,
        Sname: vars.sname,
        Email: vars.email,
        Phone: vars.phone,
        Major: vars.major,
        Student_id: vars.student_id
    }
    await updateSql.updateStudent(data);

    res.redirect('/select');
});

module.exports= router;
