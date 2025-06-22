import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser } = useAuth();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card  bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold">Create an Account!</h1>
        <p className="mb-5">Register with Profast</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label font-bold">Name</label>
            <input
              type="name"
              {...register("name", { required: true })}
              className="input"
              placeholder="Enter your Name"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}
            <label className="label font-bold">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Enter your Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}

            <label className="label font-bold">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input"
              placeholder="Enter Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be 6 characters or longer
              </p>
            )}
            {/* <div className="flex w-full flex-col">
              <div className="card bg-base-300 rounded-box grid h-20 place-items-center">
                content
              </div>
              <div className="divider">OR</div>
              <div className="card bg-base-300 rounded-box grid h-20 place-items-center">
                content
              </div>
            </div> */}

            <button className="btn bg-lime-400 text-black mt-4">
              Register
            </button>
          </fieldset>
          <p>
          Already have an account?{" "}
          <Link to="/login" className="text-lime-400 btn-link">
            Login
          </Link>
        </p>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
