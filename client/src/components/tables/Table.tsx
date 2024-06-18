import { Pagination, Table } from '@mantine/core';
import EmptyView from '../EmptyView';
import SortableTH from './SortableTH';

export interface RowContext<T = any> {
  selected: boolean;
  value: string;
  row: T;
  rows: T[];
}

export interface Column<T = any> {
  title: string;
  key: string;
  getValue?: (row: T) => string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  Element?: (rowContext: RowContext<T>) => React.ReactNode;
  isFilterableDate?: boolean;
}

interface CustomTableProps {
  className?: string;
  columns: Column[];
  data: any[];
  selection: string[];
  setSelection: React.Dispatch<React.SetStateAction<string[]>>;
  sortedData: any[];
  sortBy: string | null;
  reverseSortDirection: boolean;
  onSort: (sortBy: string) => void;
  pageSize?: number;
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  errorFetching?: boolean;
  loading?: boolean;
  dateRange?: [Date | null, Date | null];
}

export function CustomTable({
  columns,
  data,
  selection,
  sortedData,
  sortBy,
  reverseSortDirection,
  onSort,
  pageSize = 8,
  page = 1,
  setPage = () => {},
  errorFetching = false,
  loading,
}: CustomTableProps) {
  const rows =
    sortedData.length === 0
      ? []
      : sortedData
          ?.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
          .map((item: any, item_index: number) => {
            return (
              <Table.Tr role="data-rows" key={item_index} className={''}>
                {columns.map((column, i: number) => {
                  return (
                    <Table.Td
                      data-test-id={item[column.key]}
                      key={i}
                      align={column.align}
                    >
                      {column.Element ? (
                        <column.Element
                          {...{
                            selected: selection.includes(item.id),
                            row: item,
                            rows: data,
                            value: item[column.key],
                          }}
                        />
                      ) : (
                        String(item[column.key])
                      )}
                    </Table.Td>
                  );
                })}
              </Table.Tr>
            );
          });

  return (
    <div className="overflow-x-auto mt-2 rounded-t-md space-y-4">
      <Table miw={800} verticalSpacing="sm" striped={'even'}>
        <Table.Thead>
          <Table.Tr className=" text-[1rem] bg-slate-100 border ">
            {columns.map((column, i: number) => {
              return (
                <SortableTH
                  className="whitespace-nowrap"
                  key={i}
                  {...(column.sortable && {
                    onSort: onSort.bind(null, column.key),
                    sorted: sortBy === column.key,
                    reversed: reverseSortDirection,
                  })}
                >
                  {column.title}
                </SortableTH>
              );
            })}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.length ? (
            rows
          ) : !loading ? (
            <Table.Tr>
              <Table.Td colSpan={columns.length + 1}>
                No data available
              </Table.Td>
            </Table.Tr>
          ) : null}
        </Table.Tbody>
      </Table>
      <Pagination
        total={Math.ceil(sortedData.length / pageSize)}
        value={page}
        onChange={setPage}
        color="#1e293b"
      />
    </div>
  );
}
