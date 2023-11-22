export default function Button(props: { text: string }) {
  return (
    <button className="w-56 shadow-md hover:shadow-xl rounded-2xl flex flex-col justify-center items-center p-2 gap-5 hover:bg-[#f3bc26] hover:text-white  duration-500 cursor-pointer hover:scale-105">
      {props.text}
    </button>
  );
}
