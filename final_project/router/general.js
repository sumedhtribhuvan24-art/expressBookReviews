const express = require("express");
const public_users = express.Router();
const books = require("./booksdb");

// Register a new user
// Register a new user
public_users.post("/register", (req, res) => {
    const { username, password } = req.body;
    const auth = require("./auth_users.js");

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    if (auth.isValid(username)) {
        return res.status(409).json({
            message: "Username already exists"
        });
    }

    auth.users.push({ username, password });

    return res.status(201).json({
        message: "User successfully registered. Now you can login."
    });
});

// Get all books
public_users.get("/", (req, res) => {
    return res.json(books);
});

// Get book by ISBN
public_users.get("/isbn/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (book) {
        return res.json(book);
    }

    return res.status(404).json({ message: "Book not found" });
});

// Get books by author
public_users.get("/author/:author", (req, res) => {
    const author = req.params.author.toLowerCase();

    const result = Object.values(books).filter(book =>
        book.author &&
        book.author.toLowerCase().includes(author)
    );

    return res.json(result);
});

// Get books by title
public_users.get("/title/:title", (req, res) => {
    const title = req.params.title.toLowerCase();

    const result = Object.values(books).filter(book =>
        book.title &&
        book.title.toLowerCase().includes(title)
    );

    return res.json(result);
});

// Get book reviews
public_users.get("/review/:isbn", (req, res) => {
    const book = books[req.params.isbn];

    if (book) {
        return res.json(book.reviews || {});
    }

    return res.status(404).json({ message: "Book not found" });
});

module.exports = public_users;