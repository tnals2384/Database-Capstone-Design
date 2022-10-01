import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import sql from "./sql";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*
//**INSERT**
 app.get('/', async (res,req) => {
     await sql.InsertClub();
     await sql.InsertClubMember();
     await sql.InsertEmployee();

     console.log("insert OK");
 });
*/
 app.get("/club", async (req, res)=> {
    const Club = await sql.getClub();
    
    res.json({"Club": Club})
});

app.get("/clubMember", async (req, res)=> {
    const clubMember = await sql.getClubMember();

    res.json( {'ClubMember':clubMember })
});
app.get("/employee", async (req, res)=> {
    const employee = await sql.getEmployee();
    
    res.json(
        {'Employee':employee})
});

app.get("/", async (req, res)=> {
    res.json()
});

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
})

