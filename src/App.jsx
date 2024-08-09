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
import FormContato from "./FormContato";
import { listarFornecedores } from "./infra/fornecedores";
import { listarContatos } from "./infra/contatos";
import FormFornecedor from "./FormFornecedor";
import FormCotacao from "./FormCotacao";
import FormProdutos from "./FormProdutos";
import { listarProdutos } from "./infra/produtos";
import { listarCotacoes } from "./infra/cotacao";
import Dashboard from "./Dashboard";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

export default function App() {
  const [contatos, setContatos] = useState();
  const [cotacoes, setCotacoes] = useState();
  const [fornecedores, setFornecedores] = useState();
  const [produtos, setProdutos] = useState();
  const [userType, setUserType] = useState("Collaborator");
  const [idEmEdicao, setidEmEdicao] = useState("");
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const novaListaContatos = await listarContatos();
      const novaListaFornecedores = await listarFornecedores();
      const novaListaProdutos = await listarProdutos();
      const novaListaCotacoes = await listarCotacoes();
      setContatos(novaListaContatos);
      setFornecedores(novaListaFornecedores);
      setProdutos(novaListaProdutos);
      setCotacoes(novaListaCotacoes);
      console.log("Lista de contatos:", novaListaContatos);
      console.log("Lista de fornecedores:", novaListaFornecedores);
      console.log("Lista de produtos:", novaListaProdutos);
      console.log("Lista de cotacoes:", novaListaCotacoes);
    }
    fetchData();
  }, [idEmEdicao]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user ? { id: user.uid, email: user.email } : null);
    });

    return () => unsubscribe();
  }, []);

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
          element={
            usuario ? (
              <Navigate to="/dashboard" />
            ) : (
              <RegisterPage setUserType={setUserType} userType={userType} />
            )
          }
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
      </Routes>
    </Router>
  );
}
