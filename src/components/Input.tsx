export default function Input(props: {
  labelText: string;
  type: string;
  min?: number;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor="" className="mb-1">
        {props.labelText}
      </label>
      <input
        type={props.type}
        min={props.min}
        placeholder={props.placeholder}
        className="focus:border-[#dc143c] focus:outline-none   border-2 p-2 rounded-3xl w-72"
      />
    </div>
  );
}
