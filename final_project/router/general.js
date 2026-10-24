const express = require('express');
const axios = require('axios');

const public_users = express.Router();

const BASE_URL = 'http://localhost:5000';

// Get all books
public_users.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving books' });
    }
});

// Get book by ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/isbn/${req.params.isbn}`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving book by ISBN' });
    }
});

// Get books by author
public_users.get('/author/:author', async (req, res) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/author/${encodeURIComponent(req.params.author)}`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving books by author' });
    }
});

// Get books by title
public_users.get('/title/:title', async (req, res) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/title/${encodeURIComponent(req.params.title)}`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving books by title' });
    }
});

module.exports = public_users;