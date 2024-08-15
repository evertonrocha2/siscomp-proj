export default function InputDeletar({ handleExcluir }) {
  return (
    <input
      className="bg-transparent hover:bg-red-300 transition-all cursor-pointer border-2 border-slate-300 rounded py-2 px-4 text-slate-900 font-geist font-bold w-[50%] mx-auto"
      type="button"
      onClick={handleExcluir}
      value="Excluir"
    />
  );
}
