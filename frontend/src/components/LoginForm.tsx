// src/components/Login.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Alertbox from "./Alertbox";
import LoginFormContent from "./LoginFormcontent";

interface FormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState<string | null>(null); // Track login error

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add logic to handle form submission, e.g., make an API call to your login endpoint
    console.log("Login form submitted:", formData);
    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/dashboard");
      } else {
        const statusCode = response.status;
        if (statusCode === 401) {
          setLoginError("Invalid credentials. Please try again.");
        } else if (statusCode === 403) {
          setLoginError("Access denied. You don't have permission to login.");
        } else {
          setLoginError("Login failed. Please try again later.");
        }
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      setLoginError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <div>{loginError && <Alertbox message={loginError} />}</div>
      <LoginFormContent
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default LoginForm;
