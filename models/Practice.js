import mongoose from "mongoose";


const PracticeSchema = new mongoose.Schema({
    ru: {
        type: String,
        required: true
    },
    en: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    }

)


export default mongoose.model('Practice', PracticeSchema)