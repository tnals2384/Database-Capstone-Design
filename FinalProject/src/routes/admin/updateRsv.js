import express from "express";
import {selectSql,updateSql,insertSql } from "../../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {
   
    if (req.cookies.user=='admin') {
        const Reservations=await selectSql.getReservations();
        res.render('admin/updateRsv', { user: req.cookies.user, name:req.cookies.name,
            title:'예약 목록',
            Reservations
        });      
    } else {
        res.render('/')
    }
});


router.post('/', async (req,res) => {
    const saleperson = await selectSql.getSaleperson();
    const Employees = await selectSql.getEmployees();
    const vars = req.body;
    const data = {
        Date: vars.date,
        State: vars.state,
        ID: vars.id,
        Sid: vars.sid
    }

    //예약정보 update
    await updateSql.updateReservation(data);

    /* Employee table에 등록된 Sid인지 확인 */
    //등록되어있는 Sid이거나, 예약건의 판매자가 아직 지정되지않은 경우 employee true
    let employee=false;
    Employees.map((e) => { 
        if(e.Sid==data.Sid || data.Sid=="") 
            employee=true;
    })

    /*Saleperson에 insert할지 update할지 판별*/ 
    //update하고자 하는 reservation의 ID가 이미 Saleperson table에 있으면 insert false
    let insertCheck=true;
    saleperson.map((sp)=> { 
        if(sp.Sale_ID==data.ID) {
            insertCheck=false;
        }
    })


    if(!employee) { //등록되지않은 id일 경우
        res.send("<script>alert('정확한 직원 id를 입력하세요.');location.href='/updateReservation';</script>");
    }
    else {
        if(data.Sid=="") {
        //saleperson이 아직 지정되지 않은 상태에서 다른 값을 update한다면
        //아무일도 하지 않음
        }
        else if(insertCheck) { //최초 등록일 경우
            await insertSql.insertSalePerson(data);
        }
        else {
            await updateSql.updateSaleperson(data);
        }
        res.redirect('/updateReservation')
    }
})

module.exports = router;
