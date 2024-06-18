import { PrismaClient } from '@prisma/client';
import IBook, { BookValidator } from '../dtos/book.dto';
import { CustomError } from '../util';

export default class BookService {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient(); // Initialize prisma client for data access/manipulation
  }

  public async registerBook(body: IBook): Promise<IBook> {
    const { isValid, errors } = BookValidator.validate(body); // Validate book data

    if (errors && !isValid) throw CustomError.ValidationError(errors[0]); // Throw validation error

    const book = await this.prismaClient.book.create({
      data: {
        author: body.author,
        name: body.name,
        publicationYear: body.publicationYear,
        publisher: body.publisher,
        subject: body.subject,
      },
    });

    if (!book) throw CustomError.ValidationError('Unable to register book!'); // Throw error if book not created

    return book; // Return created book
  }

  public async getAllBooks(): Promise<IBook[]> {
    const books = await this.prismaClient.book.findMany({}); // Fetch all books

    if (!books || books.length <= 0)
      throw CustomError.NotFoundError('No books found in the database!'); // Throw error if no books found

    return books; // Return all books
  }

  public async getBookById(bookId: string): Promise<IBook> {
    const book = await this.prismaClient.book.findFirst({
      where: { id: bookId },
    });

    if (!book)
      throw CustomError.NotFoundError(`Book with id #${bookId} not found!`); // Throw error if book not found

    return book; // Return found book
  }
}
