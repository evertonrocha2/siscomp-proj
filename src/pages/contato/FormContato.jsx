import { useForm } from "react-hook-form";
import { emailRegex, numericRegex } from "../../Regex";
import {
  alterarContato,
  excluirContato,
  inserirContato,
  obterContato,
} from "../../infra/contatos";
import { useEffect, useState } from "react";
import ListaContatos from "./ListaContatos";
import InputSalvar from "../../components/InputSalvar";
import InputDeletar from "../../components/InputDeletar";
import TitleListas from "../../components/TitleListas";
import NavComponent from "../../components/NavComponent";
import BlurIn from "../../../@/components/magicui/blur-in";

export default function FormContato({
  contatos,
  idEmEdicao,
  setidEmEdicao,
  setUsuario,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    async function fetchData() {
      if (idEmEdicao && !isSubmitted) {
        const contato = await obterContato(idEmEdicao);
        setValue("nome", contato.nome);
        setValue("email", contato.email);
        setValue("fone", contato.fone);
      } else {
        reset();
      }
    }
    fetchData();
  }, [idEmEdicao, reset, setValue, isSubmitted]);

  async function submeterDados(dados) {
    console.log(dados);
    if (idEmEdicao) {
      await alterarContato({ ...dados, id: idEmEdicao });
      setidEmEdicao("");
    } else {
      let id = await inserirContato(dados);
      setidEmEdicao(id);
      if (setidEmEdicao) {
        setTimeout(() => {
          setidEmEdicao("");
        }, 3000);
      }
    }
    reset();
  }

  async function handleExcluir() {
    await excluirContato(idEmEdicao);
    setidEmEdicao("");
    reset();
  }

  return (
    <>
      <NavComponent setUsuario={setUsuario} />
      <div className="sm:w-[60%] w-[95%] my-4 mx-auto">
        <h1 className="text-3xl text-center tracking-tighter font-geist  font-bold text-slate-900 my-8">
          <BlurIn word={"Formulário de Contatos"}></BlurIn>
        </h1>
        <form
          className="flex flex-col border border-slate-300 rounded p-10 m-0 gap-4 text-white"
          onSubmit={handleSubmit(submeterDados)}
        >
          <div className="flex flex-col gap-0">
            <label className="text-slate-900 font-geist">Nome</label>
            <input
              className="bg-slate-100 rounded py-2 px-4 text-slate-900 "
              size={50}
              {...register("nome", {
                required: "Nome é obrigatório",
                validate: {
                  minLength: (value) =>
                    value.length >= 5 ||
                    "Nome deve ter pelo menos 5 caracteres",
                  maxLength: (value) =>
                    value.length <= 50 || "Nome só pode ter até 50 caracteres",
                },
              })}
            />
          </div>
          <div className="flex flex-col gap-0">
            <label className="text-slate-900 font-geist">E-mail</label>
            <input
              className="bg-slate-100 rounded py-2 px-4 text-slate-900 "
              size={30}
              {...register("email", {
                required: "Email é obrigatório",
                validate: {
                  minLength: (value) =>
                    value.length >= 5 ||
                    "E-mail deve ter pelo menos 5 caracteres",
                  maxLength: (value) =>
                    value.length <= 30 ||
                    "E-mail só pode ter até 30 caracteres",
                  matchPattern: (value) =>
                    emailRegex.test(value) || "Email inválido",
                },
              })}
            />
          </div>
          <div className="flex flex-col gap-0">
            <label className="text-slate-900 font-geist">Telefone</label>
            <input
              className="bg-slate-100 rounded py-2 px-4 text-slate-900 "
              size={14}
              {...register("fone", {
                required: "Telefone é obrigatório",
                validate: {
                  minLength: (value) =>
                    value.length >= 8 ||
                    "Telefone deve ter pelo menos 8 caracteres",
                  matchPattern: (value) =>
                    numericRegex.test(value) || "Telefone deve ser númerico",
                },
              })}
            />
          </div>
          <div className="flex gap-2">
            <InputSalvar />
            <InputDeletar handleExcluir={handleExcluir} />
          </div>
        </form>
        <TitleListas title="Lista dos contatos cadastrados" />
        <ListaContatos contatos={contatos} setidEmEdicao={setidEmEdicao} />
      </div>
    </>
  );
}
