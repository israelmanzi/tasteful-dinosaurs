/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import useSWR from 'swr';
import axios from '../lib/axios.config';
import { Book } from '../types';
import useAuth from './useAuth';

export default function useBooks() {
  const { user } = useAuth(); // Retrieves user information from useAuth hook

  // Fetches books using SWR, handles loading, error, and data mutation
  const {
    data: books, // Fetched books data
    isLoading, // Loading state
    error, // Error state
    mutate, // Function to mutate data
  } = useSWR<Book[]>('/books', async (url) => {
    if (!user) return; // If user is not authenticated, do not fetch data
    const { data } = await axios.get(url); // Fetch books data from API
    return data.books; // Return fetched books
  });

  // Refresh books data whenever user changes (like login/logout)
  useEffect(() => {
    mutate(); // Trigger data mutation
  }, [user]); // Dependency on user state changes

  return {
    books, // Fetched books array
    isLoading, // Loading state
    error, // Error state
  };
}
