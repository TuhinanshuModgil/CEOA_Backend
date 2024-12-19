import mongoose, {Schema} from 'mongoose'
import { linkSchema } from './link.model.js'

const programSchema = new Schema({
    title: {
        type: String, 
        required: true
    }, 
    featuresDescription: {
        type: String ,
    }, 
    features: [{
        featureTitle: {type: String, required: true}, 
        featureDescription: {type: String, required: true}
    }],
    name: {
        type: String, 
        required:true, 
        index: true, 
        unique: true
    }, 
    importantLinks: [linkSchema], 
    description: {
        type: String, 
    }, 
    faqs: [
        {
            question: {
                type: String, 
                required: true
            }, 
            answer: {
                type: String, 
                required: true
            }
        }
    ]

})

export const Program = mongoose.model('Program', programSchema)