import express from "express";
import {selectSql } from "../database/sql";

const router = express.Router();

router.get('/', async function(req, res) {
    const Student = await selectSql.getStudents();
    const Class = await selectSql.getClasses();
    res.render('select', {
        title: '학생 정보',
        title2: ' Class', 
        Student, Class
    });
});


module.exports = router;
