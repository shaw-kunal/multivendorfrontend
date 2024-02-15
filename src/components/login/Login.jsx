import { useState } from "react";
import Input from "../../components/Input.jsx";
import Button from "../Button.jsx";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold font-Poppins text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="">
            <Input
              label={"Email address"}
              type="email"
              name="Email"
              autoComplete="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                  Forgot Your password?
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
