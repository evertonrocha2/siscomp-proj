import { Edit, ShieldCheck, ShieldX } from "lucide-react";
import DataTable from "react-data-table-component";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function ListaCadastros({
  cadastros = [],
  setidEmEdicao,
  setIsOpen,
  isOpen,
  isOpen2,
  setIsOpen2,
}) {
  const handlePopup = (id) => {
    if (id) {
      setidEmEdicao(id);
    }
    setIsOpen(!isOpen);
  };

  const handlePopupSelect = (id) => {
    if (id) {
      setidEmEdicao(id);
    }
    setIsOpen2(!isOpen2);
  };

  async function handleChange({ selectedRows }) {
    const id = selectedRows[0]?.id;
    if (id) {
      setidEmEdicao(id);
    } else {
      setidEmEdicao("");
    }
  }

  const columns = [
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Tipo de Usuário",
      selector: (row) => row.userType,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Status",
      selector: (row) => row.blocked,
    },
    {
      name: "Mudar Status",
      cell: (row) => (
        <button
          onClick={() => handlePopup(row.id)}
          disabled={row.isAdmin}
          className={`text-slate-900 hover:text-blue-700 ${
            row.isAdmin ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <Edit className="h-6 w-6" />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Mudar Tipo de Usuário",
      cell: (row) => (
        <button
          onClick={() => handlePopupSelect(row.id)}
          disabled={row.isAdmin}
          className={`text-slate-900 hover:text-blue-700 ${
            row.isAdmin ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <Edit className="h-6 w-6" />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
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
        data={cadastros}
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
