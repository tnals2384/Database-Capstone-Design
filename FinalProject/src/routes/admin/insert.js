import express from "express";
import {selectSql,insertSql } from "../../database/sql";

const router = express.Router();


router.post('/', async (req,res) => {
    
    const vars = req.body;
    const data = {
        Price: vars.price,
        Car_type:vars.car_type,
        Model: vars.model,
        PlateNumber: vars.plateNumber,
        ModelYear: vars.modelYear,
        Color: vars.color,
        Mileage: vars.mileage,
        Engine: vars.engine,
        Size: vars.carsize,
        Maxspeed: vars.maxspeed,
        No_seats: vars.no_seats,
        Suvsize: vars.suvsize,
        Tonnage: vars.ton,
        No_of_axles:vars.no_of_axles
    }
    await insertSql.insertVehicle(data);
    res.redirect('/')
    
})

module.exports = router;
