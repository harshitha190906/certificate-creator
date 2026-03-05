const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.json({ msg: 'Get all templates', templates: [] });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/create', (req, res) => {
    try {
        const { name, backgroundImage, fields } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Template name is required' });
        }
        const newTemplate = {
            id: Date.now(),
            name,
            backgroundImage: backgroundImage || null,
            fields: fields || [],
            createdAt: new Date()
        };
        res.json({ msg: 'Template created successfully', template: newTemplate });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        res.json({ msg: 'Get template', templateId: id });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { name, backgroundImage, fields } = req.body;
        res.json({ msg: 'Template updated successfully', templateId: id });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        res.json({ msg: 'Template deleted successfully', templateId: id });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;