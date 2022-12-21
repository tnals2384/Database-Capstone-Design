import express from "express";
import {selectSql, deleteSql } from "../../database/sql";

const router = express.Router();

router.post('/', async (req,res) => {
    
    const vars = req.body;
    const data = {
        Vin: vars.vin,
        Car_type:vars.cartype
    }
    //예약중이거나 판매내역이 있는 차의 정보는 삭제할 수 없음
    const Reservations=await selectSql.getReservations();
    const Sales = await selectSql.getSales();
    let Check=true;
    Reservations.map((r)=> {
        if(r.Vin == data.Vin) {
            Check=false;
        }
    })
    Sales.map((s) => {
        if(s.Vin==data.Vin) {
            Check=false;
        }
    })
    if(Check) { //예약중이 아니거나 판매내역이 없다면 삭제
        await deleteSql.deleteVehicle(data);

        //Cartype에 따라 page다르게 redirect
        if(data.Car_type=="Car")
            res.redirect('/update/Car')
        else if(data.Car_type=="Suv") 
            res.redirect('/update/Suv')
        else
            res.redirect('/update/Truck')
    }
    else {
        res.send("<script>alert('예약중이거나 판매내역이 있는 차량의 정보는 삭제할 수 없습니다.'); location.href='/';</script>");
    }
})

module.exports = router;
