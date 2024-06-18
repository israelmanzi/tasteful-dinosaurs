// Retrieves nested value from an object using dot notation key
export const getObjValue = (key: string | number, obj: any) => {
  const keys = key.toString().split('.');
  let result = obj;
  for (const k of keys) {
    if (result && Object.prototype.hasOwnProperty.call(result, k)) {
      result = result[k];
    } else {
      return undefined;
    }
  }
  return result as string;
};

// Sets a cookie with a specified name, value, and expiration in days
export const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

// Retrieves a cookie value by name
export const getCookie = (name: string) => {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return '';
};

// Deletes a cookie by setting its expiration date to the past
export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Combines multiple class names into a single string, filtering out falsy values
export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

// Environment variables
export const ENV = {
  API_URI: 'http://localhost:4000/api/v1',
};
