// Copyright 2021 kms
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import express from "express";
import {selectSql,insertSql } from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {
    // TODO
    // class 정보 불러오기
    const myClass = await selectSql.getClass(req.cookies.user);
    const Student = await selectSql.getStudent(req.cookies.user);
    const Class = await selectSql.getClasses();
    
    if (req.cookies.user) {
        // TODO
        // 불러온 class 정보 같이 넘겨주기
        res.render('select', { user: req.cookies.user,
            title: '내 수강신청 목록',
            Student,
            myClass,
            Class});
    } else {
        res.render('/')
    }
});

router.post('/', async (req,res) => {
    const myClass = await selectSql.getClass(req.cookies.user);
    let check=true;
    myClass.map((myclass)=> {
        if(myclass.class_id==req.body.signUp) {
            res.send("<script>alert('이미 신청한 과목입니다.'); location.href='/sugang';</script>");
            check=false;
        }
    })
    
    if(check) {
    const data = {
        Class_id: req.body.signUp,
        Sname: req.cookies.user
    };

    await insertSql.insertClass(data);
    res.redirect('/sugang')
    }
})



module.exports = router;