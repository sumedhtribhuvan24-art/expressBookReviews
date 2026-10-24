```javascript
const express = require('express');
const axios = require('axios');

const public_users = express.Router();

// Get all books
public_users.get('/', async (req, res) => {
    try {
        const books = require('./booksdb');
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving books' });
    }
});

// Get book by ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    try {
        const books = require('./booksdb');
        const book = books[req.params.isbn];

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving book by ISBN' });
    }
});

// Get books by author
public_users.get('/author/:author', async (req, res) => {
    try {
        const books = require('./booksdb');
        const author = req.params.author.toLowerCase();

        const result = Object.values(books).filter(book =>
            book.author.toLowerCase().includes(author)
        );

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving books by author' });
    }
});

// Get books by title
public_users.get('/title/:title', async (req, res) => {
    try {
        const books = require('./booksdb');
        const title = req.params.title.toLowerCase();

        const result = Object.values(books).filter(book =>
            book.title.toLowerCase().includes(title)
        );

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving books by title' });
    }
});

// Demonstrate Axios usage
public_users.get('/axios-test', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Axios request failed' });
    }
});

module.exports = public_users;
```
