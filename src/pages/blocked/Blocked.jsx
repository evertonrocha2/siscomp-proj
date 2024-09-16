import BlurIn from "../../../@/components/magicui/blur-in";
import { deslogarUsuario } from "../../infra/usuarios";

const Blocked = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div className="bg-white p-4 rounded-lg relative">
        <button
          className="absolute top-4 right-4"
          onClick={() => window.location.href = "/"}
        >
        </button>
        <h1 className="text-3xl text-center tracking-tighter font-geist font-bold text-slate-900 my-2">
          <BlurIn word={"Você não pode acessar esta página."}></BlurIn>
        </h1>
        <p className="text-xl text-center tracking-tighter font-geist font-bold text-slate-900 ">Entre em contato com um administrador para ter sua conta desbloqueada!</p>
      </div>
      <button className="bg-slate-800 text-white py-2 px-6 rounded font-semibold" onClick={deslogarUsuario}>Deslogar</button>
    </div>
  );

}

export default Blocked;