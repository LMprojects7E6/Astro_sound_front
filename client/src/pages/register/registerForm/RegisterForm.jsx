import React from 'react'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logIn } from "api/session";

import { useForm } from "react-hook-form";

import Input from "components/input";
import Button from "components/button";
import ErrorParagraph from "components/errorParagraph";

const RegisterForm = () => {

    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userLogIn = useMutation(logIn, {
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err.response.data.errorMsg);
    },
  });

  const onSubmit = (data) => userLogIn.mutate(data);
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-4">
          <div>
          <Input
              label="First Name:"
              name="firstName"
              register={register}
              required
              pattern={/[a-zA-Z]{3,}/g}
              placeholder="First Name"
              errors={errors}
            />
            {errors.firstName && errors.firstName.type === "required" && (
              <ErrorParagraph>This is field required</ErrorParagraph>
            )}
            {errors.firstName && errors.firstName.type === "pattern" && (
              <ErrorParagraph>Insert a valid first name</ErrorParagraph>
            )}
            <Input
              label="Email:"
              name="email"
              register={register}
              required
              pattern={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g}
              placeholder="Enter your email"
              errors={errors}
            />
            {errors.email && errors.email.type === "required" && (
              <ErrorParagraph>This is field required</ErrorParagraph>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <ErrorParagraph>Insert a valid email</ErrorParagraph>
            )}

            
          </div>
          <div className="mb-3">
          <Input
              label="Last Name:"
              name="lastName"
              register={register}
              required
              pattern={/[a-zA-Z]{3,}/g}
              placeholder="Last Name"
              errors={errors}
            />
            {errors.lastName && errors.lastName.type === "required" && (
              <ErrorParagraph>This is field required</ErrorParagraph>
            )}
            {errors.lastName && errors.lastName.type === "pattern" && (
              <ErrorParagraph>Insert a valid last name</ErrorParagraph>
            )}
            <Input
              label="Password:"
              name="password"
              type="password"
              register={register}
              required
              pattern={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/g}
              placeholder={"*************"}
            />
            {errors.password && errors.password.type === "required" && (
              <ErrorParagraph>This is field required</ErrorParagraph>
            )}
            {errors.password && errors.password.type === "pattern" && (
              <ErrorParagraph>Min 6 characters</ErrorParagraph>
            )}
            
          </div>
        </div>

        <div className=" flex items-center justify-center pb-2 mt-3">
          <Button
            bg={"mainButtonBg"}
            width={"w-full"}
            radius={"rounded"}
            text={"Sign in"}
            type={"submit"}
          />
        </div>
      </form>
    </div>
  );
}

export default RegisterForm