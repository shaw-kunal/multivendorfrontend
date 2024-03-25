import React, { useEffect, useState } from "react";
import Input from "../Input";
import FormCheckbox from "../FormCheckbox";
import { useDispatch, useSelector } from "react-redux";
import FormSelect from "../FormSelect";
import { Country, State } from "country-state-city";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { removeAllItem } from "../../redux/actions/cart";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector(state => state.cart)
  const [showPayment, setShowPayment] = useState(false);

  const [subtotal, totalPrice, discountPrice, shippingCost] = useOutletContext();
  const [shippingAddress, setShippingAddress] = useState({
    address1: "",
    address2: "",
    zipCode: "",
    country: "",
    state: "",
  });



  const handleAddrChange = (e) => {
    e.preventDefault();
    setShippingAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSavedAddress = (item) => {
    setShippingAddress({
      address1: item.address1 || "",
      address2: item.address2 || "",
      zipCode: item.zipCode || "",
      country: item.country || "",
      state: item.state || "",
    });
  };

  useEffect(() => {
    const field = ["address1", "address2", "zipCode", "country", "state"];

    const allFieldsNotEmpty = field.every(
      (item) => shippingAddress[item] !== ""
    );

    setShowPayment(allFieldsNotEmpty);
  }, [shippingAddress]);


  const checkoutHandler = async (e) => {

    const orderData = {
      cart,
      totalPrice,
      subtotal,
      shippingCost,
      discountPrice,
      shippingAddress,
      user
    }

    try {


      const { data: { key } } = await axios.get(import.meta.env.VITE_PROXY + "/getKey");
      const { data } = await axios.post(import.meta.env.VITE_PROXY + "/order/create-order", orderData, { withCredentials: true })
      const orderIds = data.orderIds;
      const options = {
        key,
        amount: data.order.amount,
        currency: "INR",
        name: "shop name",
        name: "Reluctant Money",
        order_id: data.order.id,
        handler: function (response) {
          axios.post(import.meta.env.VITE_PROXY + "/order/paymentverification", { ...response, "amount": this.amount, orderIds })
            .then((verificationResponse) => {
              console.log(data.order.id);
              navigate("/checkout/success",{state:{orderId:data.order.id,orderData}});
              localStorage.removeItem('cartItems');
              dispatch(removeAllItem());
              toast.success("payment Success")
            })
            .catch((err) => {
              console.log(err)
            })
        },
        theme: {
          color: "#22c55e"
        }
      }


      const razor = new window.Razorpay(options);
      razor.on('payment.failed', function (response) {
        console.log(response)
        toast.error("paymeny failed")
      });
      razor.open();
      e.preventDefault();

    } catch (error) {
      console.log(error)
    }

  }





  return (
    <div className="px-5 mx-5 ">
      <h1 className="font-Poppins text-2xl text-slate-500">Shipping Address</h1>
      <div className="grid grid-cols-1 mt-5 400px:grid-cols-2 gap-y-3 gap-x-2 mb-5">
        <Input label="Full Name" value={user?.name} />
        <Input label="Email" value={user?.email} />
        <Input label="Phone Number" value={user?.phoneNumber} />
        <Input
          label="Zip Code"
          name="zipCode"
          value={shippingAddress.zipCode}
          onChange={handleAddrChange}
        />
        <FormSelect
          label={"Select your country"}
          optionType="name"
          name={"country"}
          id="isoCode"
          onChange={handleAddrChange}
          value={shippingAddress.country}
          data={Country.getAllCountries()}
        />
        <FormSelect
          label={"Select your state"}
          optionType="name"
          id="isoCode"
          name={"state"}
          onChange={handleAddrChange}
          value={shippingAddress.state}
          data={State.getStatesOfCountry(shippingAddress.country)}
        />
        <Input
          label="Address1"
          name="address1"
          value={shippingAddress.address1}
          onChange={handleAddrChange}
        />
        <Input
          label="Address2"
          name="address2"
          value={shippingAddress.address2}
          onChange={handleAddrChange}
        />

        <div>
          <h5 className="text-[18px] cursor-pointer inline-block">
            Choose from Saved Address
          </h5>
          {user &&
            user.addresses.map((item, index) => (
              <div className="w-full flex mt-1">
                <input
                  type="checkbox"
                  className="mr-3"
                  value={item.addressType}
                  onClick={(e) => handleSavedAddress(item)}
                />
                <h2>{item.addressType}</h2>
              </div>
            ))}
        </div>
      </div>

      {showPayment && (
        <div className="my-5 w-full flex justify-end">
          <button onClick={(e)=>checkoutHandler(e)} className="bg-green-500 p-2 font-Poppins text-white rounded-lg px-10 hover:border hover:border-green-500 hover:bg-white hover:text-green-700  ">Proceed to payment</button>
        </div>
      )}
    </div>
  );
};

export default Shipping;
