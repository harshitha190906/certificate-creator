const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
    try {
        res.json({ msg: 'Get all participants', participants: [] });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const results = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                res.json({ msg: 'CSV uploaded successfully', participants: results });
                fs.unlinkSync(req.file.path);
            })
            .on('error', (err) => {
                res.status(400).json({ error: 'Error parsing CSV', details: err.message });
                if (fs.existsSync(req.file.path)) {
                    fs.unlinkSync(req.file.path);
                }
            });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

router.post('/add', (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }
        const participant = { id: Date.now(), name, email };
        res.json({ msg: 'Participant added successfully', participant });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        res.json({ msg: 'Participant deleted successfully', participantId: id });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;