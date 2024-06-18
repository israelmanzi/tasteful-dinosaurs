/* eslint-disable react-hooks/exhaustive-deps */
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';
import axios from '../lib/axios.config';
import { showAddBookState } from '../store';
import { Book } from '../types';
import useAuth from './useAuth';

export default function useBooks() {
  const { user } = useAuth();
  const [creatingBook, setCreatingBook] = useState(false);
  const [, setShowAddOrEdit] = useRecoilState(showAddBookState);

  const {
    data: books,
    isLoading,
    error,
    mutate,
  } = useSWR<Book[]>('/books', async (url) => {
    if (!user) return;
    const { data } = await axios.get(url);
    return data.books;
  });

  useEffect(() => {
    mutate();
  }, [user]);

  const createBook = async (book: Omit<Book, 'id' | 'createdAt'>) => {
    setCreatingBook(true);
    try {
      const { data } = await axios.post('/books/register', book);
      if (data.success) {
        notifications.show({
          title: 'Success',
          message: 'Book created successfully',
          color: 'blue',
          autoClose: 1500,
        });
        mutate([...(books || []), data.book]);
        setShowAddOrEdit(null);
      } else {
        notifications.show({
          title: 'Error',
          message: 'An error occurred',
          color: 'red',
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      notifications.show({
        title: 'Error',
        message: 'An error occurred',
        color: 'red',
        autoClose: 1500,
      });
    } finally {
      setCreatingBook(false);
    }
  };

  return {
    books,
    isLoading,
    error,
    createBook,
    creatingBook,
  };
}
