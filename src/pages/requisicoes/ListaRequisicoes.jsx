import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import DataTable from "react-data-table-component";
import { db } from "../../infra/firebase";
import { useEffect, useState } from "react";
import { Edit, InfoIcon, XIcon } from "lucide-react";

// eslint-disable-next-line react/prop-types
export default function ListaRequisicoes({ setidEmEdicao, usuarioId }) {
  const [usuarioAdmin, setUsuarioAdmin] = useState(false);
  const [filteredRequisicoes, setFilteredRequisicoes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [empresa, setEmpresa] = useState("");
  const [valorProduto, setValorProduto] = useState("");
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [requisicoes, setRequisicoes] = useState([]);
  const [selectedRequisicao, setSelectedRequisicao] = useState(null);

  async function fetchRequisicoes() {
    const requisicoesSnapshot = await getDocs(collection(db, "requisicoes"));
    const requisicoesList = requisicoesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRequisicoes(requisicoesList);
  }

  async function handleChange({ selectedRows }) {
    const id = selectedRows[0]?.id;
    if (id) {
      setidEmEdicao(id);
    } else {
      setidEmEdicao("");
    }
  }

  async function receberDoBanco() {
    const usuarioRef = doc(db, "usuarios", usuarioId);
    const usuarioSnap = await getDoc(usuarioRef);
    if (usuarioSnap.exists()) {
      const isAdmin = usuarioSnap.data().isAdmin;
      setUsuarioAdmin(isAdmin);
      if (isAdmin) {
        setFilteredRequisicoes(requisicoes);
      } else {
        setFilteredRequisicoes(
          requisicoes.filter((req) => req.usuarioId === usuarioId)
        );
      }
    } else {
      console.log("Usuário não encontrado");
    }
  }

  useEffect(() => {
    receberDoBanco();
    fetchRequisicoes();
  }, [usuarioId, requisicoes]);

  const columns = [
    {
      name: "Data",
      selector: (row) => row.dataCriacao,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Nome",
      selector: (row) => row.nome,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Categoria",
      selector: (row) => row.categoria,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Status",
      selector: (row) => row.estado,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Ações",
      cell: (row) =>
        usuarioAdmin && (
          <button
            disabled={row.estado === "Cotada"}
            onClick={() => {
              setSelectedRowId(row.id);
              setShowPopup(true);
            }}
            className={`text-slate-900 hover:text-blue-700 ${
              row.estado === "Cotada" ? "cursor-not-allowed" : ""
            }`}
          >
            <Edit className="h-6 w-6" />
          </button>
        ),
    },
    {
      name: "Informações",
      cell: (row) => (
        <button
          onClick={async () => {
            const requisicaoRef = doc(db, "requisicoes", row.id);
            const requisicaoSnap = await getDoc(requisicaoRef);
            if (requisicaoSnap.exists()) {
              setSelectedRequisicao({ id: row.id, ...requisicaoSnap.data() });
              setShowPopup2(true);
            }
          }}
        >
          <InfoIcon />
        </button>
      ),
    },
  ];

  const paginationOptions = {
    pagination: true,
    paginationPerPage: 5,
    paginationRowsPerPageOptions: [5, 10, 15],
    paginationComponentOptions: {
      rowsPerPageText: "Itens por página:",
    },
  };

  async function handleSave() {
    if (selectedRowId && empresa && valorProduto) {
      const requisicaoRef = doc(db, "requisicoes", selectedRowId);
      const requisicaoSnap = await getDoc(requisicaoRef);

      if (requisicaoSnap.exists()) {
        const requisicaoData = requisicaoSnap.data();
        const cotacoes = requisicaoData.cotacoes || [];

        cotacoes.push({
          nomeEmpresa: empresa,
          valorProduto: valorProduto,
        });

        let novoEstado = "Aberta";
        if (cotacoes.length > 0 && cotacoes.length < 3) {
          novoEstado = "Em Cotação";
        } else if (cotacoes.length >= 3) {
          novoEstado = "Cotada";
        }

        await updateDoc(requisicaoRef, {
          cotacoes: cotacoes,
          estado: novoEstado,
        });

        setShowPopup(false);
        setEmpresa("");
        setValorProduto("");
        setUpdateTrigger(!updateTrigger);
      }
    }
  }

  return (
    <div className="sm:w-[100%] mx-auto rounded mb-8 p-0 border border-slate-300">
      <DataTable
        columns={columns}
        data={filteredRequisicoes}
        striped
        responsive
        selectableRows
        selectableRowsHighlight
        selectableRowsSingle
        onSelectedRowsChange={handleChange}
        {...paginationOptions}
      />
      {showPopup && (
        <div className="fixed inset-0 flex w-[100%] h-[100%] bg-black bg-opacity-50 justify-center items-center">
          <div className="bg-white p-4 rounded-lg relative">
            <button
              className="absolute top-4 right-4"
              onClick={() => setShowPopup(false)}
            >
              <XIcon />
            </button>
            <form className="flex flex-col gap-6  px-8 py-4 font-geist">
              <h1 className="text-lg font-geist font-bold mt-8">
                Faça a cotação da Requisição!
              </h1>
              <div className="flex flex-col gap-2 mt-8">
                <label>Nome da Empresa</label>
                <input
                  type="text"
                  value={empresa}
                  className=" border-slate-300 bg-slate-100 rounded py-2 px-4 text-slate-900 font-geist font-bold mx-auto"
                  onChange={(e) => setEmpresa(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Valor do Produto</label>
                <input
                  type="text"
                  value={valorProduto}
                  className=" border-slate-300 bg-slate-100 rounded py-2 px-4 text-slate-900 font-geist font-bold mx-auto"
                  onChange={(e) => setValorProduto(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="bg-emerald-300 py-2 rounded-lg hover:bg-emerald-500 transition-all"
                onClick={handleSave}
              >
                Salvar
              </button>
            </form>
          </div>
        </div>
      )}
      {showPopup2 && selectedRequisicao && (
        <div className="fixed inset-0 flex w-[100%] h-[100%] z-50 bg-black bg-opacity-50 justify-center items-center">
          <div className="bg-white w-[600px] relative  py-8 rounded-lg px-12">
            <button
              className="absolute top-4 right-4"
              onClick={() => setShowPopup2(false)}
            >
              <XIcon />
            </button>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold font-geist mt-6">
                Informações da Requisição
              </h2>
              <p className="font-geist text-sm">
                <strong>ID:</strong> {selectedRequisicao.id}
              </p>
              <p className="font-geist text-sm">
                <strong>Nome:</strong> {selectedRequisicao.nome}
              </p>
              <p className="font-geist text-sm">
                <strong>Categoria:</strong> {selectedRequisicao.categoria}
              </p>
              <p className="font-geist text-sm">
                <strong>Estado:</strong> {selectedRequisicao.estado}
              </p>
              <p className="font-geist text-sm">
                <strong>Data de Criação:</strong>{" "}
                {selectedRequisicao.dataCriacao}
              </p>
              <h3 className="text-xl font-geist font-semibold mt-4">
                Cotações:
              </h3>
              {selectedRequisicao.cotacoes &&
                selectedRequisicao.cotacoes.map((cotacao, index) => (
                  <div key={index} className="flex flex-col gap-2  ">
                    <div className="font-geist text-sm">
                      <h3>
                        <strong>Nome da Empresa {index + 1}:</strong>
                      </h3>
                      <p>{cotacao.nomeEmpresa}</p>
                    </div>
                    <div className="font-geist text-sm">
                      <h3>
                        <strong>Valor do Produto:</strong>{" "}
                      </h3>
                      <p>{cotacao.valorProduto}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
