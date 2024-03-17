import React, { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Input";
import Button from "../Button";
import axios from 'axios'
import { toast } from "react-toastify";
import swal from "sweetalert2"
import { useSelector } from "react-redux";
import { HomePage } from "../../routes/Routes";





const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [nameError, setNameError] = useState('')
  const [pwdError, setPwdError] = useState('')
  const [emailError, setEmailError] = useState('')

  const navigate = useNavigate();

  const { isAuthenticated } = useSelector(state => state.user)

  const checkUsername = () => {
    if (name === '') {
      setNameError("username should not be empty");
      return true;
    }
    setNameError('')
    return false;
  }

  const checkPassword = () => {
    if (checkPassword === '') {
      setPwdError("Password should not be empty");
      return true;
    }
    if (password.length < 8) {

      setPwdError("The length of error must be atleast 8")
      return true;
    }
    const pattern = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (!pattern.test(password)) {

      setPwdError("Password must contain atleast one uppercase , one Special symbol and one digit");
      return true;
    }
    setPwdError('')
    return false;
  }

  const checkEmail = () => {
    // Define the regex pattern for email validation
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the pattern
    if (!pattern.test(email)) {

      setEmailError("Please enter a valid email address")
      return true;
    }
    setEmailError('')
    return false;

  };


  const handleSubmit = async (e) => {
    setEmailError('')
    setNameError('')
    setPwdError('')
    e.preventDefault();
    const usernameErr = checkUsername();
    const pwdErr = checkPassword();
    const emailErr = checkEmail();
    if (usernameErr || pwdErr || emailErr)
      return;
    const user = {
      name, password, email
    }

    if (avatar) {
      setFetching(true)
      const data = new FormData();
      const filename = Date.now() + avatar.name;
      data.append("name", filename);
      data.append("file", avatar);
      try {
        await axios.post(import.meta.env.VITE_IMAGE, data)
        user.avatar = filename;
      } catch (error) {
        toast.error(error?.response?.error?.message);
      }
      finally {
        setFetching(false);
      }
    }

    try {
      setFetching(true)

      const res = await axios.post(import.meta.env.VITE_PROXY + "/user/create-user", user)
      swal.fire({
        title: res.data.message,
        icon: 'success',
      })
    } catch (error) {
      swal.fire({
        title: error?.response?.data?.message,
        icon: 'error',
        color: "#716add",

      })
    }
    finally {
      setFetching(false)

    }

  }




  if (isAuthenticated === true) {
    return <HomePage />
  }

  return (
    <div className="min-h-screen bg-gray-50  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto max-w-md">
        <h2 className="mt-6 font-Poppins text-center text-3xl font-medium text-gray-900">
          Register as a new user
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form action="" className="space-y-6" onSubmit={handleSubmit}>

            <Input
              label={"Full Name"}
              name={"username"}
              placeholder="Enter Your Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameError}
              onBlur={checkUsername}
            />
            <Input
              label={"Email Address"}
              name={"email"}
              placeholder="Enter Your Esmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              error={emailError}
              onBlur={checkEmail}
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
              error={pwdError}
              onBlur={checkPassword}
            />

            <div className="flex   justify-between ">
              <div className="mt-2 flex items-center justify-center ">
                <label
                  htmlFor="file-input"
                  className="block text-sm font-medium text-gray-700"
                >
                  <span className="inline-flex h-8 w-8 rounded-full overflow-hidden">
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
                type="button"
                className="border  mt-2 py-2 text-sm px-3 rounded-md"
                onClick={(e) => setAvatar(null)}
              >
                Remove it
              </button>
            </div>
            <Button disabled={fetching} text={"submit"}  ></Button>
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
