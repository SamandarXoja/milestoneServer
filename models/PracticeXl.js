import mongoose from "mongoose";



const PracticeXLSchema = new mongoose.Schema({
    rus: {
        type: String
    },
    eng: {
        type: String
    },
    objective: {
        type: String
    }




})


export default mongoose.model('Practicexl', PracticeXLSchema)