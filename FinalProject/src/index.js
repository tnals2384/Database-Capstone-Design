// Copyright 2022 kms
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
import logger from "morgan";
import path from "path";
import liveReload from 'livereload';
import connectLiveReload from 'connect-livereload';

import loginRouter from "./routes/login";
import logoutRouter from './routes/logout';
import insertRouter from "./routes/admin/insert";
import selectRouter from "./routes/admin/sale";
import updateRouter from "./routes/admin/updateRsv";
import updateRouter2 from "./routes/admin/updateVehicle";
import deleteRouter from "./routes/admin/delete";
import deleteRouter2 from "./routes/user/cancel";
import reserveRouter from "./routes/user/reserve";

const PORT = 3000;

const liveReloadServer = liveReload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100)
});

const app = express();

app.use(connectLiveReload());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, 'public')))

app.use(logger("dev"));

app.use("/", loginRouter);
app.use("/logout", logoutRouter);
app.use("/vehicle", insertRouter);
app.use("/sale", selectRouter);
app.use("/updateReservation", updateRouter);
app.use("/update",updateRouter2);
app.use("/delete", deleteRouter);
app.use("/cancel", deleteRouter2);
app.use("/reserve", reserveRouter);


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
