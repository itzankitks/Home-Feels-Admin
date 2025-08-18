export const userColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "user",
    headerName: "User",
    width: 200,
    // flex: 1.5,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
    // flex: 4,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
    // flex: 1,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
    // flex: 1,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
    // flex: 1.5,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    // flex: 1,
    renderCell: (params) => {
      return (
        <div
          className={`cellWithStatus ${params.row.isAdmin ? "admin" : "user"}`}
        >
          {params.row.isAdmin ? "Admin" : "User"}
        </div>
      );
    },
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", flex: 1.5 }, //width: 70
  {
    field: "name",
    headerName: "Name",
    // width: 100,
    flex: 1,
    // renderCell: (params) => {
    //   return (
    //     <div className="cellWithImg">
    //       <img className="cellImg" src={params.row.img} alt="avatar" />
    //       {params.row.username}
    //     </div>
    //   );
    // },
  },
  {
    field: "type",
    headerName: "Type",
    // width: 100,
    flex: 0.5,
  },

  {
    field: "title",
    headerName: "Title",
    // width: 230,
    flex: 1.5,
  },
  {
    field: "city",
    headerName: "City",
    // width: 100,
    flex: 0.5,
  },
  // {
  //   field: "phone",
  //   headerName: "Phone",
  //   width: 100,
  // },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 100,
  //   renderCell: (params) => {
  //     return (
  //       <div
  //         className={`cellWithStatus ${params.row.isAdmin ? "admin" : "user"}`}
  //       >
  //         {params.row.isAdmin ? "Admin" : "User"}
  //       </div>
  //     );
  //   },
  // },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];
