import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        }
    },
    googleId: {
        type: String,
        sparse: true
    },
    bio: {
        type: String,
        maxlength: 500
    },
    profilePicture: {
        type: String,
        default: ''
    },
    bannerImage: {
        type: String,
        default: ''
    },
    headline: {
        type: String,
        maxlength: 120
    },
    location: {
        type: String
    },
    website: {
        type: String
    },
    experience: [{
        company: String,
        role: String,
        description: String,
        startDate: Date,
        endDate: Date,
        current: {
            type: Boolean,
            default: false
        }
    }],
    education: [{
        school: String,
        degree: String,
        field: String,
        startDate: Date,
        endDate: Date,
        current: {
            type: Boolean,
            default: false
        }
    }],
    skills: [{
        type: String
    }],
    connections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    connectionRequests: [{
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    savedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timestamps: true
});


userSchema.index({ name: 'text', headline: 'text', skills: 'text' });

const User = mongoose.model('User', userSchema);

export default User;
