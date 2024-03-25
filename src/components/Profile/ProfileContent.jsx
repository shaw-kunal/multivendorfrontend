import React, { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Input from "../Input";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import styles from "../../styles/styles.js";
import { Logout } from "@mui/icons-material";
import { deleteUserAddress, updateUser, updateUserAddress } from "../../redux/actions/user.js";
import FormSelect from "../FormSelect.jsx";
import { City, Country, State } from "country-state-city";
import Modal from "../Modal.jsx";
import axios from "axios";
import FormInput from "../FormInput.jsx";
import { toast } from "react-toastify";
import AllOrder from "../AllOrder/AllOrder.jsx";

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [avatar, setAvatar] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      phoneNumber,
    };
    try {
      if (avatar) {
        const data = new FormData();
        const filename = Date.now() + avatar.name;
        data.append("name", filename);
        data.append("file", avatar);
        user.avatar = filename;
        await axios.post(import.meta.env.VITE_IMAGE, data);
      }
      dispatch(updateUser(user));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full ">
      {/* for profile page */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt=""
                  className="w-[150px] h-[150px] rounded-full border-2 border-[#3ad132] object-cover"
                />
              ) : (
                <img
                  src={import.meta.env.VITE_IMAGE + user?.avatar}
                  className="w-[150px] h-[150px] rounded-full border-2 border-[#3ad132]"
                  alt=""
                />
              )}
              <div className="w-8 h-8 bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-1 right-1">
                <label htmlFor="fileupload">
                  <AiOutlineCamera />
                </label>
              </div>
              <input
                id="fileupload"
                type={"file"}
                onChange={(e) => setAvatar(e.target.files[0])}
                className="hidden"
              />{" "}
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5 ">
            <form
              action=""
              className="w-full flex flex-wrap justify-between gap-4 800px:gap-1"
            >
              <div className="w-[80%] mx-auto 800px:w-[45%]   ">
                <Input
                  label={"Full Name"}
                  value={name}
                  required={true}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className=" w-[80%] mx-auto 800px:w-[45%]     ">
                <Input
                  label={"Email"}
                  required={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.email)}
                />
              </div>
              <div className="w-[80%] mx-auto 800px:w-[45%]   ">
                <Input
                  label={"Phone Number"}
                  value={phoneNumber}
                  required={true}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className=" w-[80%] mx-auto 800px:w-[45%] ">
                <input
                  className={` w-full h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer `}
                  value="Update"
                  onClick={handleSubmit}
                />
              </div>
            </form>
          </div>
        </>
      )}
      {/* for order page */}
      {active === 2 && <AllOrder />}
      {/* for  Refund page */}
      {/* {active === 3 && <AllRefundOrders />} */}
      {/* for  Track order page */}
      {/* {active === 5 && <TrackOrder />} */}
      {/* for  Change Password page */}
      {active === 6 && <ChangePassword />}
      {/* for  Address   page */}
      {active === 7 && <Address />}

      {/* for  Logout  page */}
      {active === 8 && <Logout />}
    </div>
  );
};

export default ProfileContent;

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "56463654f5sd4f6fs",
      orderItems: [
        {
          name: "Iphone  xyz",
        },
      ],
      totalPrice: 120,
      orderStatus: "processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      _id: "56463654f5sd4f6fs",
      orderItems: [
        {
          name: "Iphone  xyz",
        },
      ],
      totalPrice: 120,
      orderStatus: "processing",
    },
  ];

  const column = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <TrackChangesIcon size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$" + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={column}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const ChangePassword = () => {
  const initialState = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
  const [credential, setCredential] = useState(initialState)

  const [newPwdErr, setNewPwdErr] = useState('')
  const [confirmPwdErr, setConfirmPwdErr] = useState('')



  const checkPassword = (password) => {
    if (password === '') {
      setNewPwdErr("Password should not be empty");
      return true;
    }
    if (password.length < 8) {
      setNewPwdErr("The length of error must be atleast 8")
      return true;
    }
    const pattern = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (!pattern.test(password)) {

      setNewPwdErr("Password must contain atleast one uppercase , one Special symbol and one digit");
      return true;
    }
    setNewPwdErr('')
    return false;
  }

  const handleChange = (e) => {
    e.preventDefault();
    setCredential((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }


  const checkConfirmPwd = (newPwd, confirmPwd) => {
    if (newPwd !== confirmPwd) {
      setConfirmPwdErr("Password not match")
      return true;
    }
    setConfirmPwdErr('')
    return false;
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkPassword(credential.newPassword) || checkConfirmPwd(credential.newPassword, credential.confirmPassword))
      return;
    try {
      const { data } = await axios.post(import.meta.env.VITE_PROXY + "/user/update-user-password", credential, { withCredentials: true })
      toast.success(data.message);
      setCredential(initialState)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }

  }

  return (
    <div className="w-full px-5">
      <div className="w-full ">
        <h1 className="font-semibold text-gra font-Poppins text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 ">Change Password</h1>
        <div className="flex justify-center w-full mt-9">
          <form onSubmit={handleSubmit} className="w-[90%] 1100px:w-[40%] p-10 border flex flex-col gap-4 rounded-md bg-white">
            <Input
              label={"Old Password"}
              name={"oldPassword"}
              visible={false}
              value={credential.oldPassword}
              onChange={handleChange}

            />
            <Input
              label={"New Password"}
              name={"newPassword"}
              visible={false}
              value={credential.newPassword}
              onChange={handleChange}
              error={newPwdErr}
            />
            <Input
              label={"Confirm Password"}
              name={"confirmPassword"}
              visible={false}
              value={credential.confirmPassword}
              error={confirmPwdErr}
              onChange={handleChange}
            />

            <button className="px-3 mt-4 bg-gradient-to-r from-purple-400 to-pink-400 py-3 text-white font-semibold text-2xl rounded-md"> Update </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoding] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const initialState = {
    country: "IN",
    state: "",
    city: "",
    address1: "",
    address2: "",
    zipCode: "",
    addressType: "",
  };
  const [address, setAddress] = useState(initialState);

  const handleChange = (e) => {
    e.preventDefault();
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addressTypeData = [
    {
      id: 1,
      name: "Default",
    },
    {
      id: 2,
      name: "Home",
    },
    {
      id: 3,
      name: "Office",
    },
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const requiredField = ["addressType"]
    for (let field of requiredField) {
      if (!address[field]) {
        toast.error(`${field} is required field`)
        return;
      }
    }

    dispatch(updateUserAddress(address))
  };

  const handleAddressDelete = (addressId) => {
    dispatch(deleteUserAddress(addressId))
  }

  return (
    <>
      <div className="w-full px-5">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">My Address</h1>
          <div
            className={`${styles.button} !rounded-md`}
            onClick={() => setOpen(true)}
          >
            <span className="text-white">Add Adress</span>
          </div>
        </div>
        <br />
        {user &&
          user.addresses.map((addr) => (
            <div className="w-full flex items-center bg-white h-20 rounded px-3 shadow justify-between pr-10 mb-3">
              <div className="flex item-center">
                <h5 className="pl-5 font-semibold">{addr.addressType}</h5>
              </div>
              <div className="pl-8 flex items-center">
                <h3>
                  {addr.address1}+
                  {addr.address2}
                </h3>
              </div>
              <div className="pl-8 flex items-center">
                <h3>{user.phoneNumber}</h3>
              </div>
              <div>
                <AiOutlineDelete size={25} className="cursor-pointer" fill={"red"} onClick={() => handleAddressDelete(addr._id)} />
              </div>
            </div>
          ))
        }
      </div>
      <Modal open={open} setOpen={setOpen}>
        <div className="overflow-y-auto">
          <form className="m-2  p-3 pt-5 " onSubmit={handleFormSubmit}>
            <FormSelect
              label={"Select your country"}
              optionType="name"
              name={"country"}
              id="isoCode"
              onChange={handleChange}
              data={Country.getAllCountries()}
            />
            <FormSelect
              label={"Select your state"}
              optionType="name"
              id="isoCode"
              name={"state"}
              onChange={handleChange}
              data={State.getStatesOfCountry(address.country)}
            />
            <FormSelect
              label={"Select your City"}
              optionType="name"
              id="isoCode"
              name={"state"}
              onChange={handleChange}
              data={City.getCitiesOfState(address.state)}
            />

            <FormInput
              label={"ZipCode"}
              name={"zipCode"}
              type={"number"}
              value={address.zipCode}
              onChange={handleChange}
            />
            <FormInput
              label={"Address 1"}
              name={"address1"}
              value={address.address1}
              onChange={handleChange}
            />
            <FormInput
              label={"Address 2"}
              name={"address2"}
              value={address.address2}
              onChange={handleChange}
            />
            <FormSelect
              label={"Addres Type"}
              optionType="name"
              id="name"
              name={"addressType"}
              onChange={handleChange}
              data={addressTypeData}
              required={true}
            />
            <button
              className="w-full p-2  bg-gradient-to-r from-purple-500 to-pink-500 rounded-md font-Poppins text-white "
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};
