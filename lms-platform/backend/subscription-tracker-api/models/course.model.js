import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
    id: String,
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    duration: { type: String, required: true },
    isFree: { type: Boolean, default: false }
});

const questionSchema = new mongoose.Schema({
    id: String,
    text: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true }
});

const moduleSchema = new mongoose.Schema({
    id: String,
    title: { type: String, required: true },
    lessons: [lessonSchema],
    questions: [questionSchema]
});

const courseSchema = new mongoose.Schema({
    id: String,
    title: {
        type: String,
        required: [true, 'Course title is required'],
        trim: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Construction', 'CAD', 'BIM', 'Structural', 'Building Services', 'Quantity Surveying'],
    },
    skillLevel: {
        type: String,
        required: true,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Beginner to Intermediate', 'Beginner to Advanced', 'Intermediate to Advanced'],
    },
    shortDescription: {
        type: String,
        required: true,
        maxLength: 200,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: '../assets/img/placeholder.svg',
    },
    instructor: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    prerequisites: {
        type: String,
    },
    learningOutcomes: [{
        type: String
    }],
    modules: [moduleSchema],
    price: {
        type: Number,
        required: [true, 'Course price is required'],
        min: [10000, 'Price must be at least 10,000 KES'],
        default: 10000
    },
    currency: {
        type: String,
        default: 'KES',
        enum: ['KES', 'USD', 'EUR', 'GBP']
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;
