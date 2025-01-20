import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const SignUpForm = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded">
        <h2 className="text-center text-2xl font-bold mb-3">Sign in to your existing account</h2>
        <p className="mb-4 text-center text-sm text-gray-300">
            Or
            <button
              onClick={()=>navigate('/login')}
              className="font-medium text-indigo-500 hover:text-indigo-600">
                Create a new account
            </button>
          </p>
        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={SignUpSchema}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              await authService.register({
                fullname: values.name,
                email: values.email,
                password: values.password,
              });
              navigate('/login');
            } catch (error) {
              setStatus(error.message || 'Sign-up failed. Please try again.');
            }
            setSubmitting(false);
          }}
        >
          {({ errors, touched, status, isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.name && touched.name && <div className="text-red-600 text-xs mt-1">{errors.name}</div>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.email && touched.email && <div className="text-red-600 text-xs mt-1">{errors.email}</div>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.password && touched.password && (
                  <div className="text-red-600 text-xs mt-1">{errors.password}</div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-600 text-xs mt-1">{errors.confirmPassword}</div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign up
              </button>

              {status && <div className="text-red-600 text-sm text-center">{status}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpForm;
