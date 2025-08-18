import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import pluralize from "pluralize";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Loading from "../loading/Loading";
import ConfirmModal from "../confirmModal/ConfirmModal";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (error) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      // flex: 1,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              // onClick={() => handleDelete(params.row._id)}

              onClick={() => {
                setSelectedId(params.row._id);
                setShowModal(true);
              }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="datatable">
        <div className="datatableTitle">
          {`All ${path.charAt(0).toUpperCase() + path.slice(1)}`}
          <Link to={`/${path}/new`} className="link">
            Add New
          </Link>
        </div>
        <DataGrid
          className="datagrid"
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      </div>
      <ConfirmModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          handleDelete(selectedId);
          setShowModal(false);
        }}
        text={`Are you sure you want to delete this 
          ${pluralize.singular(path.charAt(0).toUpperCase() + path.slice(1))}?`}
        type="warning"
        // timeout={5000}
      />
    </>
  );
};

export default Datatable;
