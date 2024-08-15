import Meteors from "../../../@/components/magicui/meteors";
import { VelocityScroll } from "../../../@/components/magicui/scroll-based-velocity";
import { DashItem } from "../../components/DashItem";
import NavComponent from "../../components/NavComponent";

export default function Dashboard({ setUsuario }) {
  return (
    <>
      <NavComponent setUsuario={setUsuario} />
      <div className="flex items-center justify-center flex-col">
        <div className="w-full flex  flex-col items-center justify-center mx-auto mt-8 gap-4 px-8 sm:px-0">
          <h2 className="text-2xl font-geist font-semibold text-slate-900">
            Aqui você está em conexão com o Sistema!
          </h2>
          <DashItem />
        </div>
        <h2 className="text-3xl font-geist font-semibold text-slate-900 mt-16 px-8 sm:px-0">
          Bem vindo ao Sistema de Compras
        </h2>
        <div className="py-4 relative overflow-hidden w-[100%] rounded sm:w-[100%] z-[-99] border border-slate-300 mt-8">
          <Meteors />
          <VelocityScroll
            text="Sistema de Compras e Cotações / SisComp / "
            default_velocity={5}
            className="font-geist text-center text-sm font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-xl md:leading-[3rem]"
          />
        </div>
      </div>
    </>
  );
}
