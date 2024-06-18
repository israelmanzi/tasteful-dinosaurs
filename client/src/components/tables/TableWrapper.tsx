import { getObjValue } from '../../lib/utils';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import EmptyView from '../EmptyView';
import LoadingView from '../LoadingView';
import { Column, CustomTable } from './Table';

function sortData(
  data: any[],
  payload: {
    sortBy: string | null;
    reversed: boolean;
    search?: string;
    dateRange?: [Date | null, Date | null];
  }
) {
  const { sortBy, reversed, search } = payload;

  if (search) {
    data = data.filter((item) => {
      const values = Object.values(item);
      return values.some((value) => {
        return JSON.stringify(value)
          .toLowerCase()
          .includes(search.toLowerCase());
      });
    });
  }

  if (!sortBy) {
    return data;
  }

  return [...data].sort((a, b) => {
    return reversed
      ? String(JSON.stringify(getObjValue(sortBy, b))).localeCompare(
          String(JSON.stringify(getObjValue(sortBy, a)))
        )
      : String(JSON.stringify(getObjValue(sortBy, a))).localeCompare(
          String(JSON.stringify(getObjValue(sortBy, b)))
        );
  });
}

export interface RowContext<T = any> {
  selected: boolean;
  value: string;
  row: T;
  rows: T[];
}

interface TableWrapperProps<T = any> {
  className?: string;
  columns: Column<T>[];
  data: T[];
  title?: string;
  description?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  errorMessage?: string;
  reset?: () => void;
  setData?: React.Dispatch<React.SetStateAction<T[]>>;
  filters?: (
    data: any[],
    sortedData: any[],
    setData?: React.Dispatch<React.SetStateAction<any[]>>,
    reset?: () => void
  ) => React.ReactNode[] | React.ReactNode;
  filterableByDate?: boolean;
  actions?: React.ReactNode;
  error?: boolean;
  loading?: boolean;
  errorFetching?: boolean;
  refresh?: () => void;
}

const TableWrapper = ({
  columns,
  data: originalData,
  className,
  title,
  loadingMessage,
  errorMessage,
  filters,
  actions,
  reset: dataReset,
  loading,
  error,
  errorFetching = false,
}: TableWrapperProps) => {
  const [search, setSearch] = useState<string>('');
  const [selection, setSelection] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<any[]>([]);

  const reset = useCallback(() => {
    setSearch('');
    setSelection([]);
    setSortBy(null);
    setReverseSortDirection(false);
    setPage(1);
    if (dataReset) {
      dataReset();
      setData(originalData);
    }
  }, [originalData, dataReset]);

  useEffect(() => {
    !!originalData && setData(originalData);
  }, [originalData]);

  useEffect(() => {
    setPage(1);
    setSortBy(null);
    setReverseSortDirection(false);
  }, [search]);

  const sortedData = useMemo<any[]>(() => {
    return sortData(data, { sortBy, reversed: reverseSortDirection, search });
  }, [sortBy, reverseSortDirection, data, search]);

  const onSort = (key: string) => {
    if (sortBy === key && reverseSortDirection) {
      setSortBy(null);
      setReverseSortDirection(false);
      return;
    }
    if (sortBy === key) {
      setReverseSortDirection((current) => !current);
    } else {
      setSortBy(key);
      setReverseSortDirection(false);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col flex-wrap lg:flex-row lg:justify-between gap-2 items-center">
        <div className="flex flex-row gap-2 items-center">
          <h1 className="text-2xl font-semibold">{title}</h1>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-2 h-fit">
          {data.length !== 0 && (
            <div className="flex flex-row items-center rounded-md h-full max-h-[40px] bg-color-a4 px-4 lg:py-4 gap-2 border">
              <IoSearchOutline className="stroke-[#5D6E8B]" />
              <input
                type="text"
                placeholder={'Search ...'}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="grow border-none outline-none bg-transparent h-full"
              />
            </div>
          )}
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            {!!filters && filters(originalData, sortedData, setData, reset)}
            {actions && actions}
          </div>
        </div>
      </div>
      {loading ? (
        <LoadingView message={loadingMessage ?? 'Loading data ...'} />
      ) : error ? (
        <EmptyView message={errorMessage ?? 'Error fetching data'} />
      ) : (
        <CustomTable
          errorFetching={errorFetching}
          data={data}
          loading={loading}
          columns={columns}
          className={className}
          selection={selection}
          setSelection={setSelection}
          sortedData={sortedData}
          sortBy={sortBy}
          reverseSortDirection={reverseSortDirection}
          onSort={onSort}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default TableWrapper;
