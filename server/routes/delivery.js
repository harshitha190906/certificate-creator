const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER || 'your_email@gmail.com',
        pass: process.env.SMTP_PASS || 'your_app_password'
    }
});

router.post('/email', async (req, res) => {
    try {
        const { participants, certificateIds } = req.body;
        if (!participants || participants.length === 0) {
            return res.status(400).json({ error: 'Participants are required' });
        }

        const emailsSent = [];
        for (const participant of participants) {
            const mailOptions = {
                from: process.env.SMTP_FROM || 'noreply@certificatecreator.com',
                to: participant.email,
                subject: 'Your Certificate',
                html: `<h1>Hello ${participant.name},</h1><p>Congratulations! Your certificate has been generated and is attached below.</p><p>Thank you for your participation!</p><p>Best regards,<br/>Certificate Creator Team</p>`
            };
            try {
                await transporter.sendMail(mailOptions);
                emailsSent.push({ email: participant.email, status: 'sent' });
            } catch (emailErr) {
                emailsSent.push({ email: participant.email, status: 'failed', error: emailErr.message });
            }
        }

        res.json({ msg: 'Email delivery process completed', results: emailsSent });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

router.post('/download-zip', (req, res) => {
    try {
        const { certificates } = req.body;
        if (!certificates || certificates.length === 0) {
            return res.status(400).json({ error: 'No certificates provided' });
        }
        res.json({ msg: 'ZIP download initiated', certificateCount: certificates.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

module.exports = router;