import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service"; // Import the authService
import AlertMessage from "../AlertMessage";
import Button from "../Button";
import { FaRunning } from "react-icons/fa";

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const SignUpForm = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <FaRunning className="text-4xl text-blue-600 mb-2" />
          <h2 className="text-2xl font-bold mb-3">Sign up for a new account</h2>
          <p className="mb-4 text-center text-sm text-gray-500">
            Or{' '}
            <button
              onClick={() => navigate("/login")}
              className="font-medium text-blue-600 hover:text-blue-500 underline"
            >
              Login if already created
            </button>
          </p>
        </div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              const userData = {
                fullname: values.name,
                email: values.email,
                password: values.password,
              };
              // Send the form data to the backend using authService
              await authService.register(userData);
              // On success, navigate to login page
              navigate("/login");
            } catch (error) {
              setStatus(error.message || "Sign-up failed. Please try again.");
            }
            setSubmitting(false);
          }}
        >
          {({ errors, touched, status, isSubmitting }) => (
            <Form className="space-y-6">
              <AlertMessage type="error" message={status} />
              <div>
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                  Full Name
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-base transition"
                />
                {errors.name && touched.name && (
                  <div className="text-red-600 text-xs mt-1">{errors.name}</div>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                  Email address
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-base transition"
                />
                {errors.email && touched.email && (
                  <div className="text-red-600 text-xs mt-1">{errors.email}</div>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-base transition"
                />
                {errors.password && touched.password && (
                  <div className="text-red-600 text-xs mt-1">{errors.password}</div>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-1">
                  Confirm Password
                </label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-base transition"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-600 text-xs mt-1">{errors.confirmPassword}</div>
                )}
              </div>
              <Button type="submit" loading={isSubmitting} className="w-full mt-2">Sign Up</Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpForm;
