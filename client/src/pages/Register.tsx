import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import UserInput from '../components/AuthInput';
import AuthLayout from '../components/layouts/AuthLayout';
import useAuth from '../hooks/useAuth';

export default function Register() {
  const { register, registering } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    const form = e.currentTarget as HTMLFormElement;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // Validate password match
    if (password !== confirmPassword) {
      notifications.show({
        title: 'Error',
        message: 'Passwords do not match!',
        color: 'red',
        autoClose: 1500,
      });
      return;
    } else if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      // Validate all required fields
      notifications.show({
        title: 'Error',
        message: 'All fields are required!',
        color: 'red',
        autoClose: 1500,
      });
      return;
    }

    // Call register function from useAuth hook
    register(firstName, lastName, email, password);
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <AuthLayout>
        <div className="mx-auto w-full max-w-lg lg:max-w-xl p-6 bg-white rounded-lg shadow-md">
          <div>
            <h2 className="mt-4 text-2xl text-start font-bold leading-9 tracking-tight text-slate-800">
              Create a free account
            </h2>
          </div>

          <div className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <UserInput
                  label="Email Address"
                  autoComplete="email"
                  type="email"
                  name="email"
                  className="block w-full p-3 border border-gray-300 rounded-md"
                />

                <UserInput
                  label="First Name"
                  type="text"
                  name="firstName"
                  min={2}
                  max={50}
                  className="block w-full p-3 border border-gray-300 rounded-md"
                />

                <UserInput
                  label="Last Name"
                  type="text"
                  name="lastName"
                  min={2}
                  max={50}
                  className="block w-full p-3 border border-gray-300 rounded-md"
                />

                <UserInput
                  label="Password"
                  autoComplete="current-password"
                  type="password"
                  name="password"
                  min={4}
                  max={50}
                  className="block w-full p-3 border border-gray-300 rounded-md"
                />

                <UserInput
                  label="Confirm Password"
                  autoComplete="current-password"
                  type="password"
                  name="confirmPassword"
                  min={4}
                  max={50}
                  className="block w-full p-3 border border-gray-300 rounded-md"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-3 bg-slate-800 hover:bg-slate-600 text-white font-semibold rounded-md"
                loading={registering}
              >
                Create account
              </Button>
            </form>

            <p className="mt-4 text-sm text-gray-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-slate-800 hover:text-slate-600"
              >
                Login to your account
              </Link>
            </p>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
