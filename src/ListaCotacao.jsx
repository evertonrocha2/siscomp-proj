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
            name: "Produto",
            selector: (row) => row.produto?.nome,
            sortable: true,
            style: {
                fontWeight: "bold",
            },
        },
        {
            name: "Nome",
            selector: (row) => row.nome,
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
                data={cotacoes}
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
