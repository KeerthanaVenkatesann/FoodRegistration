// // List.js
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchUsers, deleteUser } from "../Reducer/Actiontype/Actions";
// import Loader from "../Loader/Loader";

// import { TiEdit } from "react-icons/ti";
// import { FaRegTrashAlt } from "react-icons/fa";

// const List = () => {
//   const users = useSelector((state) => state.users);
//   const [dialogVisible, setDialogVisible] = useState(false);
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       await dispatch(fetchUsers());
//       setLoading(false);
//     };
//     fetchData();
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     dispatch(deleteUser(id));
//     setDialogVisible(false);
//   };

//   const showDialog = (id) => {
//     setSelectedUserId(id);
//     setDialogVisible(true);
//   };

//   const closeDialog = () => {
//     setDialogVisible(false);
//     setSelectedUserId(null);
//   };

//   return (
//     <div className="container ">
//       {loading && <Loader />}

//       <div className="whole-page">
//         <h4 className="title-haven ">LIST MANAGING FOR FOOD REGISTRATION</h4>
//         <h4 className="text-start"
//        >
//           <Link to="/" className="link">

//           </Link>
//         </h4>
//         <div className="table   table-responsive">
//           <table className="table   ">
//             <thead className="">
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Ph.No</th>
//                 <th>Location</th>
//                 <th>Shop Name</th>
//                 <th>Food</th>
//                 <th>Description</th>
//                 <th>Add On</th>
//                 <th>Quantity</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user) => (
//                 <tr key={user.id}>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>{user.phoneNumber}</td>
//                   <td>{user.location}</td>
//                   <td>{user.shopName}</td>
//                   <td>{user.food}</td>
//                   <td>{user.description}</td>
//                   <td>{user.addOn}</td>
//                   <td>{user.quantity}</td>
//                   <td id="action">
//                     <button
//                       className="delete btn-danger "
//                       onClick={() => showDialog(user.id)}
//                     >
//                       <FaRegTrashAlt />
//                     </button>
//                     {/* <button className='delete' onClick={() => handleDelete(user.id)}>Delete</button> */}
//                     <button className="edit bg-success btn-success ms-1 ">
//                       <Link
//                         className=" text-light "
//                         to={`/form/${user.id}/edit`}
//                       >
//                         <TiEdit />
//                       </Link>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {dialogVisible && (
//             <dialog open className="dailog card  ">
//               <h4 className="card p-2 ">hey!, Are you Want Delete?</h4>
//               <form method="dialog">
//                 <button
//                   type="button"
//                   className="del btn-danger"
//                   onClick={() => handleDelete(selectedUserId)}
//                 >
//                   Yes
//                 </button>
//                 <button
//                   className="nope btn-primary"
//                   type="button"
//                   onClick={closeDialog}
//                 >
//                   No
//                 </button>
//               </form>
//             </dialog>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default List;

import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { fetchUsers, deleteUser } from "../Reducer/Actiontype/Actions";
import { useNavigate, Link } from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ExcelJS from "exceljs";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaFilter } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "primeicons/primeicons.css";
import { TiEdit } from "react-icons/ti";

const List = () => {
  const users = useSelector((state) => state.users);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState({});
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchUsers());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const openNew = () => {
    navigate(`form`);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          className="ms-2"
          onClick={confirmDelete}
          disabled={!selectedRows || selectedRows.length === 0}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="">
        <Button
          type="button"
          icon="pi pi-file"
          rounded
          onClick={() => exportCSV(false)}
          data-pr-tooltip="CSV"
        />
        <Button
          type="button"
          icon="pi pi-file-excel"
          severity="success"
          className="ms-2"
          rounded
          onClick={exportToExcel}
          data-pr-tooltip="XLS"
        />
        <Button
          type="button"
          icon="pi pi-file-pdf"
          severity="warning"
          className="ms-2"
          rounded
          onClick={downloadPDF}
          data-pr-tooltip="PDF"
        />
      </div>
    );
  };

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setGlobalFilter("");
  };

  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value);
  };

  const confirmDelete = () => {
    setDeleteProductsDialog(true);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const deleteSelectedProducts = async () => {
    const deletedIds = [];
    for (const selectedRow of selectedRows) {
      try {
        await dispatch(deleteUser(selectedRow.id));
        deletedIds.push(selectedRow.id);
      } catch (error) {
        console.error("Error deleting record:", error);
      }
    }
    const updatedData = users.filter(
      (rowData) => !deletedIds.includes(rowData.id)
    );
    setSelectedRows([]);
    toast.success("Deleted successfully!");
    setDeleteProductsDialog(false);
  };

  const deleteProductsDialogFooter = (
    <div className="confirmation-content">
      <button
        type="button"
        className="btn btn-primary bg-transparent ms-2 fs-4 fw-bold text-primary"
        onClick={hideDeleteProductsDialog}
      >
        <CloseIcon /> NO
      </button>
      <button
        type="button"
        className="btn btn-danger ms-2 fs-4 text-light"
        onClick={deleteSelectedProducts}
      >
        <CheckIcon /> YES
      </button>
    </div>
  );

  const header = () => {
    return (
      <div className="d-flex p-toolbar">
        <div>
          <h3 className="text-danger">Worker's Table</h3>
        </div>
        <div className="d-flex justify-content-end">
          <Button className="button me-3 " onClick={handleReset}>
            Clear
            <FaFilter />
          </Button>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              globalFilter={globalFilter}
              value={globalFilter}
              onChange={onGlobalFilterChange}
              placeholder="Global Search"
            />
          </span>
        </div>
      </div>
    );
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const deleteProduct = async () => {
    try {
      await dispatch(deleteUser(product.id));
      setDeleteProductDialog(false);
      setProduct({});
      toast.success("Worker Deleted Successfully!");
    } catch (error) {
      console.error("Error deleting worker:", error);
      toast.error("Error deleting worker. Please try again later.");
    }
  };

  const handleRowSelect = (e) => {
    setSelectedRows(e.value);
  };

  const deleteProductDialogFooter = (
    <div className="confirmation-content">
      <button
        type="button"
        className="btn btn-primary bg-transparent ms-2 fs-4 fw-bold text-primary"
        onClick={hideDeleteProductDialog}
      >
        <CloseIcon /> NO
      </button>
      <button
        type="button"
        className="btn btn-danger ms-2 fs-4 text-light"
        onClick={deleteProduct}
      >
        <CheckIcon /> YES
      </button>
    </div>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined className="">
          <Link className=" text-light " to={`/form/${rowData.id}/edit`}>
            <TiEdit />
          </Link>
        </Button>
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          className="ms-2"
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Workers");
    worksheet.columns = [
      { header: "Name", key: "name", width: 15 },
      { header: "Email", key: "email", width: 20 },
      { header: "phoneNumber", key: "phoneNumber", width: 15 },
      { header: "Confirm phoneNumber", key: "location", width: 20 },
      { header: "shopName Number", key: "shopName", width: 15 },
      { header: "food", key: "food", width: 15 },
      { header: "description", key: "description", width: 15 },
      { header: "Date of Birth", key: "quantity", width: 15 },
    ];

    users.forEach((rowData) => {
      worksheet.addRow({
        name: rowData.name,
        email: rowData.email,
        phoneNumber: rowData.phoneNumber,
        location: rowData.location,
        shopName: rowData.shopName,
        food: rowData.food,
        description: rowData.description,
        quantity: rowData.quantity,
      });
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      const fileName = "Workers.xlsx";

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableData = users.map((rowData) => {
      return [
        rowData.name,
        rowData.email,
        rowData.phoneNumber,
        rowData.location,
        rowData.shopName,
        rowData.food,
        rowData.description,
        rowData.quantity,
      ];
    });

    doc.autoTable({
      head: [
        [
          "Name",
          "Email",
          "phoneNumber",
          "Confirm phoneNumber",
          "shopName Number",
          "food",
          "description",
          "Date of Birth",
        ],
      ],
      body: tableData,
    });

    doc.save("Workers.pdf");
  };
  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };
  return (
    <div>
      <Toolbar
        className="mb-4"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>
      <DataTable
        value={users}
        responsiveLayout="scroll"
        selection={selectedRows}
        onSelectionChange={handleRowSelect}
        paginator
        rows={10}
        dataKey="id"
        loading={loading}
        globalFilter={globalFilter}
        header={header}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3em" }}
        ></Column>
        <Column field="name" header="First Name" sortable></Column>
        <Column field="email" header="Email" sortable></Column>
        <Column field="phoneNumber" header="phoneNumber" sortable></Column>
        <Column field="location" header="location" sortable></Column>
        <Column field="shopName" header="shopName" sortable></Column>
        <Column field="food" header="food" sortable></Column>
        <Column field="description" header="description" sortable></Column>
        <Column field="quantity" header="Date of Birth" sortable></Column>
        <Column body={actionBodyTemplate} header="Actions"></Column>
      </DataTable>

      <Dialog
        visible={deleteProductDialog}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <WarningAmberOutlinedIcon />
          <span> Are you sure you want to delete the selected worker?</span>
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <WarningAmberOutlinedIcon />
          <span> Are you sure you want to delete the selected workers?</span>
        </div>
      </Dialog>
    </div>
  );
};

export default List;
