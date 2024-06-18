import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import UserInput from '../components/AuthInput';
import AuthLayout from '../components/layouts/AuthLayout';
import useAuth from '../hooks/useAuth';

export default function Login() {
  const { loggingIn, login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    const form = e.currentTarget as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    // Validate email and password presence
    if (!email || !password) {
      notifications.show({
        title: 'Error',
        message: 'All fields are required!',
        color: 'red',
        autoClose: 1500,
      });
      return;
    }

    // Call login function from useAuth hook
    login(email, password);
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <AuthLayout>
        <div className="mx-auto w-full max-w-sm lg:w-96 p-6 bg-white rounded-lg shadow-md">
          <div>
            <h2 className="mt-4 text-start text-2xl font-bold leading-9 tracking-tight text-slate-800">
              Sign In
            </h2>
          </div>

          <div className="mt-6">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <UserInput
                  label="Email Address"
                  autoComplete="email"
                  type="email"
                  name="email"
                  className="block w-full p-3 border border-gray-300 rounded-md"
                />

                <UserInput
                  label="Password"
                  autoComplete="current-password"
                  type="password"
                  name="password"
                  className="block w-full p-3 border border-gray-300 rounded-md"
                />

                <div>
                  <Button
                    type="submit"
                    className="w-full py-3 bg-slate-800 hover:bg-slate-600 text-white font-semibold rounded-md"
                    loading={loggingIn}
                  >
                    Sign in
                  </Button>
                </div>
              </form>

              <p className="mt-4 text-sm text-gray-500">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-semibold text-slate-800 hover:text-slate-600"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
