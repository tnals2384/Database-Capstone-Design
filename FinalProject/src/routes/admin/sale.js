import express from "express";
import {selectSql } from "../../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {
   
    if (req.cookies.user=='admin') {
        const Sales=await selectSql.getSales();
        res.render('admin/sale', { user: req.cookies.user, name:req.cookies.name,
            title:'판매 내역',
            Sales
        });
    } else {
        res.render('/')
    }
});

module.exports = router;
