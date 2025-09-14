import mongoose, {Schema} from "mongoose";

const orgTypesSchema = new Schema ({
    name: {
        type: String,
        enum: ['school', 'college', 'university', 'training_institute'],
        required: true,
        unique: true
    }
})

export default mongoose.model('orgType', orgTypesSchema);