import { Request, Response } from 'express';
import BookService from '../service/book.service';
import IBook from '../dtos/book.dto';

const bookService = new BookService();

export default {
  registerBook: async (req: Request, res: Response) => {
    const reqBody: IBook = req.body;

    // Register a new book
    const book = await bookService.registerBook(reqBody);

    // Send response with registered book details
    res.status(201).send({
      book,
      message: 'Book registered successfully!',
    });
  },

  getAllBooks: async (req: Request, res: Response) => {
    // Fetch all books
    const books = await bookService.getAllBooks();

    // Send response with all books
    res.status(200).send({
      books,
    });
  },

  getBookById: async (req: Request, res: Response) => {
    const { bookId } = req.params;

    // Fetch book by ID
    const book = await bookService.getBookById(bookId);

    // Send response with fetched book details
    res.status(200).send({ book });
  },
};
