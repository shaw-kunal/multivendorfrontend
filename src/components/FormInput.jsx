
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
              className="border font-Poppins font-medium p-1  text-slate-600 rounded-sm focus:border-blue-200 placeholder:font-Poppins"
              placeholder={placeholder}
            />
            : <input
              name={name}
              type={type}
              value={value}
              onChange={onChange}
              className="border font-Poppins px-1 py-2 font-medium  text-slate-600 rounded-md focus:border-blue-200 placeholder:font-Poppins "
              placeholder={placeholder}
            />
        }
      </div>
    );
  };
  

  export default FormInput