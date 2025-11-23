require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const linksRouter = require('./routes/links');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// healthcheck
app.get('/healthz', (req, res) => {
    res.json({ ok: true, version: '1.0' });
});

// API routes
app.use('/api/links', linksRouter);

// Redirect route
const Link = require('./models/Link');
app.get('/:code', async (req, res) => {
    try {
        const { code } = req.params;
        if (code === 'api' || code === 'code' || code === 'healthz') {
            return res.status(404).send('Not found');
        }
        const link = await Link.findOne({ code, deleted: { $ne: true } });
        if (!link) return res.status(404).send('Not found');

        // increment clicks and update lastClicked
        link.clicks = (link.clicks || 0) + 1;
        link.lastClicked = new Date();
        await link.save();

        return res.redirect(302, link.targetUrl);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

// Serve frontend static in production (optional)
const buildPath = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(buildPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});


// connect to mongo then start
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}).catch(err => {
    console.error('Mongo connection error:', err);
});
