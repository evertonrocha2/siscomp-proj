import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../infra/firebase";
import { Link } from "react-router-dom";
import Particles from "../../../@/components/magicui/particles";
import BlurIn from "../../../@/components/magicui/blur-in";
import {
  AnimatedList,
  AnimatedListItem,
} from "../../../@/components/magicui/animated-list";
import Meteors from "../../../@/components/magicui/meteors";
import { BadgePlus, Contact, DollarSign, ShoppingBag, Users } from "lucide-react";
export default function RegisterPage() {
  const [login, setLogin] = useState("");
  const [color, setColor] = useState("#000000");
  const [password, setPassword] = useState("");
  const [blocked, setBlocked] = useState(false);
  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        login,
        password
      );

      const newUser = userCredential.user;
      await setDoc(doc(db, "usuarios", newUser.uid), {
        email: login,
        senha: password,
        isAdmin: false,
        blocked: blocked,
      });

      alert("Usuário registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      alert(error.message);
    }
  };

  return (
    <div className="flex">
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
          Bem vindo! Registre-se para acessar o SisComp!
        </h2>
        <div className="flex flex-col gap-2">
          <label className="text-white font-geist tracking-tighter font-geist-sans ">
            Digite o seu email...
          </label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="border-2 border-[#363636] bg-transparent rounded py-[8px] px-4 focus:outline-none text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white font-geist tracking-tighter font-geist-sans">
            Digite a sua senha...
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="senha"
            className="border-2 border-[#363636] bg-transparent rounded py-[8px] px-4 focus:outline-none text-white"
          />
        </div>

        <button
          onClick={handleRegister}
          className="bg-[#ACFFAF] rounded py-4 w-[70%] mx-auto px-2 font-semibold tracking-tighter hover:bg-[#A2D79A] transition-all  font-geist-sans text-black"
        >
          Entrar
        </button>
        <span className="text-white text-center tracking-tighter font-geist">
          Já tem uma conta?{" "}
          <Link className="hover:text-[#ACFFAF] transition-all" to="/login">
            <strong>Entrar</strong>
          </Link>
        </span>
      </div>
    </div>
  );
}
