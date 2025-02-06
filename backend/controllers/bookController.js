const Book = require("../models/Book");
const User = require("../models/User");
const Request = require("../models/Request");

// Add a new book
exports.addBook = async (req, res) => {
  const { title, author, type, serialNo } = req.body;

  try {
    // Check if the book already exists by serial number
    const existingBook = await Book.findOne({ serialNo });
    if (existingBook) {
      return res.status(400).json({ message: "Book with this serial number already exists" });
    }

    // Create a new book
    const newBook = new Book({ title, author, type, serialNo });
    await newBook.save();

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (err) {
    res.status(500).json({ message: "Error adding book", error: err.message });
  }
};

// List all books
exports.listBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books", error: err.message });
  }
};

// Request a book
exports.requestBook = async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user.id; // Extracted from JWT

  try {
    // check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    // check if book available
    if (!book.isAvailable) {
      return res.status(400).json({ message: "Book is not available" });
    }

    // Update book and user
    book.isAvailable = false;
    book.requestedBy = userId;
    await book.save();

    // check if user not found
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ message: "User not found"});
    user.bookRequests.push(bookId);
    await user.save();

    // check if already requested 
    // const existingRequest = await Request.findOne({ book: bookId, user: userId, status: "pending" });
    // if (existingRequest) {
    //   return res.status(400).json({ error: "You have already requested this book" });
    // }

    // // create a new request
    const request = new Request({
      book: bookId,
      user: userId,
      status: "pending", // pending untill approved
    })
    await request.save();

    res.status(200).json({ message: "Book request submitted" });
  } catch (err) {
    console.log("error while requesting book: ", err);
    res.status(500).json({ message: "Error requesting book", error: err.message });
  }
};

// List all book requests
exports.listBookRequests = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    // const books = await Book.find({ requestedBy: { $exists: true } }).populate("requestedBy", "username");
    // res.status(200).json(books);

    const requests = await Request.find({ status: "pending" })
      .populate("book", "title author")
      .populate("user", "username email");

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: "Error fetching book requests", error: err.message });
  }
};

// Issue a book to a user
exports.issueBook = async (req, res) => {
  const { requestId, bookId, userId } = req.body;

  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    // find the book request
    const request = await Request.findById(requestId)
      .populate("book")
      .populate("user");
      
    if (!request) return res.status(404).json({ error: "Request not found" });

    if (request.status !== "pending") {
      return res.status(400).json({ error: "Book request is already processed" });
    }

    
    // Update book availabliliy
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });
    
    book.isAvailable = false;
    book.issuedTo = userId;
    await book.save();
    
    // Mark book as issued
    request.status = "approved";
    await request.save();
    
    // Add the book to the user's issuedBooks array
    const user = await User.findById(userId);
    user.issuedBooks.push(bookId);
    await user.save();

    res.status(200).json({ message: `Book "${request.book.title}" issued to ${request.user.name}` });

    // const book = await Book.findById(bookId);
    // if (!book) {
    //   return res.status(404).json({ message: "Book not found" });
    // }

    // if (book.issuedTo) {
    //   return res.status(400).json({ message: "Book is already issued" });
    // }

    // Update book and user
    // book.issuedTo = userId;
    // book.requestedBy = null;
    // await book.save();

    // const user = await User.findById(userId);
    // user.issuedBooks.push(bookId);
    // user.bookRequests = user.bookRequests.filter((id) => id.toString() !== bookId);
    // await user.save();

    // res.status(200).json({ message: "Book issued successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error issuing book", error: err.message });
  }
};

