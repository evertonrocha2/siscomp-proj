import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import DataTable from "react-data-table-component";
import { db } from "../../infra/firebase";
import { useEffect, useState } from "react";
import { Edit } from "lucide-react";

// eslint-disable-next-line react/prop-types
export default function ListaRequisicoes({
  requisicoes = [],
  setidEmEdicao,
  usuarioId,
  usuario,
}) {
  const [usuarioAdmin, setUsuarioAdmin] = useState(false);
  const [filteredRequisicoes, setFilteredRequisicoes] = useState([]);

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
            onClick={() => setidEmEdicao(row.id)}
            className={`text-slate-900 hover:text-blue-700 `}
          >
            <Edit className="h-6 w-6" />
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
    </div>
  );
}
