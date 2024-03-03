import { useState } from "react";
import Input from "../../components/Input.jsx";
import Button from "../Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import { toast } from "react-toastify";
import swal from "sweetalert2"
import { RxAvatar } from "react-icons/rx";

const ShopCreate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState("");
  const [fetching, setFetching] = useState(false);
  const [emailErr, setEmailErr] = useState(null);
  const [pwdErr, setPwdErr] = useState(null);
  const navigate = useNavigate();
  // for shop 
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState()
  const [address, setAddress] = useState("")
  const [zipcode, setZipcode] = useState()
  const [avatar, setAvatar] = useState()

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
    setEmailErr('')
    setPwdErr('')
    e.preventDefault();

    const pwdErr = checkPassword();
    const emailErr = checkEmail();
    if ( pwdErr || emailErr)
      return;
    const user = {
      name, password, email,address,zipcode,phoneNumber
    }
    console.log(user)

    if (avatar) {   
        setFetching(true)
        const data = new FormData();
      const filename = Date.now() + avatar.name;
      data.append("name", filename);
      data.append("file", avatar);
      try {
        await axios.post(import.meta.env.VITE_IMAGE , data)
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

      const res = await axios.post(import.meta.env.VITE_PROXY + "/shop/create-shop", user)
      swal.fire({
        title: res.data.message,
        icon: 'success',
      })
    } catch (error) {
      console.log(error)
      swal.fire({
        title: error?.response?.message,
        icon: 'error',
        color: "#716add",

      })
    }
    finally{
      setFetching(false)

    }

  }



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold font-Poppins text-gray-900">
          Register  as a  seller
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full max-w-5xl   ">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="grid  grid-cols-2 gap-5" action="" onSubmit={handleSubmit}>
            <Input
              label={"Shop Name"}
              type="name"
              name="name"
              placeholder="Enter Your shop name"
              value={name}
              onChange={(e) => setName(e.target.value)}

            />

            <Input
              label={"Shop Email "}
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
              label={"Phone Number "}
              type="phone"
              name="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />



            <Input
              label={"Address"}
              type="text"
              name="Address"
              placeholder="Enter Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />



            <Input
              label={"ZipCode "}
              type="number"
              name="zipcOde"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
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



            <div className="flex   justify-between ">
              <div className="mt-2 flex items-center justify-center ">
                <label
                  htmlFor="file-input"
                  className="block text-sm font-medium text-gray-700"
                >
                  <span className="inline-flex  h-8 w-8 rounded-full overflow-hidden">
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


            <Button disabled={fetching}  text={"Submit"} type="submit" />
            
          </form>
          <div className="w-full flex items-center mt-4 justify-center text-sm">
              <h4>Already have an account?</h4>
              <Link
                to={"/shop-login"}
                className="text-blue-500 ml-3 pb-1  hover:underline"
              >
                sign in
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
