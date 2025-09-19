import { useState } from 'react';
import { useLocation } from 'wouter';
import { loginUser } from '@/api/services';
import { useToast } from '@/hooks/use-toast';  // <-- import

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();  // <-- get toast function from hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser(email, password);
      const user = response.data.user;
      console.log('Logged in user:', user);

      toast({
        title: 'Login successful!',
        description: `Welcome back, ${user.name || user.email}!`,
        variant: 'default', // or omit if you want default styling
      });

      setTimeout(() => navigate('/'), 1000);
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Something went wrong.';
      toast({
        title: 'Login failed',
        description: msg,
        variant: 'destructive',  // show as error style toast
      });
    } finally {
      setLoading(false);
    }
  };

  // Dummy Google sign-in handler (replace with real OAuth flow)
  const handleGoogleSignIn = () => {
    alert('Google Sign-In clicked! Implement OAuth flow here.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-indigo-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">
          Welcome Back!
        </h2>

       

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* OR separator */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500 font-semibold">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:shadow-md transition"
          aria-label="Sign in with Google"
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
          <span className="font-semibold text-gray-700">Sign in with Google</span>
        </button>

        <p className="mt-6 text-center text-gray-600">
          Don&apos;t have an account?{' '}
          <a
            href="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
