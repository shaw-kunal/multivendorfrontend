
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import styles from "../../styles/styles";
import FormInput from "../FormInput";
import FormCheckbox from "../FormCheckbox";
import { categoriesData } from "../../static/data";
import axios from "axios";
import { toast } from "react-toastify";
import DataTable from "../../utils/DataTable.jsx"
import { AiOutlineDelete } from "react-icons/ai";


const Allcoupons = () => {
  const [open, setOpen] = useState(false);
  const [coupons, setCoupons] = useState([])

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const { data } = await axios.get(import.meta.env.VITE_PROXY + "/coupon/get-all-coupons", { withCredentials: true })
        console.log(data)
        setCoupons(data.coupons)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
    }
    fetchCoupons();
  }, [open])
  const handleDelete = async (id) => {
    try {

      const { data } = await axios.delete(import.meta.env.VITE_PROXY + `/coupon/delete-coupon/${id}`, { withCredentials: true })
      if (data.success) {
        toast.success(data.message);
        setCoupons((prev) => prev.filter(item => item._id !== id));
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }


  }

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 80,
      flex: .8,
    },
    {
      field: "price",
      headerName: "Value",
      minWidth: 80,
      flex: .6,
    },
    {
      field: "minAmount",
      headerName: "Min. Purchase Amount",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "maxAmount",
      headerName: "Max. Purchase Amount",
      minWidth: 80,
      flex: 0.2,
    },
    {
      field: "Delete",
      flex: 0.5,
      minWidth: 80,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex justify-center w-full">
            <button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete fill="red" size={20} />
            </button>
          </div>
        );
      },
    },
  ];

  const row = [];

  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
        minAmount: item.minAmount,
        maxAmount: item.maxAmount,
        sold: 10,
      });
    });


  return (
    <div>
      <div>
        <div className="w-full flex justify-end">
          <button className={`${styles.button} text-white font-medium text-lg`}
            onClick={() => setOpen(true)}
          >
            Create Coupon
          </button>
        </div>
        <Modal open={open} setOpen={setOpen}>
          <CreateCoupon />
        </Modal>
      </div>

      <div>
        <DataTable rows={row} columns={columns} />
      </div>
    </div>
  );
};


const CreateCoupon = () => {

  const [coupon, setCoupon] = useState({
    name: "",
    value: "",
    minAmount: "",
    maxAmount: "",
    category: [],
  })

  const handleChange = (e) => {
    setCoupon((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCheckboxChange = (e) => {
    console.log(e.target.value)
    if (e.target.checked) {
      coupon.category.push(e.target.value)
    }
    else {
      const newCategory = coupon.category.filter((item) => item !== e.target.value)
      setCoupon((prev) => ({ ...prev, "category": newCategory }))
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(import.meta.env.VITE_PROXY + `/coupon/create-coupon-code`, coupon, { withCredentials: true });
      console.log(data)
      if (data.success) {
        toast.success("Coupon created successfully")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message + " at coupon ")
    }
  }

  return (
    <div className="p-5 mt-4 1100px:mx-20">
      <h2 className="text-center font-Poppins text-2xl px-2 py-3">Create Coupon</h2>
      <FormInput
        label={"Coupon Name"}
        name={"name"}
        value={coupon.name}
        required={true}
        placeholder={"Enter Coupon name"}
        onChange={handleChange} />

      <FormInput
        label={"Discoun Percentage"}
        name={"value"}
        value={coupon.value}
        required={true}
        placeholder={"Enter Your Coupon Code value"}
        onChange={handleChange} />

      <FormInput
        label={"Min Amount"}
        name={"minAmount"}
        value={coupon.minAmount}
        placeholder={"Enter Coupon code min amount"}
        onChange={handleChange}
      />
      <FormInput
        label={"Max Amount"}
        name={"maxAmount"}
        value={coupon.maxAmount}
        placeholder={"Enter Coupon code Max amount"}
        onChange={handleChange}
      />
      <FormCheckbox option={categoriesData} onChange={handleCheckboxChange} />
      <button onClick={handleSubmit} className={`${styles.button}   w-full text-white font-Poppins text-lg bg-gradient-to-r from-purple-500 to-pink-500`}
      >Create</button>
    </div>
  )
}


export default Allcoupons;
