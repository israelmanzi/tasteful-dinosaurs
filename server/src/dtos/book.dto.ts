export default interface IBook {
  name: string;
  author: string;
  publisher: string;
  publicationYear: string;
  subject: string;
}

export class BookValidator {
  static validate(book: IBook): { isValid: boolean; errors?: string[] } {
    const errors: string[] = [];

    if (
      !book.publicationYear.trim() ||
      book.publicationYear.trim().length < 4
    ) {
      errors.push('Publication year should be a valid year format, ex: 2024');
    }

    if (!book.name.trim() || book.name.trim().length < 3) {
      errors.push('Book name must be above 3 characters');
    }

    if (!book.author.trim() || book.author.trim().length < 3) {
      errors.push('Book author must be above 3 characters');
    }

    if (!book.publisher.trim() || book.publisher.trim().length < 3) {
      errors.push('Book publisher must be above 3 characters');
    }

    if (!book.subject.trim() || book.subject.trim().length < 3) {
      errors.push('Book subject must be above 3 characters');
    }

    return {
      isValid: errors.length === 0,
      errors: errors.length === 0 ? undefined : errors,
    };
  }
}
