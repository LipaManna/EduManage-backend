import mongoose, { Schema } from 'mongoose';
import { generateUniqueCode } from '../utils/UniqueCodeGenerator.js';

const brandSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    type: {
        type: String,
        enum: ['campus', 'department', 'course', 'franchise'],
        default: 'department',
    },
    description: {
        type: String,
    },
    logo: {
        type: String, //Cloudnary URL
    },
    coverImage: {
        type: String, //Cloudnary URL
    },
    // theme:{
    //     type: Object,
    // },
    contact: {
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        websiteURL: {
            type: String,
        },
        address: {
            street: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            country: {
                type: String,
            },
            pincode: {
                type: String,
            }
        }
    }, 
    // settings: {
    //     type: mongoose.Schema.Types.Mixed,
    //     default: {}
    // },

    status: {
        type: String,
        enum: ["active", "inactive", "archived"],
        default: "active"
    },
    foundedYear: { type: Number },
    affiliation: { type: String },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

brandSchema.pre('save', function (next) {
    if(this.isNew && !this.code){
        const abbr = this.name.substring(0,3).toUpperCase();
        this.code = generateUniqueCode(abbr, 6)
    }

    next();
})


export default mongoose.model('brand', brandSchema)