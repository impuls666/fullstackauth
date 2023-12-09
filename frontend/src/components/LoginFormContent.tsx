interface LoginFormContentProps {
  formData: {
    username: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginFormContent: React.FC<LoginFormContentProps> = ({
  formData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-br">
      <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white border rounded-lg shadow-2xl">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4">Login</h2>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginFormContent;
