import Practice from "../models/Practice.js";

import multer from "multer";
import xlsx from 'xlsx';
import PracticeXl from "../models/PracticeXl.js";
import WordsTest from "../models/Words-test.js"
import WordsTestSchema from '../models/Words-test.js'
export const createPractice = async (req, res) => {

    try {
        const data = new Practice({
            ru: req.body.ru,
            en: req.body.en,
            level: req.body.level
        })
        const practice = await data.save();
        res.json(practice)
    }

    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать статью'
        })

    }
}

export const addExcelFile = async (req, res) => {
    try {
        const file = req.file;
        const workbook = xlsx.readFile(file.path);
        const sheet_name_list = workbook.SheetNames;
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);


        const modifiedData = data.map(item => {
            return {
                ...item,
                objective: item['objective №']
            }
        })

        modifiedData.forEach(item => {
            delete item['objective №']
        })

        const savedData = await PracticeXl.insertMany(modifiedData)

        res.status(200).json({
            message: "Файл успешно загружен и данные добавлены в базу.",
            data: savedData
        })
    }

    catch (err) {
        res.status(500).json({ message: "Ошибка при загрузке файла", err });
    }
}

export const practiceGet = async (req, res) => {
    try {
        const { category, limit } = req.query

        let query = {}
        if (category) {
            query = { objective: category }
        }

        const practices = await PracticeXl.aggregate([
            { $match: query },
            { $sample: { size: Number(limit) || 1 } }
        ])
        res.json(practices)

    }

    catch (err) {
        res.status(500).json({ message: 'ошибка', error: err })
    }
}

export const practiceAudio = async (req, res) => {
    try {
        const data = new WordsTest({
            page: req.body.page,
            categories: req.body.categories,
            title: req.body.title,
            audio: `audio/${req.file.filename}`
        });

        await data.save();
        res.status(200).json({ message: "Файл успешно загружен", data })


    } catch (err) {
        res.status(500).json({ message: "Ошибка при загрузке файла", err })
    }
}


// Используем объект для хранения использованных ID
let usedIds = {};

export const checkAudio = async (req, res) => {
    try {
        const { categories, sheet } = req.query

        const userKey = `${categories}-${sheet}`;


        if (!usedIds[userKey]) {
            usedIds[userKey] = new Set();
        }
        const allResults = await WordsTestSchema.aggregate([
            { $match: { categories, sheet } }
        ])

        if (allResults.length === 0) {
            return res.status(404).json({ message: "Данные не найдены" });
        }

        const remainingResults = allResults.filter(item => !usedIds[userKey].has(item._id.toString()));


        if (remainingResults.length > 0) {
            const randomIndex = Math.floor(Math.random() * remainingResults.length);
            const result = remainingResults[randomIndex];

            usedIds[userKey].add(result._id.toString());

            return res.status(200).json(result);
        } else {

            usedIds[userKey].clear();

            return res.status(200).json({ message: "Все данные были отправлены. Начинаем заново!" });
        }



    } catch (err) {
        res.status(500).json({ message: "Ошибка при загрузке файла", err })
    }
};


// export const getAllPractice = async (req, res) => {
//     const practices = await PracticeXl.find()

//     res.json(practices)

// }