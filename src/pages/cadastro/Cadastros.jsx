import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputDeletar from "../../components/InputDeletar";
import NavComponent from "../../components/NavComponent";
import Select from "react-select";
import { auth, db } from "../../infra/firebase";

import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import ListaCadastros from "./ListaCadastros";
import TitleListas from "../../components/TitleListas";
import { Blocks, Shield, ShieldCheck, ShieldX, XIcon } from "lucide-react";
import BlurIn from "../../../@/components/magicui/blur-in";
import GridPatternLinearGradient from "../../components/GridPatternLinearGradient";

export default function Cadastros() {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [userType, setUserType] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [idEmEdicao, setidEmEdicao] = useState("");
  const [cadastros, setCadastros] = useState([]);
  const options = [
    { value: false, label: "Colaborador" },
    { value: true, label: "Administrador" },
  ];

  const getOptionByValue = (value) =>
    options.find((option) => option.value === value);

  const handleChange = (selectedOption) => {
    setUserType(selectedOption.value);
  };

  async function fetchCadastros() {
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    const usuarios = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        userType: data.isAdmin ? "Administrador" : "Colaborador",
        blocked: data.blocked ? (
          <ShieldX className="h-7 w-7" color="red" />
        ) : (
          <ShieldCheck className="h-7 w-7" color="green" />
        ),
      };
    });
    setCadastros(usuarios);
  }

  const handleChangeType = (e) => {
    setUserType(e.target.value === "true");
  };

  useEffect(() => {
    fetchCadastros();
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      if (idEmEdicao) {
        const userRef = doc(db, "usuarios", idEmEdicao);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
        } else {
          reset();
        }
      } else {
        reset();
      }
    }
    fetchUserData();
  }, [idEmEdicao]);

  const handleSubmitForm = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.senha
      );
      const newUser = userCredential.user;

      await setDoc(doc(db, "usuarios", newUser.uid), {
        email: data.email,
        senha: data.senha,
        isAdmin: userType,
        blocked: false,
      });

      alert("Usuário registrado com sucesso!");

      reset();
      fetchCadastros();
    } catch (error) {
      console.error("Erro ao registrar/atualizar usuário:", error);
      alert(error.message);
    }
  };

  const handleExcluir = async () => {
    const user = auth.currentUser;
    try {
      if (!idEmEdicao) {
        alert("Nenhum usuário selecionado para exclusão.");
        return;
      }

      const confirmar = confirm(
        "Você tem certeza que deseja excluir este usuário? Você precisará fazer login novamente para poder acessar o SisComp!"
      );
      if (!confirmar) {
        return;
      }

      const userRef = doc(db, "usuarios", idEmEdicao);
      await deleteDoc(userRef);
      await deleteUser(user);
      await fetchCadastros();

      setidEmEdicao("");
      alert("Usuário deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      alert("Erro ao tentar deletar o usuário: " + error.message);
    }
  };

  const handleBlock = async () => {
    if (!idEmEdicao) {
      alert("Nenhum usuário selecionado para bloqueio.");
      return;
    }
    const docRef = doc(db, "usuarios", idEmEdicao);
    try {
      await updateDoc(docRef, { blocked: true });
      setidEmEdicao("");
      alert("Usuário bloqueado com sucesso!");
      setIsOpen(false);
      fetchCadastros();
    } catch (error) {
      console.error("Erro ao bloquear usuário:", error);
      alert("Erro ao tentar bloquear o usuário: " + error.message);
    }
  };

  const handleUnblock = async () => {
    if (!idEmEdicao) {
      alert("Nenhum usuário selecionado para desbloqueio.");
      return;
    }
    const docRef = doc(db, "usuarios", idEmEdicao);
    try {
      await updateDoc(docRef, { blocked: false });
      setidEmEdicao("");
      alert("Usuário desbloqueado com sucesso!");
      setIsOpen(false);
      fetchCadastros();
    } catch (error) {
      console.error("Erro ao desbloquear usuário:", error);
      alert("Erro ao tentar desbloquear o usuário: " + error.message);
    }
  };

  const handleSaveChanges = async () => {
    if (!idEmEdicao) {
      alert("Nenhum usuário selecionado para salvar as alterações.");
      return;
    }
    const docRef = doc(db, "usuarios", idEmEdicao);
    try {
      if (!blocked) {
        await updateDoc(docRef, { isAdmin: userType });
        alert("Tipo de usuário alterado com sucesso!");
        setIsOpen(false);
        setIsOpen2(false);
        fetchCadastros();
      }
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
      alert("Erro ao tentar salvar as alterações: " + error.message);
    }
  };

  return (
    <div>
      <NavComponent />
      <div className="sm:w-[60%] w-[95%] my-4 mx-auto">
        <GridPatternLinearGradient />
        <h1 className="text-3xl text-center tracking-tighter font-geist font-bold text-slate-900 my-8">
          <BlurIn
            word={"Cadastro de Colaboradores ou Administradores"}
          ></BlurIn>
        </h1>
        <form
          className="flex flex-col border  bg-white border-slate-300 rounded p-10 m-0 gap-4 text-white"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <div className="flex flex-col gap-0">
            <label className="text-slate-900 font-geist">E-mail</label>
            <input
              className="bg-slate-100 rounded py-2 px-4 text-slate-900"
              size={30}
              {...register("email", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-0">
            <label className="text-slate-900 font-geist">Senha</label>
            <input
              className="bg-slate-100 rounded py-2 px-4 text-slate-900"
              size={30}
              type="password"
              {...register("senha", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-0">
            <label className="text-slate-900 font-geist tracking-tighter font-geist-sans">
              Tipo de Usuário
            </label>
            <Select
              options={options}
              value={getOptionByValue(userType)}
              onChange={handleChange}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "transparent",
                  color: "white",
                  border: "2px solid #363636",
                  padding: "6px",
                }),
                option: (provided, state) => ({
                  ...provided,
                  color: state.isSelected ? "white" : "black",
                  backgroundColor: state.isFocused ? "#ACFFAF" : "white",
                  padding: "6px",
                }),
              }}
            />
          </div>
          <div className="flex gap-2">
            <input
              className="bg-[#ACFFAF] cursor-pointer hover:bg-[#A2D79A] rounded py-2 px-4 font-geist text-black font-bold w-[50%] mx-auto"
              type="submit"
              value="Salvar"
            />
            <InputDeletar handleExcluir={handleExcluir} />
          </div>
        </form>
        <TitleListas title="Lista de cadastros cadastrados" />
        <ListaCadastros
          cadastros={cadastros}
          setIsOpen={setIsOpen}
          setidEmEdicao={setidEmEdicao}
          isOpen={isOpen}
          isAdmin={userType}
          isOpen2={isOpen2}
          setIsOpen2={setIsOpen2}
        />
        {isOpen && (
          <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-500 h-full w-full"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 z-20 -translate-y-1/2 bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
              <h2 className="text-xl font-bold font-geist">
                Bloquear ou Desbloquear Colaborador
              </h2>
              <p className="font-geist text-sm">
                Aqui você irá alterar as informações do usuário!
              </p>

              <div className="flex gap-4 my-4">
                <button
                  className="bg-slate-100 border border-slate-300 text-md font-geist rounded py-2 px-4"
                  onClick={handleBlock}
                >
                  Bloquear
                </button>
                <button
                  className="bg-slate-100 border border-slate-300 text-md font-geist rounded py-2 px-4"
                  onClick={handleUnblock}
                >
                  Desbloquear
                </button>
              </div>
              <button
                className="absolute top-4 right-4 text-md font-geist"
                onClick={() => setIsOpen(false)}
              >
                <XIcon />
              </button>
            </div>
          </div>
        )}
        {isOpen2 && (
          <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-500 h-full w-full"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 z-20 -translate-y-1/2 bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
              <h2 className="text-xl font-bold font-geist">Editar usuário</h2>
              <p className="font-geist text-sm">
                Aqui você irá alterar as informações do usuário!
              </p>

              <div className="flex gap-4 my-4">
                <select
                  className="border border-slate-300 rounded py-2 px-4 text-slate-900"
                  onChange={handleChangeType}
                >
                  <option value={false}>Colaborador</option>
                  <option value={true}>Administrador</option>
                </select>
              </div>
              <button
                className="bg-slate-100 border border-slate-300 text-md font-geist rounded py-2 px-4"
                onClick={handleSaveChanges}
              >
                Salvar
              </button>
              <button
                className="absolute top-4 right-4 text-md font-geist"
                onClick={() => setIsOpen2(false)}
              >
                <XIcon />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
