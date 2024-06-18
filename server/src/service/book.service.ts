import { PrismaClient } from '@prisma/client';
import IBook, { BookValidator } from '../dtos/book.dto';
import { CustomError } from '../util';

export default class BookService {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = new PrismaClient();
  }

  public async registerBook(body: IBook): Promise<IBook> {
    const { isValid, errors } = BookValidator.validate(body);

    if (errors && !isValid) throw CustomError.ValidationError(errors[0]);

    const book = await this.prismaClient.book.create({
      data: {
        author: body.author,
        name: body.name,
        publicationYear: body.publicationYear,
        publisher: body.publisher,
        subject: body.subject,
      },
    });

    if (!book) throw CustomError.ValidationError('Unable to register book!');

    return book;
  }

  public async getAllBooks(): Promise<IBook[]> {
    const books = await this.prismaClient.book.findMany({});

    if (!books || books.length <= 0)
      throw CustomError.NotFoundError('No books found in the database!');

    return books;
  }

  public async getBookById(bookId: string): Promise<IBook> {
    const book = await this.prismaClient.book.findFirst({
      where: { id: bookId },
    });

    if (!book)
      throw CustomError.NotFoundError(`Book with id #${bookId} not found!`);

    return book;
  }
}
