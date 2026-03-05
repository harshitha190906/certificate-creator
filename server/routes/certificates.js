const express = require('express');
const router = express.Router();

router.post('/generate', async (req, res) => {
    try {
        const { templateId, participants } = req.body;
        if (!templateId || !participants || participants.length === 0) {
            return res.status(400).json({ error: 'Template ID and participants are required' });
        }

        const certificates = participants.map((participant) => ({
            id: Date.now() + Math.random(),
            participantName: participant.name,
            participantEmail: participant.email,
            templateId,
            generatedAt: new Date()
        }));

        res.json({ msg: 'Certificates generated successfully', count: certificates.length, certificates });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

router.get('/', (req, res) => {
    try {
        res.json({ msg: 'Get all certificates', certificates: [] });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        res.json({ msg: 'Get certificate', certificateId: id });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:id/download', (req, res) => {
    try {
        const { id } = req.params;
        res.json({ msg: 'Download certificate', certificateId: id });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;