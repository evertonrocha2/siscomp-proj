import DataTable from "react-data-table-component";

export default function ListaCotacao({ cotacoes = [], setidEmEdicao }) {
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
      name: "Produto",
      selector: (row) => row.produto?.nome,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Fornecedor", 
      selector: (row) => row.fornecedor?.nome,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Data",
      selector: (row) => row.data,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Valor",
      selector: (row) => row.valor,
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
        data={cotacoes}
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
