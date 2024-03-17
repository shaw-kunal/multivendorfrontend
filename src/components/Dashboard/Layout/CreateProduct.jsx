import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../../static/data";
import { AiOutlineClose, AiOutlinePlusCircle } from "react-icons/ai";
import { createProduct } from "../../../redux/actions/product";
import { toast } from "react-toastify";
import axios from "axios";
import FormSelect from "../../FormSelect";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { isSuccess, isError } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
    originalPrice: "",
    discountPrice: "",
    stock: "",
    images: []
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredField = ["name", "category", "originalPrice", "discountPrice"];
    for (const item of requiredField) {
      if (!product[item]) {
        toast(`${item} is a required field`);
        return; // Exit the function if a required field is missing
      }
    }

    try {
      const imgUploadPromises = images.map(async (file) => {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        await axios.post(import.meta.env.VITE_IMAGE, data);
        return filename;
      });

      Promise.all(imgUploadPromises).then((uploadedImageNames) => {
        const updatedProduct = { ...product, images: uploadedImageNames, shopId: seller._id };
        dispatch(createProduct(updatedProduct, navigate));
      }).catch((err)=>{
        console.log(err)
      })
    } catch (error) {
      console.log(error);
    }
  };



  const handleChange = (e) => {
    e.preventDefault();
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  console.log(product)
  return (
    <div className="bg-white w-[90%] 800px:w-1/2 h-[80vh] rounded p-3 overflow-y-auto ">
      <h5 className="text-lg font-Poppins text-center">Create Product</h5>
      {/* create Product Form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <FormInput
            value={product.name}
            label={"Name"}
            type={"text"}
            name={"name"}
            required={true}
            onChange={handleChange}
            placeholder={"Enter Your product Name..."}
          />
          <FormInput
            type={"text"}
            name={"description"}
            value={product.description}
            label={"Description"}
            onChange={handleChange}
            placeholder={" product Description..."}
            textArea={true}
          />
          <FormSelect
            label={"Category"}
            required={true}
            name={"category"}
            onChange={handleChange}
            data={categoriesData}
          />
          <FormInput
            type={"text"}
            name={"tags"}
            value={product.tags}
            label={"Tags"}
            onChange={handleChange}
            placeholder={"Enter Your Tags"}
          />
          <FormInput
            type={"text"}
            name={"originalPrice"}
            value={product.originalPrice}
            label={"Original Price"}
            onChange={handleChange}
            placeholder={"Enter Original Price"}
          />
          <FormInput
            type={"text"}
            required={true}
            name={"discountPrice"}
            value={product.discountPrice}
            label={"Price(with Discount)"}
            onChange={handleChange}
            placeholder={"Enter your product price with discount..."}
          />
          <FormInput
            type={"number"}
            required={true}
            name={"stock"}
            value={product.stock}
            label={"Product Stock"}
            onChange={handleChange}
            placeholder={"Enter your product stock..."}
          />
          <ImgUploader
            label={"Upload Images"}
            images={images}
            setImages={setImages}
          />
        </div>
        <button className="w-full mt-4 border-2 rounded-md font-Poppins py-2  font-medium bg-black text-white cursor-pointer hover:border-black hover:bg-white hover:text-black transition-all ease-in-out  "
          onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

const FormInput = ({
  label,
  name,
  placeholder,
  value,
  type = "text",
  onChange,
  required = false,
  textArea = false
}) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <span className="relative w-fit">
        <label className="font-Poppins text-slate-700 ">{label}</label>
        {required && (
          <span className="absolute -top-1 -right-1 text-red-500">*</span>
        )}
      </span>
      {
        textArea ?
          <textarea
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className="border font-Poppins p-1 font-medium  text-slate-600 rounded-sm focus:border-blue-200 placeholder:font-Poppins"
            placeholder={placeholder}
          />
          : <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className="border font-Poppins p-1 font-medium  text-slate-600 rounded-sm focus:border-blue-200 placeholder:font-Poppins"
            placeholder={placeholder}
          />
      }
    </div>
  );
};

const ImgUploader = ({ label, required = false, images, setImages }) => {


  const handleImageUpload = (e) => {
    setImages((prev) => [...prev, ...e.target.files]);
  }

  const removeImage = (i) => {
    console.log(i)
    setImages(images.filter((item) => item !== i && item))
  }

  return (
    <div className="flex flex-col gap-2 mb-4">
      <span className="relative w-fit flex gap-5">
        <label
          htmlFor="fileupload"
          className=" relative font-Poppins text-slate-700 "
        >
          {label}
          {required && (
            <span className="absolute -top-1 -right-1 text-red-500">*</span>
          )}
        </label>
        <label htmlFor="fileupload">
          <AiOutlinePlusCircle size={"30"} color="#6a6969" />
        </label>
      </span>
      <div>
        <input
          id="fileupload"
          type={"file"}
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
        <div className="flex gap-2 flex-wrap  justify-between">
          {images.map((item) => (
            <div key={item.title} className="w-40 h-40 relative border rounded-md overflow-hidden">
              <img
                className="object-cover w-40 h-40"
                src={URL.createObjectURL(item)}
                alt=""
              />
              <div className="absolute top-1 right-1 " onClick={() => removeImage(item)}>
                <AiOutlineClose
                  color="#3f3e3e"
                  fontSize={"20"}
                  cursor={"pointer"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CreateProduct;
