import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./infra/firebase"; // Ajuste o caminho conforme necessário

import "./App.css";
import "./index.css";
import FormContato from "./pages/contato/FormContato";
import { listarFornecedores } from "./infra/fornecedores";
import { listarContatos } from "./infra/contatos";
import FormFornecedor from "./pages/fornecedor/FormFornecedor";
import FormCotacao from "./pages/cotacao/FormCotacao";
import FormProdutos from "./pages/produtos/FormProdutos";
import { listarProdutos } from "./infra/produtos";
import { listarCotacoes } from "./infra/cotacao";
import Dashboard from "../src/pages/dashboard/Dashboard";
import LoginPage from "./pages/login-registro/LoginPage";
import RegisterPage from "./pages/login-registro/RegisterPage";
import Cadastros from "./pages/cadastro/Cadastros";
import FormRequisicao from "./pages/requisicoes/FormRequisicao";
import { listarRequisicoes } from "./infra/requisicoes";
import CircularProgress from "@mui/material/CircularProgress";

export default function App() {
  const [contatos, setContatos] = useState();
  const [cotacoes, setCotacoes] = useState();
  const [requisicoes, setRequisicoes] = useState();
  const [fornecedores, setFornecedores] = useState();
  const [produtos, setProdutos] = useState();
  const [idEmEdicao, setidEmEdicao] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const novaListaContatos = await listarContatos();
      const novaListaFornecedores = await listarFornecedores();
      const novaListaProdutos = await listarProdutos();
      const novaListaCotacoes = await listarCotacoes();
      const novaListaRequisicoes = await listarRequisicoes();
      setContatos(novaListaContatos);
      setFornecedores(novaListaFornecedores);
      setProdutos(novaListaProdutos);
      setCotacoes(novaListaCotacoes);
      setRequisicoes(novaListaRequisicoes);
      console.log("Lista de contatos:", novaListaContatos);
      console.log("Lista de fornecedores:", novaListaFornecedores);
      console.log("Lista de produtos:", novaListaProdutos);
      console.log("Lista de cotacoes:", novaListaCotacoes);
    }
    fetchData();
  }, [idEmEdicao]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUsuario(user ? { id: user.uid, email: user.email } : null);
        setLoading(false);
      },
      [usuario]
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            usuario ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={
            usuario ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginPage setUsuario={setUsuario} />
            )
          }
        />
        <Route
          path="/register"
          element={usuario ? <Navigate to="/dashboard" /> : <RegisterPage />}
        />
        <Route
          path="/fornecedores"
          element={
            usuario ? (
              <FormFornecedor
                setUsuario={setUsuario}
                idEmEdicao={idEmEdicao}
                setidEmEdicao={setidEmEdicao}
                fornecedores={fornecedores}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/contatos"
          element={
            usuario ? (
              <FormContato
                setUsuario={setUsuario}
                contatos={contatos}
                idEmEdicao={idEmEdicao}
                setidEmEdicao={setidEmEdicao}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/cotacoes"
          element={
            usuario ? (
              <FormCotacao
                setUsuario={setUsuario}
                idEmEdicao={idEmEdicao}
                setidEmEdicao={setidEmEdicao}
                cotacoes={cotacoes}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/cadastros"
          element={usuario ? <Cadastros /> : <Navigate to="/login" />}
        />
        <Route
          path="/produtos"
          element={
            usuario ? (
              <FormProdutos
                setUsuario={setUsuario}
                produtos={produtos}
                idEmEdicao={idEmEdicao}
                setidEmEdicao={setidEmEdicao}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            usuario ? (
              <Dashboard setUsuario={setUsuario} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/requisicoes"
          element={
            usuario ? (
              <FormRequisicao
                setUsuario={setUsuario}
                setidEmEdicao={setidEmEdicao}
                requisicoes={requisicoes}
                idEmEdicao={idEmEdicao}
                usuarioId={usuario.id}
                usuario={usuario}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}
