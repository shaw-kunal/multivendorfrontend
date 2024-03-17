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
import { Logout, LogoutTwoTone } from "@mui/icons-material";
import { updateUser } from "../../redux/actions/user.js";
import axios from "axios";

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
            phoneNumber
        }
        try {
            if (avatar) {
                const data = new FormData();
                const filename = Date.now() + avatar.name;
                data.append("name", filename);
                data.append('file', avatar);
                user.avatar = filename;
                await axios.post(import.meta.env.VITE_IMAGE, data);
            }
            dispatch(updateUser(user));

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="w-full ">
            {/* for profile page */}
            {active === 1 && (
                <>
                    <div className="flex justify-center w-full">
                        <div className="relative">
                            {
                                avatar ?
                                    <img
                                        src={URL.createObjectURL(avatar)}
                                        alt=""
                                        className="w-[150px] h-[150px] rounded-full border-2 border-[#3ad132] object-cover"
                                    />
                                    : <img
                                        src={import.meta.env.VITE_IMAGE + user?.avatar}
                                        className="w-[150px] h-[150px] rounded-full border-2 border-[#3ad132]"
                                        alt=""
                                    />
                            }
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
            {active === 2 && <AllOrders />}
            {/* for  Refund page */}
            {active === 3 && <AllRefundOrders />}
            {/* for  Track order page */}
            {active === 5 && <TrackOrder />}
            {/* for  Payment method  page */}
            {active === 6 && <PaymentMethod />}

            {/* for  Logout  page */}
            {active === 7 && <Logout />}
        </div>
    );
};

export default ProfileContent;

const AllOrders = () => {
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

    console.log(row);

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

const PaymentMethod = () => {
    return (
        <div className="w-full px-5">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-800">Payment Methods</h1>
                <div className={`${styles.button} !rounded-md`}>
                    <span className="text-white">Add New</span>
                </div>
            </div>
        </div>
    );
};

const Address = () => {
    return (
        <div className="w-full px-5">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-800">My Address</h1>
                <div className={`${styles.button} !rounded-md`}>
                    <span className="text-white">Add Adress</span>
                </div>
            </div>

            <br />
            <div className="w-full flex items-center bg-white h-20 rounded px-3 shadow justify-between pr-10">
                <div className="flex item-center">
                    <h5 className="pl-5 font-semibold">Default</h5>
                </div>
                <div className="pl-8 flex items-center">
                    <h3>494 Edaman passage, New Zoiltown paraugay</h3>
                </div>
                <div className="pl-8 flex items-center">
                    <h3>494 Edaman passage, New Zoiltown paraugay</h3>
                </div>
                <div>
                    <AiOutlineDelete size={25} className="cursor-pointer" />
                </div>
            </div>
        </div>
    );
};
