"use client";
import Link from "next/link";
import { doCredentialLogin } from "../app/actions";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


const LoginForm2 = () => {
  const [showPassword, setShowPassword] = useState("/CloseHoney.png");
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const togglePasswordVisibility = () => {
    setShowPassword(showPassword === "/CloseHoney.png" ? "/OpenHoney.png" : "/CloseHoney.png");
}

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      // Save data to variable
      const formData = new FormData(event.currentTarget);
      // attmept login
      const response = await doCredentialLogin(formData);

      // handle response
      if (response?.error) {
        console.error(response.error);
        setError(response.error.message || "An error occurred");
      } else {
        router.push("/");
      }
    } catch (e: any) {
      console.error(e);
      setError("Check your Credentials");
    }
  }

  return (
    <div className='register-container'>
      <div className="register-form-card"> 
        <h1>Login</h1>
        {error && <div className="text-lg text-red-500">{error}</div>}
        <form
          onSubmit={onSubmit}
          className="register-form"
        >
          {/* Input fields  */}
          <div className="input-group">
            <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
          </div>

          {/* Password container */}
          <div className="input-group password-container">
            <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="textImgDiv">
              <input
                className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                type={showPassword === "/OpenHoney.png" ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                required
              />
              <Image
                src={showPassword}
                className="toggle-password"
                alt="Hide password"
                onClick={togglePasswordVisibility}
                width={25}
                height={25}
              />
            </div>
          </div>

          <button
            type="submit"
            className="register-button"
          >
            Login
          </button>
        </form>

        {/* Link back to signup page */}
        <p className="my-3 text-center">
          Don't have an account?
          <Link href="signup" className="login-link">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm2;
