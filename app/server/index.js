/**
 * @file Bootstrap express.js server
 * @author Fikri Rahmat Nurhidayat
 */

const express = require("express");
const morgan = require("morgan");
const router = require("../../config/routes");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { none } = require("../middleware/uploadOnMemory");

dotenv.config();

const app = express();

//use cors, ganti halaman heroku ketika udah deploy
// const corsOptions ={
//     origin:'http://localhost:3000'||'https://secondhand-kelompok2.vercel.app/', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
var whitelist = ['http://localhost:3000', 'https://secondhand-kelompok2.vercel.app','https://secondhand-kelompok2.herokuapp.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials:true,
  optionSuccessStatus:200
}

app.set("trust proxy", 1);
app.use(cors(corsOptions));
// app.use(session({
//     name:"secondhand_kel2",
//     secret:"bennysakawnganublablaehehkimochi",
//     resave: false,
//     saveUninitialized: true,
//     cookie:{
//         secure: true,
//         sameSite:'none',
//         httpOnly: true,
//     }
// }))

/** Install JSON request parser */
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//use cookie parser
app.use(cookieParser());

/** Install request logger */
app.use(morgan("dev"));

/** Install JSON request parser */
app.use(express.json());

/** Install Router */
app.use(router);

module.exports = app;
