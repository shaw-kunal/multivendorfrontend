import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { categoriesData } from '../../../static/data';
import { AiOutlineClose, AiOutlinePlusCircle } from 'react-icons/ai';
import { createEvent, resetEventState } from '../../../redux/actions/event';
import axios from 'axios';

const CreateEvent = () => {
    const { seller } = useSelector((state) => state.seller);
    const { isSuccess, isError } = useSelector((state) => state.event);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [images, setImages] = useState([]);
    const [event, setEvent] = useState({
        name: "",
        description: "",
        category: "",
        tags: "",
        originalPrice: "",
        discountPrice: "",
        stock: "",
        images: [],
        startDate: null,
        endDate: null,
    });



    useEffect(() => {
        return () => {
            dispatch(resetEventState())
        }
    },[])


    const handleSubmit = (e) => {
        e.preventDefault();
        const requiredField = ["name", "category", "originalPrice", "discountPrice", "startDate", "endDate"];
        for (const item of requiredField) {
            if (!event[item]) {
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
              dispatch(createEvent({ ...event,images: uploadedImageNames, shopId: seller._id }, navigate));
            }).catch((err)=>{
              console.log(err)
            })
          } catch (error) {
            console.log(error);
          }
       
    }

    const handleChange = (e) => {
        e.preventDefault();
        setEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleStartDateChange = (e) => {
        const startDate = new Date(e.target.value);
        console.log(startDate)
        setEvent((prev) => ({ ...prev, "startDate": startDate }));
    }

    const handleEndDateChange = (e) => {
        const endDate = new Date(e.target.value)
        setEvent((prev) => ({ ...prev, "endDate": endDate }));
    }
    const minEndDate = event.startDate
        ? new Date(event.startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10)
        : "";


    console.log(event)
    return (
        <div className="bg-white w-[90%] 800px:w-2/3 h-[80vh] rounded p-3 overflow-y-auto ">
            <h5 className="text-lg font-Poppins text-center">Create Events</h5>
            {/* create Event Form */}
            <form onSubmit={handleSubmit}>
                <br />
                <div>
                    <FormInput
                        value={event.name}
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
                        value={event.description}
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
                    />
                    <FormInput
                        type={"text"}
                        name={"tags"}
                        value={event.tags}
                        label={"Tags"}
                        onChange={handleChange}
                        placeholder={"Enter Your Tags"}
                    />
                    <FormInput
                        type={"text"}
                        name={"originalPrice"}
                        value={event.originalPrice}
                        label={"Original Price"}
                        onChange={handleChange}
                        placeholder={"Enter Original Price"}
                    />
                    <FormInput
                        type={"text"}
                        required={true}
                        name={"discountPrice"}
                        value={event.discountPrice}
                        label={"Price(with Discount)"}
                        onChange={handleChange}
                        placeholder={"Enter your product price with discount..."}
                    />
                    <FormInput
                        type={"number"}
                        required={true}
                        name={"stock"}
                        value={event.stock}
                        label={"Product Stock"}
                        onChange={handleChange}
                        placeholder={"Enter your product stock..."}
                    />
                    <DatePicker
                        label={"Event start Date"}
                        name={"startDate"}
                        value={event.startDate}
                        onChange={handleStartDateChange}
                        minDate={new Date().toISOString().slice(0, 10)}
                    />
                    <DatePicker
                        label={"Event End Date"}
                        name={"endDate"}
                        value={event.endDate}
                        onChange={handleEndDateChange}
                        minDate={minEndDate}
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
    )
}




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

const FormSelect = ({ label, name, required, onChange }) => {
    return (
        <div className="flex flex-col gap-2 mb-4">
            <span className="relative w-fit">
                <label className="font-Poppins text-slate-700 ">{label}</label>
                {required && (
                    <span className="absolute -top-1 -right-1 text-red-500">*</span>
                )}
            </span>
            <select
                name={name}
                onChange={onChange}
                className="w-full mt-2 border p-1 font-medium text-slate-600 rounded-sm focus:border-blue-200"
            >
                <option value={"choose a category"} className="text-blue-600">
                    Choose a category
                </option>
                {categoriesData.map((item) => (
                    <option key={item.id} value={item.title}>
                        {item.title}
                    </option>
                ))}
            </select>
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

const DatePicker = ({ label, name, onChange, value, minDate, placeholder }) => {
    return (
        <div>
            <label className="pb-2">
                {label}<span className="text-red-500">*</span>
            </label>
            <input
                type="date"
                name={name}
                value={value ? value.toISOString().slice(0, 10) : ""}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={onChange}
                min={minDate}
                placeholder={placeholder}
            />
        </div>
    )

}

export default CreateEvent