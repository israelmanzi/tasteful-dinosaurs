import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import UserInput from '../components/AuthInput';
import AuthLayout from '../components/layouts/AuthLayout';
import useAuth from '../hooks/useAuth';

export default function Register() {
  const { register, registering } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    firstName: Yup.string()
      .min(2, 'First name must be at least 2 characters')
      .required('First name is required'),
    lastName: Yup.string()
      .min(2, 'Last name must be at least 2 characters')
      .required('Last name is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one number'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const handleFormSubmit = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      await register(
        values.firstName,
        values.lastName,
        values.email,
        values.password
      );
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Registration failed!',
        color: 'red',
        autoClose: 1500,
      });
    }
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
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              <Form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <UserInput
                    label="First Name"
                    type="text"
                    name="firstName"
                    className="block w-full p-3 border border-gray-300 rounded-md"
                  />
                  <UserInput
                    label="Last Name"
                    type="text"
                    name="lastName"
                    className="block w-full p-3 border border-gray-300 rounded-md"
                  />
                  <UserInput
                    label="Email Address"
                    type="email"
                    name="email"
                    className="block w-full p-3 border border-gray-300 rounded-md"
                  />
                  <UserInput
                    label="Password"
                    type="password"
                    name="password"
                    className="block w-full p-3 border border-gray-300 rounded-md"
                  />
                  <UserInput
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    className="block w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-slate-800 hover:bg-slate-600 text-white font-semibold rounded-md"
                  loading={registering}
                >
                  Create account
                </Button>
              </Form>
            </Formik>

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
