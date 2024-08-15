import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  alterarProduto,
  excluirProduto,
  inserirProduto,
  obterProduto,
} from "../../infra/produtos";
import ListaProdutos from "./ListaProdutos";
import InputSalvar from "../../components/InputSalvar";
import TitleListas from "../../components/TitleListas";
import InputDeletar from "../../components/InputDeletar";
import NavComponent from "../../components/NavComponent";
import BlurIn from "../../../@/components/magicui/blur-in";

export default function FormProduto({
  idEmEdicao,
  setidEmEdicao,
  produtos,
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
        const produto = await obterProduto(idEmEdicao);
        setValue("nome", produto.nome);
        setValue("categoria", produto.categoria);
        setValue("descricao", produto.descricao);
      } else {
        reset();
      }
    }
    fetchData();
  }, [idEmEdicao, reset, setValue, isSubmitted]);

  async function submeterDados(dados) {
    console.log(dados);
    if (idEmEdicao) {
      await alterarProduto({ ...dados, id: idEmEdicao });
      setidEmEdicao("");
    } else {
      let id = await inserirProduto(dados);
      setidEmEdicao(id);
      if (setidEmEdicao) {
        setTimeout(() => {
          setidEmEdicao("");
        }, 3000);
      }
    }
  }

  async function handleExcluir() {
    await excluirProduto(idEmEdicao);
    setidEmEdicao("");
  }

  return (
    <>
      <NavComponent setUsuario={setUsuario} />
      <div className="sm:w-[60%] w-[95%] my-4 mx-auto">
        <h1 className="text-3xl text-center tracking-tighter font-geist  font-bold text-slate-900 my-8">
          <BlurIn word={"Formulário de Produtos"}></BlurIn>
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
            <label className="text-slate-900 font-geist">Categoria</label>
            <input
              className="bg-slate-100 rounded py-2 px-4 text-slate-900 "
              size={30}
              {...register("categoria", {
                required: "Categoria é obrigatório",
              })}
            />
          </div>
          <div className="flex flex-col gap-0">
            <label className="text-slate-900 font-geist">Descrição</label>
            <input
              className="bg-slate-100 rounded py-2 px-4 text-slate-900 "
              size={14}
              {...register("descricao", {
                required: "Descrição é obrigatória",
              })}
            />
          </div>
          <div className="flex gap-2">
            <InputSalvar />
            <InputDeletar handleExcluir={handleExcluir} />
          </div>
        </form>
        <TitleListas title="Lista dos produtos cadastrados" />
        <ListaProdutos produtos={produtos} setidEmEdicao={setidEmEdicao} />
      </div>
    </>
  );
}
