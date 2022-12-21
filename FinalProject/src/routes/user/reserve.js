import express from "express";
import {insertSql, selectSql } from "../../database/sql";

const router = express.Router();

router.get('/car', async function (req, res) {
   
    if (req.cookies.user=='user') {
        const Cars= await selectSql.getCarsUser();
        res.render('user/reserveCar', { user: req.cookies.user, Cid:req.cookies.Cid,
            title:'Car 목록',
            Cars
        });
            
    } else {
        res.render('/')
    }
});

router.get('/suv', async function (req, res) {
   
    if (req.cookies.user=='user') {
        const Suvs= await selectSql.getSUVsUser();
        res.render('user/reserveSuv', { user: req.cookies.user, Cid:req.cookies.Cid,
            title:'Suv 목록',
            Suvs
        });
            
    } else {
        res.render('/')
    }
});

router.get('/truck', async function (req, res) {
   
    if (req.cookies.user=='user') {
        const Trucks= await selectSql.getTrucksUser();
        res.render('user/reserveTruck', { user: req.cookies.user, Cid:req.cookies.Cid,
            title:'Truck 목록',
            Trucks
        });
            
    } else {
        res.render('/')
    }
});

router.post('/', async (req,res) => {
    const Reservations=await selectSql.getReservations();
    const today= new Date().toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-');
    const vars = req.body;
    const data = {
        Vin: vars.vin,
        Date: vars.date,
        Cid: req.cookies.Cid,
        Car_type: vars.cartype,
    }


    var count=0;
    var check=true;
    Reservations.map((r)=> {
        if(r.Cid == data.Cid) { //예약 건수 count
            count++;
        }
        if(r.Vin==data.Vin && r.State=='예약중') { //동시성제어
            check=false;
        }
    })

    
    if(!check) { //웹 화면에는 존재하지만, 직전에 다른 고객에 의해 예약되었을 경우
        res.send("<script>alert('이미 다른 고객이 예약한 차량입니다.'); location.href='/';</script>");
    }
    else if(today==data.Date) { //당일 예약 불가능
        res.send("<script>alert('당일 예약은 불가능합니다.'); location.href='/';</script>");
    }
    else if(count>=3) { //예약은 최대 3번까지 가능
        res.send("<script>alert('예약은 총 3대까지 가능합니다.'); location.href='/';</script>");
    }
    else {
        await insertSql.insertReservation(data);
        /* cartype에 따라 다르게 redirect */
        if(data.Car_type=="Car") {
        res.redirect('/reserve/car')
        }
        else if(data.Car_type=="Suv") {
            res.redirect('/reserve/suv')
        }
        else {
        res.redirect('/reserve/truck')
        }
    }
    
});

module.exports = router;
