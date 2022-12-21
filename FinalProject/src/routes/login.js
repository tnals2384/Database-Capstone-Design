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

import cookieParser from "cookie-parser";
import express from "express";
import expressSession from 'express-session';
import { selectSql } from "../database/sql";

const router = express.Router();

// 쿠키 및 세션 설정
router.use(cookieParser());
router.use(expressSession({
    secret: 'dilab',
    resave: true,
    saveUninitialized: true,
}))

router.get('/', async function(req, res) {
    if (req.cookies.user === 'user') {
        const MyReservation = await selectSql.getMyReservation(req.cookies.Cid);
        res.render('user/main', { 'user': req.cookies.user, 'Cid':req.cookies.Cid,
        MyReservation, title: "예약 조회 및 취소"});
    } 
    else if(req.cookies.user === 'admin') {
        res.render('admin/insert', { 'admin': req.cookies.user, 'name':req.cookies.name});
    }
    else {
        res.render('login');
    }
});


router.post('/', async (req, res) => {
    const vars = req.body;
    const users = await selectSql.getUsers();
    const admins = await selectSql.getEmployees();
    let whoAmI = '';
    let name ='';
    let Cid=0;
    let checkLogin = false;

    users.map((user)=> {
        if(vars.id == user.Cid && vars.password === user.Password) {
            console.log('login success!');
            checkLogin = true;
            whoAmI='user'
            Cid=user.Cid;
        }
    })
    
    admins.map((admin)=> {
        console.log(admin.Sid);
        if(vars.id == admin.Sid && vars.password === admin.Password) {
            console.log('login success!');
            checkLogin = true;
            whoAmI='admin'
            name = admin.Name;
        }
    })

    if (checkLogin && whoAmI === 'admin') {
        res.cookie('user', whoAmI, {
            expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)
            httpOnly: true
        })
        res.cookie('name', name, {
            expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)
            httpOnly: true
        })
        res.redirect('/');
    }
    else if (checkLogin && whoAmI === 'user') {
        res.cookie('user', whoAmI, {
            expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)
            httpOnly: true
        })
        res.cookie('Cid', Cid, {
            expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)
            httpOnly: true
        })
        res.redirect('/');
    }
    else {
        console.log('login failed!');
        res.send("<script>alert('로그인에 실패했습니다.'); location.href='/';</script>");
    }
})
module.exports= router;