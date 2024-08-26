import { Bot, Box, BusFront, Grid } from "lucide-react";
import { DashItem } from "../../components/DashItem";
import NavComponent from "../../components/NavComponent";
import Particles from "../../../@/components/magicui/particles";
import GridPatternLinearGradient from "../../components/GridPatternLinearGradient";

export default function Dashboard({ setUsuario }) {
  return (
    <>
      <NavComponent setUsuario={setUsuario} />
      <div className="flex items-center justify-center flex-col">
        <GridPatternLinearGradient />

        <div className="w-full flex  flex-col items-center border-slate-300 justify-center mx-auto mt-8 gap-4 px-8 sm:px-0">
          <h2 className="text-2xl font-geist font-semibold tracking-tighter text-slate-900">
            Aqui você está em conexão com o Sistema!
          </h2>
          <DashItem />
        </div>
        <div className="border-b border-slate-300 w-full h-[1px] my-8"></div>
        <h2 className="text-3xl font-geist tracking-tighter font-semibold text-slate-900  px-8 sm:px-0">
          Bem vindo ao Sistema de Compras
        </h2>

        <div>
          <div className="flex gap-8 mt-8 md:flex-row flex-col items-center justify-center">
            <div className="h-[200px] relative overflow-hidden w-[80%] md:w-[26.33%] p-8 shadow-lg border border-slate-300 rounded-lg flex flex-col gap-4">
              <GridPatternLinearGradient />
              <Particles
                className="absolute inset-0"
                quantity={20}
                ease={80}
                color="#000000"
                refresh
              />
              <div className="flex">
                <h2 className="text-xl font-semibold  font-geist tracking-tighter">
                  Lorem ispum dolor
                </h2>
                <BusFront className="ml-auto" />
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </p>
            </div>
            <div className="h-[200px] relative overflow-hidden w-[80%] md:w-[26.33%] shadow-lg p-8 border border-slate-300 rounded-lg flex flex-col gap-4">
              <GridPatternLinearGradient />
              <Particles
                className="absolute inset-0"
                quantity={20}
                ease={80}
                color="#000000"
                refresh
              />
              <div className="flex">
                <h2 className="text-xl font-semibold font-geist tracking-tighter">
                  Lorem ispum dolor
                </h2>
                <Box className="ml-auto" />
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </p>
            </div>
            <div className="h-[200px] relative overflow-hidden w-[80%] md:w-[26.33%] shadow-lg p-8 border border-slate-300 rounded-lg flex flex-col gap-4">
              <GridPatternLinearGradient />
              <Particles
                className="absolute inset-0"
                quantity={20}
                ease={80}
                color="#000000"
                refresh
              />
              <div className="flex">
                <h2 className="text-xl font-semibold font-geist tracking-tighter">
                  Lorem ispum dolor
                </h2>
                <Bot className="ml-auto" />
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
