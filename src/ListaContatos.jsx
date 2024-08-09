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

    const customStyles = {
        header: {
            style: {
                backgroundColor: "#111827",
                color: "#d1d5db",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontWeight: "bold",
            },
        },
        headRow: {
            style: {
                backgroundColor: "#111827",
                color: "#d1d5db",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontWeight: "bold",
            },
        },
        headCells: {
            style: {
                backgroundColor: "#6ee7b7",
                color: "#111827",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontWeight: "bold",
                width: "100%",
            },
        },
        rows: {
            style: {
                backgroundColor: "#0C0C13",
                color: "#d1d5db",
                fontFamily: "Arial, Helvetica, sans-serif",
            },
        },
        cells: {
            style: {
                backgroundColor: "#0C0C13",
                color: "#d1d5db",
                fontFamily: "Arial, Helvetica, sans-serif",
            },
        },
        pagination: {
            style: {
                borderColor: "#363636",
            },
        },
    };

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
        <div className="md:w-[60%] mx-auto rounded mb-8 p-0">
            <DataTable
                columns={columns}
                data={contatos}
                striped
                responsive
                selectableRows
                selectableRowsHighlight
                selectableRowsSingle
                onSelectedRowsChange={handleChange}
                customStyles={customStyles}
                {...paginationOptions}
            />
        </div>
    );
}
