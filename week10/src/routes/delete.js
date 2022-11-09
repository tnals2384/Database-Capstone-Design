import express from "express";
import {selectSql, deleteSql} from "../database/sql";

const router = express.Router();

router.get('/:id', async function(req, res) {
    const Student = await selectSql.getStudent(req.params.id);
    const Class = await selectSql.getClass(req.params.id);
    const Student_id = req.params.id;
    res.render('select', {
        title: '학생 정보',
        title2: ' Class', 
        Student_id,
        Student, Class
    });
});

router.post('/', async (req,res)=>{
    console.log(req.body.student_id);
    const data = {
        Student_id: req.body.student_id,
        Class_id: req.body.delBtn,
    };

    await deleteSql.deleteClass(data);
    res.redirect('/delete/'+data.Student_id)
})


module.exports = router;