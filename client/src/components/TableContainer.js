import React from "react";
import Table from "./Table";

function TableContainer({ data }) {
  console.log("TableContainer");
  console.log("data prop: ", data);
  const columns = [
    {
      Header: "First Name",
      accessor: "firstName",
      width: 200,
    },
    {
      Header: "Last Name",
      accessor: "lastName",
      width: 200,
    },
    {
      Header: "Address",
      accessor: "address",
      width: 200,
    },
    {
      Header: "SSN",
      accessor: "ssn",
      width: 200,
    },
  ];

  return <Table columns={columns} data={data} />;
}

export default TableContainer;
