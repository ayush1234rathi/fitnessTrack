import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const LoginForm = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded">
        <h2 className="text-center text-2xl font-bold mb-3">Sign in to your account</h2>
        <p className="mb-4 text-center text-sm text-gray-300">
            Or
            <button
              onClick={()=>navigate('/signup')}
              className="font-medium text-indigo-500 hover:text-indigo-600">
                Create a new account
            </button>
          </p>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              await authService.login(values);
              navigate('/dashboard');
            } catch (error) {
              setStatus(error.message || 'Login failed. Please check your credentials.');
            }
            setSubmitting(false);
          }}
        >
          {({ errors, touched, status, isSubmitting }) => (
            <Form className="space-y-6">
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign in
              </button>

              {status && <div className="text-red-600 text-sm text-center">{status}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
