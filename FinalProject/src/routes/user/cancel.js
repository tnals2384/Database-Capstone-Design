import express from "express";
import {selectSql,deleteSql } from "../../database/sql";

const router = express.Router();


router.post('/', async (req,res) => {
    //YYYY-MM-DD 형식으로 오늘날짜 저장
    const today= new Date().toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-');
    
    const vars = req.body;
    const data = {
        ID: vars.ID,
        Date: vars.Date
    }
    
    /* 당일 예약 취소 불가능 */
    let check=true;
    if(today==data.Date) { 
        res.send("<script>alert('당일 예약 취소는 불가능합니다.'); location.href='/';</script>");
        check=false;
    }

    
    if(check) {
    await deleteSql.deleteReservation(data);
    res.redirect('/')
    }
})

module.exports = router;
