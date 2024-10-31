import express from "express";
import mongoose from "mongoose";
import { addExcelFile, createPractice, practiceGet, practiceAudio, checkAudio } from "./controllers/PracticeController.js";
import multer from "multer";
import xlsx from 'xlsx';
import cors from 'cors'

mongoose.connect('mongodb+srv://samandarsaidahmadov98:8787172ss@cluster0.soqylcu.mongodb.net/milestone?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('db ok');

}).catch((err) => console.log('db error', err))

const app = express();
app.use(cors())

const excelUpload = multer({ dest: 'uploads/' })

const audioStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'audio');
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const audioUpload = multer({ storage: audioStorage });

app.use(express.json())




app.get('/', (req, res) => {
    res.send('111  ffHello worl1')
})


app.use('/audio', express.static('audio'))

app.post('/practice', createPractice)
app.post('/practice/upload-excel', excelUpload.single('file'), addExcelFile)


app.get('/practice', practiceGet)

app.post('/practice/words-test', audioUpload.single('audio'), practiceAudio)

app.get('/practice/audio-check', checkAudio)

app.listen(8888, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('server ok');
})