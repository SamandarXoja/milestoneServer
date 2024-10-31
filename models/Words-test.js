import mongoose from "mongoose";


const WordsTestSchema = new mongoose.Schema({
    
    categories: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },

    audio: {
        type: String,
        required: true
    },
    sheet: { 
        type: String,
        required: false 
    }

})


export default mongoose.model('wordstest', WordsTestSchema)