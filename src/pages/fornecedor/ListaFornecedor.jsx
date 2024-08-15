import DataTable from "react-data-table-component";

export default function ListaFornecedor({ fornecedores = [], setidEmEdicao }) {
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
      name: "Endereço",
      selector: (row) => row.endereco,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Contato",
      selector: (row) => row.contato?.nome,
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
        data={fornecedores}
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
