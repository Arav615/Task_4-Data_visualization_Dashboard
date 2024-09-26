const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json()); 

mongoose.connect('mongodb+srv://aravinthravi615:7WFdMGk7LJUGCtKQ@cluster0.wgjsu.mongodb.net/Students', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected successfully'); 
})
.catch(err => {
    console.error('MongoDB connection error:', err); 
});

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },     
    year: { type: Number, required: true },    
    strength: { type: Number, required: true }, 
    isNew: { type: Boolean, required: true }     
});

const Student = mongoose.model('Student', StudentSchema);


app.post('/api/add-student', async (req, res) => {
    const { name, year, strength, isNew } = req.body;

    console.log('Received data:', req.body);
    if (!name || !year || !strength || typeof isNew !== 'boolean') {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    try {
        const newStudent = new Student({
            name,
            year,
            strength,
            isNew,
        });

        await newStudent.Create(); 
        res.status(201).json({ message: 'Student data added successfully', student: newStudent });
    } catch (error) {
        console.error('Error saving student data:', error);
        res.status(500).json({ error: 'Error saving student data' });
    }
});


app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error('Error retrieving student data:', error);
        res.status(500).json({ error: 'Error retrieving student data' });
    }
});

app.get('/api/student-metrics', async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const totalClasses = await Student.distinct('year').length;
        const currentYearStudents = await Student.countDocuments({ year: new Date().getFullYear() });
        res.json({ totalStudents, totalClasses, currentYearStudents });
    } catch (error) {
        console.error('Error retrieving metrics data:', error);
        res.status(500).json({ error: 'Error retrieving metrics data' });
    }
});


app.get('/api/year-wise-strength', async (req, res) => {
    try {
        const yearWiseStrength = await Student.aggregate([
            { $group: { _id: '$year', strength: { $sum: 1 } } },
            { $project: { year: '$_id', strength: 1, _id: 0 } },
        ]);
        res.json(yearWiseStrength);
    } catch (error) {
        console.error('Error retrieving year-wise data:', error);
        res.status(500).json({ error: 'Error retrieving year-wise data' });
    }
});


app.get('/api/old-new-students', async (req, res) => {
    try {
        const oldStudents = await Student.countDocuments({ isNew: false });
        const newStudents = await Student.countDocuments({ isNew: true });
        res.json({ old: oldStudents, new: newStudents });
    } catch (error) {
        console.error('Error retrieving old vs new students data:', error);
        res.status(500).json({ error: 'Error retrieving old vs new students data' });
    }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
