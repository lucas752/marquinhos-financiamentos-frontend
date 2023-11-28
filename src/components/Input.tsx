export default function Input(props: {
  labelText?: string;
  type: string;
  min?: number;
  max?: number;
  placeholder: string;
  onChange: (e: { target: { value: string } }) => void;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor="" className="mb-1">
        {props.labelText}
      </label>
      <input
        type={props.type}
        min={props.min}
        max={props.max}
        placeholder={props.placeholder}
        className="focus:border-[#dc143c] focus:outline-none   border-2 p-2 rounded-3xl w-72"
        onChange={props.onChange}
        required
      />
    </div>
  );
}
