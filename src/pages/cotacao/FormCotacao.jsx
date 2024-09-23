import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { listarProdutos, obterProduto } from "../../infra/produtos";
import { listarFornecedores, obterFornecedor } from "../../infra/fornecedores"; // Importar as funções de fornecedores
import {
  alterarCotacao,
  excluirCotacao,
  inserirCotacao,
} from "../../infra/cotacao";
import ListaCotacao from "./ListaCotacao";
import TitleListas from "../../components/TitleListas";
import InputSalvar from "../../components/InputSalvar";
import InputDeletar from "../../components/InputDeletar";
import NavComponent from "../../components/NavComponent";
import BlurIn from "../../../@/components/magicui/blur-in";
import GridPatternLinearGradient from "../../components/GridPatternLinearGradient";

export default function FormCotacao({
  idEmEdicao,
  setidEmEdicao,
  cotacoes,
  setUsuario,
}) {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]); // State para fornecedores
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    async function fetchProdutos() {
      const produtosList = await listarProdutos();
      setProdutos(produtosList);
    }
    fetchProdutos();
  }, []);

  useEffect(() => {
    async function fetchFornecedores() {
      const fornecedoresList = await listarFornecedores(); // Chama a função para listar fornecedores
      setFornecedores(fornecedoresList);
    }
    fetchFornecedores();
  }, []);

  useEffect(() => {
    async function fetchProdutoSelecionado() {
      if (idEmEdicao) {
        try {
          const produto = await obterProduto(idEmEdicao);
          if (produto) {
            setProdutoSelecionado(produto);
            setValue("produto", produto.id);
            setValue("nome", produto.nome);
            setValue("data", produto.data);
          } else {
            setProdutoSelecionado(null);
          }
        } catch (error) {
          console.error("Erro ao buscar produto:", error);
        }
      } else {
        setProdutoSelecionado(null);
      }
    }
    fetchProdutoSelecionado();
  }, [idEmEdicao, setValue]);

  useEffect(() => {
    async function fetchCotacao() {
      if (idEmEdicao) {
        const cotacao = cotacoes.find((c) => c.id === idEmEdicao);
        if (cotacao) {
          setValue("produto", cotacao.produto?.id || "");
          setValue("fornecedor", cotacao.fornecedor?.id || ""); // Adiciona o fornecedor
          setValue("data", cotacao.data);
          setValue("valor", cotacao.valor);
        }
      } else {
        reset();
      }
    }
    fetchCotacao();
  }, [idEmEdicao, cotacoes, setValue, reset]);

  // Submeter os dados
  async function submeterDados(dados) {
    console.log(dados);
    const produto = dados.produto ? await obterProduto(dados.produto) : null;
    const fornecedor = dados.fornecedor ? await obterFornecedor(dados.fornecedor) : null;

    const cotacaoComFornecedor = {
      ...dados,
      produto: produto,
      fornecedor: fornecedor, 
    };

    if (idEmEdicao) {
      await alterarCotacao({
        ...cotacaoComFornecedor,
        id: idEmEdicao,
      });
      setidEmEdicao("");
    } else {
      let id = await inserirCotacao(cotacaoComFornecedor);
      setidEmEdicao(id);
    }
  }

  async function handleExcluir() {
    await excluirCotacao(idEmEdicao);
    setidEmEdicao("");
  }

  return (
    <>
      <NavComponent setUsuario={setUsuario} />
      <div className="sm:w-[60%] w-[95%] my-4 mx-auto">
        <GridPatternLinearGradient />
        <h1 className="text-3xl text-center tracking-tighter  font-geist  font-bold text-slate-900 my-8">
          <BlurIn word={"Formulário de Cotação"}></BlurIn>
        </h1>
        <form
          className="flex flex-col border  bg-white border-slate-300 rounded p-10 m-0 gap-4 text-white"
          onSubmit={handleSubmit(submeterDados)}
        >
          <div className="flex flex-col gap-0">
            <label className="text-slate-900 font-geist">
              Selecionar Produto
            </label>
            <select
              {...register("produto")}
              className="bg-slate-100 rounded py-2 px-4 text-slate-900 "
              onChange={(e) => setValue("produto", e.target.value)}
            >
              <option value="">Selecione um produto</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-0">
            <label className="text-slate-900 font-geist">
              Selecionar Fornecedor
            </label>
            <select
              {...register("fornecedor")}
              className="bg-slate-100 rounded py-2 px-4 text-slate-900 "
              onChange={(e) => setValue("fornecedor", e.target.value)}
            >
              <option value="">Selecione um fornecedor</option>
              {fornecedores.map((fornecedor) => (
                <option key={fornecedor.id} value={fornecedor.id}>
                  {fornecedor.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-0">
            <label className="text-slate-900 font-geist">Data de cotação</label>
            <input
              type="date"
              className="bg-slate-100 rounded py-2 px-4 text-slate-900 "
              size={30}
              {...register("data", {
                required: "Data é obrigatória",
              })}
            />
          </div>
          <div className="flex flex-col gap-0">
            <label className="text-slate-900 font-geist">
              Valor do produto
            </label>
            <input
              type="text"
              className="bg-slate-100 rounded py-2 px-4 text-slate-900 "
              size={30}
              {...register("valor", {
                required: "Valor é obrigatório",
              })}
            />
          </div>

          <div className="flex gap-2">
            <InputSalvar />
            <InputDeletar handleExcluir={handleExcluir} />
          </div>
        </form>
        <TitleListas title="Lista de cotações cadastradas" />
        <ListaCotacao fornecedores={fornecedores} cotacoes={cotacoes} setidEmEdicao={setidEmEdicao} />
      </div>
    </>
  );
}
