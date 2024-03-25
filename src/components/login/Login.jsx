import { useState } from "react";
import Input from "../../components/Input.jsx";
import Button from "../Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import { toast } from "react-toastify";
import swal from "sweetalert2"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState(null);
  const [pwdErr, setPwdErr] = useState(null);
  const navigate = useNavigate();


  const checkEmail = () => {
    if (email === '') {
      setEmailErr("Email should not be empty")
      return true;
    }
    setEmailErr('')
    return false;
  }
  const checkPassword = () => {
    if (password === '') {
      setPwdErr("Password should not be empty")
      return true;
    }
    setPwdErr('')
    return false
  }

  const resetError = () => {
    setEmailErr('');
    setPwdErr('');
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    resetError();
    const emailErr = checkEmail();
    const passwordErr = checkPassword();

    if (emailErr || passwordErr)
      return;
    console.log(email, password)

    //  axios.defaults.withCredentials = true
    try {
      const res = await axios.post(import.meta.env.VITE_PROXY + "/user/login-user", { email, password }, { withCredentials: true });
console.log(res)
      if(res.data.success)
      {
        swal.fire({
          title: "Login Successfully",
          icon: 'success',
        })
        navigate("/")
      }

    } catch (error) {

      toast.error(error.response?.data?.message)
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold font-Poppins text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="" onSubmit={handleSubmit}>
            <Input
              label={"Email address"}
              type="email"
              name="Email"
              autoComplete="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={checkEmail}
              error={emailErr}

            />
            <Input
              label={"Password"}
              type="password"
              name="Password"
              autoComplete="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isPassword={true}
              visible={visible}
              setVisible={setVisible}
              onBlur={checkPassword}
              error={pwdErr}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="w-4 h-4 focus:ring-blue-400 border-gray-400"
                />
                <label className="ml-3 text-gray-900">Remember me!</label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {/* Forgot Your password? */}
                </a>
              </div>
            </div>

            <Button text={"Submit"} type="submit" />
            <div className="w-full flex items-center justify-center text-sm">
              <h4>Not have any account?</h4>
              <Link
                to={"/sign-up"}
                className="text-blue-500 ml-3 pb-1  hover:underline"
              >
                sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
