const Link = require('../models/Link');
const { isValidUrl } = require('../utils/validateUrl');

// code regex per spec
const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

exports.createLink = async (req, res) => {
    const { targetUrl, code } = req.body;

    if (!targetUrl) return res.status(400).json({ error: 'targetUrl is required' });
    if (!isValidUrl(targetUrl)) return res.status(400).json({ error: 'Invalid URL' });

    let theCode = code ? String(code).trim() : null;
    if (theCode) {
        if (!CODE_REGEX.test(theCode)) {
            return res.status(400).json({ error: 'Code must match [A-Za-z0-9]{6,8}' });
        }
    } else {
        // simple random code generator
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        do {
            theCode = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        } while (await Link.findOne({ code: theCode }));
    }

    try {
        const existing = await Link.findOne({ code: theCode });
        if (existing) {
            return res.status(409).json({ error: 'Code already exists' });
        }
        const link = new Link({ code: theCode, targetUrl });
        await link.save();
        res.status(201).json({ code: link.code, targetUrl: link.targetUrl, clicks: link.clicks, lastClicked: link.lastClicked });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.listLinks = async (req, res) => {
    try {
        const links = await Link.find({ deleted: { $ne: true } }).sort({ createdAt: -1 });
        res.json(links.map(l => ({
            code: l.code,
            targetUrl: l.targetUrl,
            clicks: l.clicks,
            lastClicked: l.lastClicked,
            createdAt: l.createdAt
        })));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getLink = async (req, res) => {
    const { code } = req.params;
    try {
        const link = await Link.findOne({ code, deleted: { $ne: true } });
        if (!link) return res.status(404).json({ error: 'Not found' });
        res.json({
            code: link.code,
            targetUrl: link.targetUrl,
            clicks: link.clicks,
            lastClicked: link.lastClicked,
            createdAt: link.createdAt
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteLink = async (req, res) => {
    const { code } = req.params;
    try {
        const link = await Link.findOne({ code, deleted: { $ne: true } });
        if (!link) return res.status(404).json({ error: 'Not found' });
        // soft delete so tests can confirm 404 on redirect
        link.deleted = true;
        await link.save();
        res.json({ ok: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
