const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Mock Data Helper
const getData = (filename) => {
    const filePath = path.join(__dirname, 'data', `${filename}.json`);
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// API Routes
app.get('/api/status', (req, res) => {
    res.json({
        online: true,
        version: '1.0.0-nexus',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/gaming/servers', (req, res) => {
    res.json([
        { id: 1, name: 'Frankfurt-01 (EU)', status: 'online', ping: '9ms' },
        { id: 2, name: 'London-Prime', status: 'online', ping: '14ms' },
        { id: 3, name: 'Global Matchmaking', status: 'online', ping: 'Stable' }
    ]);
});

app.get('/api/coding/projects', (req, res) => {
    res.json([
        { id: 1, title: 'FEZOS Kernel', author: 'NexusCore', likes: 124 },
        { id: 2, title: 'Star-Nav Alpha', author: 'StarArchitect', likes: 89 }
    ]);
});

app.get('/api/gaming/news', (req, res) => {
    res.json([
        { id: 1, title: 'Nexus Update 2.4', date: '2026-03-10', excerpt: 'Deep-space rendering engine optimized.' },
        { id: 2, title: 'Tournament Season 5', date: '2026-03-08', excerpt: 'Registration for the Star-Clash is now open.' }
    ]);
});

app.get('/api/gaming/leaderboards', (req, res) => {
    res.json([
        { rank: 1, name: 'NexusPrime', score: 15420, role: 'Vanguard' },
        { rank: 2, name: 'StarGhost', score: 14200, role: 'Scout' },
        { rank: 3, name: 'VoidWalker', score: 13850, role: 'Engineer' }
    ]);
});

app.get('/api/coding/challenges', (req, res) => {
    res.json([
        { id: 1, title: 'Quantum Refactor', difficulty: 'Hard', points: 500, status: 'Active' },
        { id: 2, title: 'Temporal Loop Fix', difficulty: 'Medium', points: 300, status: 'Open' }
    ]);
});

// Fallback to index.html for SPA-like behavior or just redirect to home
app.get('/api/updates', (req, res) => {
    try {
        const filePath = path.join(__dirname, 'data', 'updates.json');
        if (!fs.existsSync(filePath)) {
            return res.json([]);
        }
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        res.json(data);
    } catch(err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/updates', (req, res) => {
    const { password, update } = req.body;
    if (password !== 'nexustest') {
        return res.status(401).json({ success: false, message: 'Invalid password' });
    }
    if (!update || !update.version || !update.date || !update.changes) {
        return res.status(400).json({ success: false, message: 'Invalid update data' });
    }
    
    try {
        const filePath = path.join(__dirname, 'data', 'updates.json');
        let updates = [];
        if (fs.existsSync(filePath)) {
            updates = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
        // Prepend new update to the front
        updates.unshift(update);
        fs.writeFileSync(filePath, JSON.stringify(updates, null, 2), 'utf8');
        res.json({ success: true, message: 'Update added successfully', data: update });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to write data' });
    }
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/Seiten/start_seite/index.html'));
});

app.listen(PORT, () => {
    console.log(`[FEZAcademy] Core active on port ${PORT}`);
});
