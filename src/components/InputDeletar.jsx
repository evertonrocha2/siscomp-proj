export default function InputDeletar({ handleExcluir }) {
  return (
    <input
      className="bg-transparent hover:bg-red-300 hover:text-black transition-all cursor-pointer border-2 border-[#363636] rounded py-2 px-4 text-white font-geist font-bold w-[50%] mx-auto"
      type="button"
      onClick={handleExcluir}
      value="Excluir"
    />
  );
}
