import React, { useState } from "react";
import Input from "../Input";
import { RxAvatar } from "react-icons/rx";
import Button from "../Button";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  // const hand

  console.log(avatar);

  return (
    <div className="min-h-screen bg-gray-50  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto max-w-md">
        <h2 className="mt-6 font-Poppins text-center text-3xl font-medium text-gray-900">
          Register as a new user
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form action="" className="space-y-6">
            <Input
              label={"Full Name"}
              name={"username"}
              placeholder="Enter Your Name"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label={"Email Address"}
              name={"email"}
              placeholder="Enter Your Esmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              label={"PassWord"}
              name={"password"}
              placeholder="Password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isPassword={true}
              visible={visible}
              setVisible={setVisible}
            />

            <div className="flex   justify-between ">
              <div className="mt-2 flex items-center justify-center ">
                <label
                  htmlFor="file-input"
                  className="block text-sm font-medium text-gray-700"
                >
                  <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                    {avatar ? (
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="avatar"
                        className="object-cover"
                      />
                    ) : (
                      <RxAvatar className="h-8 w-8  text-gray-600" />
                    )}
                  </span>
                </label>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white"
                >
                  Upload a file
                </label>
                <input
                  style={{ display: "none" }}
                  type="file"
                  name="avatar"
                  id="file-input"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </div>
              <button
                className="border  mt-2 py-2 text-sm px-3 rounded-md"
                onClick={(e) => setAvatar(null)}
              >
                Remove it
              </button>
            </div>
            <Button text={"submit"}></Button>

            <div className="text-sm text-gray-700">
              <span>Already Have an account?</span>
              <Link className="ml-2 text-blue-500 hover:underline " to="/login">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
