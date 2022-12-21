import express from "express";
import {selectSql,updateSql } from "../../database/sql";

const router = express.Router();

router.get('/car', async function (req, res) {
   
    if (req.cookies.user=='admin') {
        const Cars= await selectSql.getCars();
        res.render('admin/updateCar', { user: req.cookies.user, name:req.cookies.name,
            title:'Car 목록',
            Cars
        });     
    } else {
        res.render('/')
    }
})

router.post('/car', async (req,res) => {

    const vars = req.body;
    const data = {
        Vin: vars.vin,
        Price: vars.price,
        Model: vars.model,
        PlateNumber: vars.plateNumber,
        ModelYear: vars.modelYear,
        Color: vars.color,
        Mileage: vars.mileage,
        Engine: vars.engine,
        Size: vars.size,
        Maxspeed: vars.maxspeed,
    }
    await updateSql.updateVehicle(data);
    await updateSql.updateCar(data);
    res.redirect('/update/Car')
})

router.get('/suv', async function (req, res) {
   
    if (req.cookies.user=='admin') {
        const Suvs= await selectSql.getSUVs();
        res.render('admin/updateSuv', { user: req.cookies.user, name:req.cookies.name,
            title:'Suv 목록',
            Suvs
        });
    } else {
        res.render('/')
    }
})

router.post('/suv', async (req,res) => {
    
    const vars = req.body;
    const data = {
        Vin: vars.vin,
        Price: vars.price,
        Model: vars.model,
        PlateNumber: vars.plateNumber,
        ModelYear: vars.modelYear,
        Color: vars.color,
        Mileage: vars.mileage,
        Engine: vars.engine,
        No_seats: vars.no_seats,
        Size: vars.size,
    }
    await updateSql.updateVehicle(data);
    await updateSql.updateSuv(data);
    res.redirect('/update/Suv')  
})

router.get('/truck', async function (req, res) {
   
    if (req.cookies.user=='admin') {
        const Trucks= await selectSql.getTrucks();
        res.render('admin/updateTruck', { user: req.cookies.user, name:req.cookies.name,
            title:'Truck 목록',
            Trucks
        });
    } else {
        res.render('/')
    }
})

router.post('/truck', async (req,res) => {
    
    const vars = req.body;
    const data = {
        Vin: vars.vin,
        Price: vars.price,
        Model: vars.model,
        PlateNumber: vars.plateNumber,
        ModelYear: vars.modelYear,
        Color: vars.color,
        Mileage: vars.mileage,
        Engine: vars.engine,
        Tonnage: vars.ton,
        No_of_axles: vars.no_of_axles,
    }
    await updateSql.updateVehicle(data);
    await updateSql.updateTruck(data);
    res.redirect('/update/Truck')
    
})
module.exports = router;
