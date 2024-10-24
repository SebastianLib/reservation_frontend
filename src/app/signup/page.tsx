"use client";
import InputBox from "@/components/InputBox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useRef } from "react";
import axios from "axios"; // Import axios

type FormInputs = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  role: string;
  password: string;
};

const SignupPage = () => {
  const register = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signup`, data.current, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("User Registered!");
      console.log({ response: res.data });
    } catch (error: any) {
      if (error.response && error.response.data) {
        // Obsługa błędów z backendu
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Something went wrong!");
      }
      console.error(error);
    }
  };

  const data = useRef<FormInputs>({
    name: "",
    surname: "",
    email: "",
    phone: "",
    role: "USER",
    password: "",
  });

  return (
    <div className="m-2 border rounded overflow-hidden shadow">
      <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600">
        Sign up
      </div>
      <div className="p-2 flex flex-col gap-6">
        <InputBox
          autoComplete="off"
          name="name"
          labelText="Name"
          required
          onChange={(e: any) => (data.current.name = e.target.value)}
        />
        <InputBox
          autoComplete="off"
          name="surname"
          labelText="Surname"
          required
          onChange={(e: any) => (data.current.surname = e.target.value)}
        />
        <InputBox
          name="email"
          labelText="Email"
          required
          onChange={(e: any) => (data.current.email = e.target.value)}
        />
        <InputBox
          name="phone"
          labelText="Phone"
          required
          onChange={(e: any) => (data.current.phone = e.target.value)}
        />
        <InputBox
          name="password"
          labelText="password"
          type="password"
          required
          onChange={(e: any) => (data.current.password = e.target.value)}
        />
        <div className="flex justify-center items-center gap-2">
          <Button onClick={register}>Submit</Button>
          <Link className="" href={"/"}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
