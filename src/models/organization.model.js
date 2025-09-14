import mongoose, { Schema } from 'mongoose';
import { generateUniqueCode } from '../utils/UniqueCodeGenerator.js';

const organizationSchema = new Schema({
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
        enum: ['school', 'college', 'university', 'training_institute'],
        default: 'school',
        required: true
    },
    description: {
        type: String,
    },
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
    affiliation: {
        type: String,
    },
    registration_number: {
        type: String,
        unique: true
    },
    founded_year: {
        type: Number,
    },
    accreditation: {
        type: String,
    },
    logo: {
        type: String, //Cloudnary URL
    },
    // theme:{
    //     type: Object
    // },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending', 'suspended'],
        default: 'pending'
    },
    //     settings: {
    //     type: mongoose.Schema.Types.Mixed, // for dynamic configs
    //     default: {}
    //   },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

organizationSchema.pre('save', function (next){
    if(this.isNew && !this.registration_number){
        const abbr = this.name.substring(0,3).toUpperCase();
        this.registration_number = generateUniqueCode(abbr,8)
    }
    next();
})

export default mongoose.model('organization', organizationSchema)