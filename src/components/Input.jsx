import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

const Input = ({
  label,
  name="",
  placeholder="",
  type,
  value,
  autoComplete = "email",
  onChange,
  visible = true,
  isPassword = false,
  setVisible,
  error = null,
  onBlur,
  required= false
}) => {


  return (
    <div className="space-y-2 w-full">
      <label className="block text-lg font-medium text-gray-800">{label}</label>
      <div className="mt-1 relative">
        <input
        required={required}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          type={visible ? "text" : "password"}
          onBlur={onBlur}
          className="appearance-none font-Poppins block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg "
        />
        <p className="absolute buttom-0 right-0 font-Poppins text-xs text-red-600">{error}</p>
        <div className="absolute top-2 right-2 cursor-pointer ">
          {isPassword ? (
            visible ? (
              <AiFillEye
                size={30}
                className="text-gray-500"
                onClick={() => setVisible(!visible)}
              />
            ) : (
              <AiFillEyeInvisible
                size={30}
                className="text-gray-600"
                onClick={() => setVisible(!visible)}
              />
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
