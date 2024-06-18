import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@mantine/core';
import useAuth from '../hooks/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Library Management System
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            {user
              ? `Welcome back ${user.lastName} ${user.firstName}`
              : ' To access our book collection you must login or create a new account!'}
          </p>
          {user ? (
            <Link to={'/dashboard'}>
              <Button className="mt-6 bg-slate-800 hover:bg-slate-600">
                Checkout our book collection
              </Button>
            </Link>
          ) : (
            <div className="mt-6 flex items-center justify-center gap-x-6">
              <Link to={'/login'}>
                <Button className="min-w-36 bg-slate-800 hover:bg-slate-600">
                  Login
                </Button>
              </Link>
              {'or'}
              <Link to={'/register'}>
                <Button className="bg-slate-800 hover:bg-slate-600">
                  Create an account
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
