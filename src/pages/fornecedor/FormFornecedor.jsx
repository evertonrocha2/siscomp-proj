import { useForm } from "react-hook-form";
import { listarContatos, obterContato } from "../../infra/contatos";
import { useEffect, useState } from "react";
import {
  alterarFornecedor,
  excluirFornecedor,
  inserirFornecedor,
  obterFornecedor,
} from "../../infra/fornecedores";
import ListaFornecedor from "./ListaFornecedor";
import InputSalvar from "../../components/InputSalvar";
import InputDeletar from "../../components/InputDeletar";
import TitleListas from "../../components/TitleListas";
import { getViaCep } from "../../infra/viacep";
import NavComponent from "../../components/NavComponent";

export default function FormFornecedor({
  idEmEdicao,
  setidEmEdicao,
  fornecedores,
  setUsuario,
}) {
  const [contatos, setContatos] = useState([]);
  const [contatoSelecionadoId, setContatoSelecionadoId] = useState("");
  const { register, handleSubmit, setValue, reset, watch } = useForm();

  useEffect(() => {
    async function fetchContatos() {
      const contatosList = await listarContatos();
      setContatos(contatosList);
    }
    fetchContatos();
  }, []);

  useEffect(() => {
    async function fetchFornecedor() {
      if (idEmEdicao) {
        const fornecedor = await obterFornecedor(idEmEdicao);
        setValue("nome", fornecedor.nome);
        setValue("endereco", fornecedor.endereco);
        setValue("cep", fornecedor.cep);

        if (fornecedor.contato) {
          setContatoSelecionadoId(fornecedor.contato.id);
        } else {
          setValue("nomeContato", "");
          setValue("emailContato", "");
          setContatoSelecionadoId("");
        }
      } else {
        reset();
      }
    }
    fetchFornecedor();
  }, [idEmEdicao, reset, setValue]);

  const cepValue = watch("cep");

  useEffect(() => {
    async function fetchCep() {
      if (cepValue && cepValue.length === 8) {
        const endereco = await getViaCep(cepValue);
        if (endereco.erro) {
          alert("CEP não encontrado.");
        } else {
          setValue(
            "endereco",
            `${endereco.logradouro}, ${endereco.bairro}, ${endereco.localidade} - ${endereco.uf}`
          );
        }
      }
    }
    fetchCep();
  }, [cepValue, setValue]);

  async function submeterDados(dados) {
    console.log(dados);
    let fornecedorComContato = { ...dados };

    if (contatoSelecionadoId) {
      const contato = await obterContato(contatoSelecionadoId);
      fornecedorComContato = { ...dados, contato };
    }

    if (idEmEdicao) {
      await alterarFornecedor({
        ...fornecedorComContato,
        id: idEmEdicao,
      });
      setidEmEdicao("");
    } else {
      let id = await inserirFornecedor(fornecedorComContato);
      setidEmEdicao(id);
      if (setidEmEdicao) {
        setTimeout(() => {
          setidEmEdicao("");
        }, 3000);
      }
    }
  }

  async function handleExcluir() {
    await excluirFornecedor(idEmEdicao);
    setidEmEdicao("");
    reset();
  }

  return (
    <>
      <NavComponent setUsuario={setUsuario} />
      <div className="sm:w-[60%] w-[95%] my-4 mx-auto">
        <h1 className="text-3xl text-center font-geist font-bold tracking-tighter text-slate-900 my-8">
          Formulário de Fornecedores
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
            <label className="text-slate-900 font-geist">CEP</label>
            <input
              className="bg-slate-100 rounded py-2 px-4 text-slate-900 "
              maxLength={8}
              {...register("cep", {
                required: "CEP é obrigatório",
                pattern: {
                  value: /^[0-9]{8}$/,
                  message: "CEP deve conter 8 números.",
                },
              })}
            />
          </div>
          <div className="flex flex-col gap-0">
            <label className="text-slate-900 font-geist">Endereço</label>
            <input
              className="bg-slate-100 rounded py-2 px-4 text-slate-900 "
              size={50}
              {...register("endereco", {
                required: "Endereço é obrigatório",
              })}
              readOnly
            />
          </div>
          <div className="flex flex-col gap-0">
            <label className="text-slate-900 font-geist">
              Selecionar Contato
            </label>
            <select
              {...register("contato")}
              className="bg-slate-100 rounded py-2 px-4 text-slate-900 "
              onChange={(e) => setContatoSelecionadoId(e.target.value)}
              value={contatoSelecionadoId}
            >
              <option value="">Selecione um contato</option>
              {contatos.map((contato) => (
                <option key={contato.id} value={contato.id}>
                  {contato.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <InputSalvar />
            <InputDeletar handleExcluir={handleExcluir} />
          </div>
        </form>
        <TitleListas title="Lista dos fornecedores cadastrados" />
        <ListaFornecedor
          fornecedores={fornecedores}
          setidEmEdicao={setidEmEdicao}
        />
      </div>
    </>
  );
}
