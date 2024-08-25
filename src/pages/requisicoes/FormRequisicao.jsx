import { useForm } from "react-hook-form";
import { useEffect } from "react";
import InputSalvar from "../../components/InputSalvar";
import TitleListas from "../../components/TitleListas";
import InputDeletar from "../../components/InputDeletar";
import NavComponent from "../../components/NavComponent";
import BlurIn from "../../../@/components/magicui/blur-in";
import ListaRequisicoes from "./ListaRequisicoes";
import { format } from "date-fns";

import {
  alterarRequisicao,
  excluirRequisicao,
  inserirRequisicao,
  obterRequisicao,
} from "../../infra/requisicoes";
import { auth } from "../../infra/firebase";
import GridPatternLinearGradient from "../../components/GridPatternLinearGradient";

export default function FormRequisicao({
  idEmEdicao,
  setidEmEdicao,
  requisicoes,
  setUsuario,
  usuarioId,
  usuario,
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
        const requisicao = await obterRequisicao(idEmEdicao);
      } else {
        reset();
      }
    }
    fetchData();
  }, [idEmEdicao, reset, setValue, isSubmitted]);

  async function submeterDados(dados) {
    const requisicao = {
      ...dados,
      estado: "Aberta",
      dataCriacao: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
      usuarioId,
    };
    console.log(dados);
    if (idEmEdicao) {
      await alterarRequisicao({ ...requisicao, id: idEmEdicao });
      setidEmEdicao("");
    } else {
      let id = await inserirRequisicao(requisicao);
      setidEmEdicao(id);
      if (setidEmEdicao) {
        setTimeout(() => {
          setidEmEdicao("");
        }, 3000);
      }
    }
  }

  async function handleExcluir() {
    await excluirRequisicao(idEmEdicao);
    setidEmEdicao("");
  }

  return (
    <>
      <NavComponent setUsuario={setUsuario} />
      <div className="sm:w-[60%]  w-[95%] my-4 mx-auto">
        <GridPatternLinearGradient />

        <h1 className="text-3xl text-center tracking-tighter font-geist  font-bold text-slate-900 my-8">
          <BlurIn word={"Formulário de Requisições"}></BlurIn>
        </h1>
        <form
          className="flex flex-col border bg-white border-slate-300 rounded p-10 m-0 gap-4 text-white"
          onSubmit={handleSubmit(submeterDados)}
        >
          <div className="flex flex-col gap-0 bg-white">
            <label className="text-slate-900 font-geist">Nome do Produto</label>
            <input
              className="bg-slate-100 rounded py-2 px-4 text-slate-900 "
              size={50}
              {...register("nome", {
                required: "Produto é obrigatório",
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
            <label className="text-slate-900 font-geist">Categoria</label>
            <input
              className="bg-slate-100 rounded py-2 px-4 text-slate-900 "
              size={30}
              {...register("categoria", {
                required: "Categoria é obrigatório",
              })}
            />
          </div>
          <div className="flex gap-2">
            <InputSalvar />
            <InputDeletar handleExcluir={handleExcluir} />
          </div>
        </form>
        <TitleListas title="Lista das requisições cadastrados" />
        <ListaRequisicoes
          requisicoes={requisicoes}
          setidEmEdicao={setidEmEdicao}
          usuarioId={auth.currentUser.uid}
          usuario={usuario}
        />
      </div>
    </>
  );
}
