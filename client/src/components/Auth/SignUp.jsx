import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service"; // Import the authService
import AlertMessage from "../AlertMessage";
import Button from "../Button";
import { FaRunning } from "react-icons/fa";
import side1 from '../../assets/side1.jpg';

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
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-background">
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-0">
        <img src={side1} alt="Sign Up" className="rounded-2xl object-cover w-full max-w-xs md:max-w-md max-h-[350px] md:max-h-[500px] shadow-xl" />
      </div>
      <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl p-6 md:p-10 border-2 border-primary flex flex-col justify-center">
        <div className="flex flex-col items-center mb-8">
          <FaRunning className="text-5xl text-primary mb-3" />
          <h2 className="text-2xl font-display font-bold mb-3 text-accent tracking-widest uppercase">Sign up for a new account</h2>
          <p className="mb-4 text-center text-sm text-secondary">
            Or{' '}
            <button
              onClick={() => navigate("/login")}
              className="font-medium text-primary hover:text-accent underline"
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
                <label htmlFor="name" className="block text-secondary font-semibold mb-1">
                  Full Name
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full p-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-accent font-sans text-base bg-background text-text placeholder:text-accent transition"
                />
                {errors.name && touched.name && (
                  <div className="text-primary text-xs mt-1">{errors.name}</div>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-secondary font-semibold mb-1">
                  Email address
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full p-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-accent font-sans text-base bg-background text-text placeholder:text-accent transition"
                />
                {errors.email && touched.email && (
                  <div className="text-primary text-xs mt-1">{errors.email}</div>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-secondary font-semibold mb-1">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full p-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-accent font-sans text-base bg-background text-text placeholder:text-accent transition"
                />
                {errors.password && touched.password && (
                  <div className="text-primary text-xs mt-1">{errors.password}</div>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-secondary font-semibold mb-1">
                  Confirm Password
                </label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full p-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-accent font-sans text-base bg-background text-text placeholder:text-accent transition"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-primary text-xs mt-1">{errors.confirmPassword}</div>
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
