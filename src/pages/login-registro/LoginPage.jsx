import { Link, Navigate, useNavigate } from "react-router-dom";
import { logarUsuario } from "../../infra/usuarios";
import { useState } from "react";
import {
  AnimatedList,
  AnimatedListItem,
} from "../../../@/components/magicui/animated-list";
import {
  BadgePlus,
  Contact,
  DollarSign,
  ShoppingBag,
  Users,
} from "lucide-react";
import Meteors from "../../../@/components/magicui/meteors";
import BlurIn from "../../../@/components/magicui/blur-in";
import Particles from "../../../@/components/magicui/particles";

export default function LoginPage({ setUsuario }) {
  const navigate = useNavigate();
  const [color, setColor] = useState("#000000");

  async function handleClick(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const loginPromise = new Promise(async (res, rej) => {
      try {
        let usuario = await logarUsuario(email, senha);
        if (usuario.id) {
          setUsuario(usuario);
          navigate("/dashboard");
          res(usuario);
        }
      } catch (error) {
        rej(error);
      }
    });
  }

  return (
    <form className="flex">
      <div className=" relative hidden overflow-hidden   lg:flex w-[70%] gap-12 h-[100vh] items-center justify-center">
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color={color}
          refresh
        />

        <h1 className="text-slate-900 font-geist w-[45%] leading-3	">
          <BlurIn word={"Bem vindo ao Sistema de Compras!"}></BlurIn>
        </h1>

        <AnimatedList>
          <AnimatedListItem>
            <div className="bg-slate-100 overflow-hidden relative w-96 h-16 rounded flex gap-6 items-center px-8">
              <Meteors number={50} color="purple" />
              <h1 className="text-xl font-geist font-semibold">Cotações</h1>
              <DollarSign className="ml-auto" />
            </div>
          </AnimatedListItem>
          <AnimatedListItem>
            <div className="bg-slate-100 overflow-hidden relative w-96 h-16 rounded flex gap-6 items-center px-8">
              <Meteors number={50} color="purple" />
              <h1 className="text-xl font-geist font-semibold">Fornecedores</h1>
              <Users className="ml-auto" />
            </div>
          </AnimatedListItem>
          <AnimatedListItem>
            <div className="bg-slate-100 overflow-hidden relative w-96 h-16 rounded flex gap-6 items-center px-8">
              <Meteors number={50} color="purple" />
              <h1 className="text-xl font-geist font-semibold">Contatos</h1>
              <Contact className="ml-auto" />
            </div>
          </AnimatedListItem>
          <AnimatedListItem>
            <div className="bg-slate-100 overflow-hidden relative w-96 h-16 rounded flex gap-6 items-center px-8">
              <Meteors number={50} color="purple" />
              <h1 className="text-xl font-geist font-semibold">Produtos</h1>
              <ShoppingBag className="ml-auto" />
            </div>
          </AnimatedListItem>
          <AnimatedListItem>
            <div className="bg-slate-100 overflow-hidden relative w-96 h-16 rounded flex gap-6 items-center px-8">
              <Meteors number={50} color="purple" />
              <h1 className="text-xl font-geist font-semibold">Requisições</h1>
              <BadgePlus className="ml-auto" />
            </div>
          </AnimatedListItem>
        </AnimatedList>
      </div>
      <div className="lg:w-[30%] w-[100%] bg-[#0C0C13] h-[100vh] p-8 justify-center flex flex-col gap-8">
        <h2 className="tracking-tighter font-geist font-semibold text-white text-3xl w-[80%] mx-auto text-center">
          Bem vindo! Entre para acessar o SisComp!
        </h2>
        <div className="flex flex-col gap-2">
          <label className="text-white font-geist tracking-tighter font-geist-sans ">
            Digite o seu email...
          </label>
          <input
            id="email"
            className="border-2 border-[#363636] bg-transparent rounded py-[8px] px-4 focus:outline-none text-white"
            type="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white font-geist tracking-tighter font-geist-sans">
            Digite a sua senha...
          </label>
          <input
            id="senha"
            className="border-2 border-[#363636] bg-transparent rounded py-[8px] px-4 focus:outline-none text-white"
            type="password"
          />
        </div>
        <button
          onClick={handleClick}
          className="bg-[#ACFFAF] rounded py-4 w-[70%] mx-auto px-2 font-semibold tracking-tighter hover:bg-[#A2D79A] transition-all  font-geist-sans text-black"
        >
          Entrar
        </button>
        <span className="text-white text-center tracking-tighter font-geist">
          Ainda não tem uma conta?{" "}
          <Link className="hover:text-[#ACFFAF] transition-all" to="/register">
            <strong>Registrar</strong>
          </Link>
        </span>
      </div>
    </form>
  );
}
