
const FormSelect = ({ label, name, required, onChange, data,value, optionType = "title", id = "id" }) => {
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
        value={value}
        className="w-full mt-2 border p-2 font-medium text-slate-600 rounded-md font-Poppins focus:border-blue-200"
      >
        <option>
          {label}
        </option>
        {data.map((item) => (
          <option key={item[id]} value={item[id]} >
            {item[optionType]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect