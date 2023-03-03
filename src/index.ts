'use strict';

import express from "express";
import path from "path";
import http from "http";
import { engine } from 'express-handlebars';
import cors from 'cors';
import { Server } from "socket.io";

import IndexRoutes from './routes';
import {sockets} from "./sockets/device";


//Initialize
const app = express();
const server = http.createServer(app);

export const io = new Server(server);


//Settings
app.set('port',3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials')    
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Routes
app.use(IndexRoutes);

// Static files
//app.use(express.static(path.join(__dirname, 'public')));


//Server listening
server.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'));
});


sockets();