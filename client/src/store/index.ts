import { atom } from 'recoil';
import { Book } from '../types';

export const showAddBookState = atom<{
  show: boolean;
  action: 'add';
  product?: Book;
} | null>({
  key: 'ShowAddProduct',
  default: null,
});
