import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "api/session";
import { useContext } from "react";
import { AuthContext } from "context/AuthProvider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "components/input";
import Button from "components/button";
import ErrorParagraph from "components/errorParagraph";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerMutation = useMutation(registerUser, {
    onSuccess: () => {
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response.data, { style: { maxWidth: "100%" } });
    },
  });

  const onSubmit = async (data) => {
    const { email, password, firstName, lastName } = data;
    try {
      const data = await createUser(email, password);
      const { uid } = data.user;
      registerMutation.mutate({ firstName, lastName, _id: uid });
    } catch (error) {
      toast.error("Email already in use", {
        style: { maxWidth: "100%" },
      });
    }
  };
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
              pattern={/[a-zA-Z]{1,}/}
              placeholder="First Name"
              errors={errors}
            />
            {errors.firstName && errors.firstName.type === "required" && (
              <ErrorParagraph>This is field required</ErrorParagraph>
            )}
            {errors.firstName && errors.firstName.type === "pattern" && (
              <ErrorParagraph>Insert a valid first name</ErrorParagraph>
            )}
            <div className="mt-4 mb-4">
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
          </div>
          <div className="mb-3">
            <Input
              label="Last Name:"
              name="lastName"
              register={register}
              required
              pattern={/[a-zA-Z]{1,}/}
              placeholder="Last Name"
              errors={errors}
            />
            {errors.lastName && errors.lastName.type === "required" && (
              <ErrorParagraph>This is field required</ErrorParagraph>
            )}
            {errors.lastName && errors.lastName.type === "pattern" && (
              <ErrorParagraph>Insert a valid last name</ErrorParagraph>
            )}
            <div className="mt-4 mb-4">
              <Input
                label="Password:"
                name="password"
                type="password"
                register={register}
                required
                pattern={/[0-9a-zA-Z]{6,}/}
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
        </div>

        <div className=" flex items-center justify-center pb-2 mt-3">
          <Button
            bg={"mainButtonBg"}
            width={"w-full"}
            radius={"rounded"}
            text={"Sign up"}
            type={"submit"}
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
