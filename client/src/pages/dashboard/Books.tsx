import { Helmet } from 'react-helmet';
import { Column } from '../../components/tables/Table';
import TableWrapper from '../../components/tables/TableWrapper';
import { Book } from '../../types';
import useBooks from '../../hooks/useBooks';

const columns: Column<Book>[] = [
  {
    title: 'ID',
    key: 'id',
    Element: ({ row }) => <p>{row.id}</p>,
  },
  {
    title: 'Name',
    key: 'name',
    Element: ({ row }) => <p>{row.name}</p>,
  },
  {
    title: 'Author',
    key: 'author',
    Element: ({ row }) => <p>{row.author}</p>,
  },
  {
    title: 'Publisher',
    key: 'publisher',
    Element: ({ row }) => <p>{row.publisher}</p>,
  },
  {
    title: 'Year',
    key: 'publicationYear',
    Element: ({ row }) => <p>{row.publicationYear}</p>,
  },
  {
    title: 'Subject',
    key: 'subject',
    Element: ({ row }) => <p>{row.subject}</p>,
  },
  {
    title: 'Registered',
    key: 'createdAt',
    Element: ({ row }) => <p>{new Date(row.createdAt).toLocaleDateString()}</p>,
  },
];

export default function Books() {
  const { isLoading, books, error } = useBooks();
  return (
    <>
      <Helmet>
        <title>Books</title>
      </Helmet>
      <TableWrapper
        columns={columns}
        data={books ?? []}
        loading={isLoading}
        error={error}
        title="Books"
      />
    </>
  );
}
