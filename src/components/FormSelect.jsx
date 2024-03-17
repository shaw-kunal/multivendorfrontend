
const FormSelect = ({ label, name, required, onChange,data }) => {

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
          {data.map((item) => (
            <option key={item.id} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default FormSelect