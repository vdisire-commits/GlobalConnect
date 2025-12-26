import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 5000
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'internship', 'remote'],
        required: true
    },
    experienceLevel: {
        type: String,
        enum: ['entry', 'mid', 'senior', 'executive']
    },
    skills: [{
        type: String
    }],
    salary: {
        min: Number,
        max: Number,
        currency: {
            type: String,
            default: 'USD'
        }
    },
    applicants: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        resume: String,
        coverLetter: String,
        status: {
            type: String,
            enum: ['pending', 'reviewed', 'shortlisted', 'rejected'],
            default: 'pending'
        },
        appliedAt: {
            type: Date,
            default: Date.now
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    expiresAt: {
        type: Date
    },
    isReported: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

jobSchema.index({ title: 'text', description: 'text', skills: 'text' });
jobSchema.index({ postedBy: 1, createdAt: -1 });
jobSchema.index({ isActive: 1, expiresAt: 1 });

const Job = mongoose.model('Job', jobSchema);

export default Job;
