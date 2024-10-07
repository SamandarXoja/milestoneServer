import express from "express";
import mongoose from "mongoose";
import { addExcelFile, createPractice, practiceGet } from "./controllers/PracticeController.js";
import multer from "multer";
import xlsx from 'xlsx';


mongoose.connect('mongodb+srv://samandarsaidahmadov98:8787172ss@cluster0.soqylcu.mongodb.net/milestone?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('db ok');

}).catch((err) => console.log('db error', err))

const app = express();
const upload = multer({ dest: 'uploads/' })

app.use(express.json())

app.get('/', (req, res) => {
    res.send('111  ffHello worl1')
})

app.post('/practice', createPractice)
app.post('/practice/upload-excel', upload.single('file'), addExcelFile)
// app.get('/practice', getAllPractice)

app.get('/practice', practiceGet)




app.listen(8888, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('server ok');
})