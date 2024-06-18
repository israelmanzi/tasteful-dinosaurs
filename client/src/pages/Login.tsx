import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import UserInput from '../components/AuthInput';
import AuthLayout from '../components/layouts/AuthLayout';
import useAuth from '../hooks/useAuth';

export default function Login() {
  const { loggingIn, login } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const handleFormSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      await login(values.email, values.password);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Login failed!',
        color: 'red',
        autoClose: 1500,
      });
    } finally {
      setSubmitting(false);
    }
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
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
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
                      className="w-full bg-slate-800 hover:bg-slate-600 text-white font-semibold rounded-md"
                      loading={isSubmitting || loggingIn}
                    >
                      Sign in
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>

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
      </AuthLayout>
    </>
  );
}
