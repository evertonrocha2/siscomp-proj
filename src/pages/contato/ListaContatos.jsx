import DataTable from "react-data-table-component";

// eslint-disable-next-line react/prop-types
export default function ListaContatos({ contatos = [], setidEmEdicao }) {
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
      name: "Nome",
      selector: (row) => row.nome,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Email",
      selector: (row) => row.email,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Telefone",
      selector: (row) => row.fone,
      style: {
        fontWeight: "bold",
      },
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
        data={contatos}
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
