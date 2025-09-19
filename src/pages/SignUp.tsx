'use client';

import { useState } from 'react';
import { useLocation } from 'wouter';
import { registerUser } from '@/api/services';
import { useToast } from '@/hooks/use-toast'; // import toast hook

type FormData = {
  user_name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  phone: string;
  city: string;
  state: string;
  pincode: string;
  email: string;
  password: string;
  age: number;
  status: string;
  role_type: 'user';
  is_active: boolean;
};

export default function SignUp() {
  const [form, setForm] = useState<FormData>({
    user_name: '',
    full_name: '',
    first_name: '',
    last_name: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
    email: '',
    password: '',
    age: 0,
    status: 'active',
    role_type: 'user',
    is_active: true,
  });

  const [step, setStep] = useState(1);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const totalSteps = 4;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value,
    }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerUser(form);
      toast({
        title: 'Registration successful!',
        description: 'Redirecting to sign in...',
        variant: 'default',
      });
      setTimeout(() => navigate('/signin'), 2000);
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error?.response?.data?.message || 'Something went wrong.',
        variant: 'destructive',
      });
    }
  };

  // Dummy Google sign-in handler (replace with real OAuth)
  const handleGoogleSignIn = () => {
    alert('Google Sign-Up clicked! Implement OAuth flow here.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Create Your Account
        </h2>

        {/* Progress Bar */}
        <div className="flex mb-8">
          {[...Array(totalSteps)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 mx-1 rounded-full transition-colors ${
                i + 1 <= step ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1 - Account Info */}
          {step === 1 && (
            <>
              <div>
                <label
                  className="block mb-1 font-medium text-gray-700"
                  htmlFor="user_name"
                >
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  value={form.user_name}
                  onChange={handleChange}
                  required
                  placeholder="Choose a username"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  className="block mb-1 font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  className="block mb-1 font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {/* Step 2 - Personal Info */}
          {step === 2 && (
            <>
              <div>
                <label
                  className="block mb-1 font-medium text-gray-700"
                  htmlFor="full_name"
                >
                  Full Name
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  value={form.full_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block mb-1 font-medium text-gray-700"
                    htmlFor="first_name"
                  >
                    First Name
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={form.first_name}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    className="block mb-1 font-medium text-gray-700"
                    htmlFor="last_name"
                  >
                    Last Name
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={form.last_name}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block mb-1 font-medium text-gray-700"
                  htmlFor="age"
                >
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  min={0}
                  value={form.age}
                  onChange={handleChange}
                  placeholder="30"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  className="block mb-1 font-medium text-gray-700"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 8901"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {/* Step 3 - Address Info */}
          {step === 3 && (
            <>
              <div>
                <label
                  className="block mb-1 font-medium text-gray-700"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="New York"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  className="block mb-1 font-medium text-gray-700"
                  htmlFor="state"
                >
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="NY"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  className="block mb-1 font-medium text-gray-700"
                  htmlFor="pincode"
                >
                  Pincode
                </label>
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="10001"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {/* Step 4 - Confirm */}
          {step === 4 && (
            <div className="text-gray-700 space-y-3">
              <h3 className="text-lg font-semibold mb-4">
                Please confirm your details:
              </h3>

              <ul className="list-disc pl-5">
                <li>
                  <strong>Username:</strong> {form.user_name}
                </li>
                <li>
                  <strong>Email:</strong> {form.email}
                </li>
                <li>
                  <strong>Full Name:</strong>{' '}
                  {form.full_name || `${form.first_name} ${form.last_name}`}
                </li>
                <li>
                  <strong>Age:</strong> {form.age || 'N/A'}
                </li>
                <li>
                  <strong>Phone:</strong> {form.phone || 'N/A'}
                </li>
                <li>
                  <strong>City:</strong> {form.city || 'N/A'}
                </li>
                <li>
                  <strong>State:</strong> {form.state || 'N/A'}
                </li>
                <li>
                  <strong>Pincode:</strong> {form.pincode || 'N/A'}
                </li>
              </ul>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 transition"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Submit
              </button>
            )}
          </div>
        </form>

        {/* OR separator */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500 font-semibold">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Sign Up Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:shadow-md transition"
          aria-label="Sign up with Google"
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M533.5 278.4c0-18.4-1.6-36.1-4.7-53.4H272.1v101.1h146.6c-6.3 34-25.4 62.9-54.3 82.2v68.2h87.9c51.4-47.4 81.2-117.1 81.2-197.9z"
              fill="#4285F4"
            />
            <path
              d="M272.1 544.3c73.6 0 135.5-24.4 180.7-66.4l-87.9-68.2c-24.5 16.4-55.7 26.1-92.8 26.1-71.5 0-132-48.3-153.5-113.4H29.9v70.7c45.5 89.5 139 150.8 242.2 150.8z"
              fill="#34A853"
            />
            <path
              d="M118.6 322.4c-11.7-34.5-11.7-71.8 0-106.3V145.4H29.9c-39 76-39 167.3 0 243.3l88.7-66.3z"
              fill="#FBBC05"
            />
            <path
              d="M272.1 107.7c39.8-.6 77.7 14.1 106.6 40.7l79.9-79.9C404.2 22.7 342.3-1.1 272.1 0 168.9 0 75.5 61.3 29.9 150.8l88.7 70.7c21.5-65 82-113.4 153.5-113.8z"
              fill="#EA4335"
            />
          </svg>
          <span className="font-semibold text-gray-700">
            Sign up with Google
          </span>
        </button>
      </div>
    </div>
  );
}
