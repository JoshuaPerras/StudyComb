"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from 'next/link';


const SignupForm = () => {
  const [showPassword, setShowPassword] = useState("/CloseHoney.png");
  const router = useRouter();
  const togglePasswordVisibility = () => {
    setShowPassword(showPassword === "/CloseHoney.png" ? "/OpenHoney.png" : "/CloseHoney.png");
}

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const username = formData.get("username") as string | null;
      const email = formData.get("email") as string | null;
      const password = formData.get("password") as string | null;

      if (!username || !email || !password) {
        throw new Error("All fields are required.");
      }

      const response = await fetch(`/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.status === 201) {
        router.push("/login");
      } else {
        console.log(`Failed to register: ${response.statusText}`);
      }
    } catch (e: any) {
      console.log(e.message || "An error occurred during registration.");
    }
  }

  return (
    <>
      <div className='register-container'>
        <div className="register-form-card">
          <h2>Join Us!</h2>
          <h3>Create your account</h3>
          <form
            onSubmit={handleSubmit}
            className="register-form"
          >
            <div className="input-group">
              <label htmlFor="username" className="mb-1 text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                required
              />
            </div>

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
              Signup
            </button>
          </form>
          <p className="my-3 text-center">
            Already have an account?
            <Link href="/login" className="login-link">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
