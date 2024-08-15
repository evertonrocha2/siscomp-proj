import DataTable from "react-data-table-component";

// eslint-disable-next-line react/prop-types
export default function ListaProdutos({ produtos = [], setidEmEdicao }) {
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
      name: "Categoria",
      selector: (row) => row.categoria,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Descricao",
      selector: (row) => row.descricao,
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
        data={produtos}
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
