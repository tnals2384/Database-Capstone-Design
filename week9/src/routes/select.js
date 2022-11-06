import express from "express";
import {selectSql } from "../database/sql";

const router = express.Router();

router.get('/', async function(req, res) {
    const employee=await selectSql.getEmployee();
    const department = await selectSql.getDepartment();
    const student = await selectSql.getStudent();
    const register = await selectSql.getRegister();
    const Class = await selectSql.getClass();
    const classroom = await selectSql.getClassRoom();
    const club = await selectSql.getClub();
    const clubmember = await selectSql.getClubMember();
    const room = await selectSql.getRoom();
    const building = await selectSql.getBuilding();

    res.render('select', {
        title: 'Student 테이블',
        title2: 'Department 테이블',
        title3: 'Class 테이블',
        title4: 'Register 테이블',
        title5: 'Building 테이블',
        title6: 'Room 테이블',
        title7: 'ClassRoom 테이블',
        title8: 'Club 테이블',
        title9: 'ClubMember 테이블',
        title10: 'Employee 테이블',
        student,department,register,building,
        Class,classroom,room,club,clubmember,employee
    });
});

module.exports = router;