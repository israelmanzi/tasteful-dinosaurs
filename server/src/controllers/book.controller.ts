import { Request, Response } from 'express';
import BookService from '../service/book.service';
import IBook from '../dtos/book.dto';

const bookService = new BookService();

export default {
  registerBook: async (req: Request, res: Response) => {
    const reqBody: IBook = req.body;

    const book = await bookService.registerBook(reqBody);

    res.status(201).send({
      book,
      message: 'Book registered successfully!',
    });
  },
  getAllBooks: async (req: Request, res: Response) => {
    const books = await bookService.getAllBooks();

    res.status(200).send({
      books,
    });
  },
  getBookById: async (req: Request, res: Response) => {
    const { bookId } = req.params;

    const book = await bookService.getBookById(bookId);

    res.status(200).send({ book });
  },
};
