import express from "express";
import {insertSql, selectSql} from "../database/sql";

const router = express.Router();

router.get('/',(req, res)=>{
    res.render('home');
});

router.post('/',(req,res)=>{
    const vars = req.body;
    const data = {
        s_id : vars.s_id,
        Sname : vars.sname,
        Email : vars.email,
        Phone : vars.phone,
        Major : vars.major,
        Student_id : vars.student_id
    };
    insertSql.setStudent(data);
    res.redirect('/');
})

module.exports = router;
