import React from 'react';
import styled from 'styled-components';
import Table from './Table';

const Styles = styled.div`
  padding: 1rem;

  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid white;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
          border-color: white; 
        }
      }
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid white;
      border-right: 1px solid white;
      color: white; 

      :last-child {
        border-right: 0;
        border-color: white; 
      }
    }
  }
`

function TableContainer({data}) {

    console.log("TableContainer");
    console.log("data prop: ", data);
    const columns = React.useMemo(
      () => [
        
            {
              Header: 'First Name',
              accessor: 'firstName',
              width: 200,
            },
            {
              Header: 'Last Name',
              accessor: 'lastName',
              width: 200,
            },
            {
              Header: 'Address',
              accessor: 'address',
              width: 200,
            },
            {
              Header: 'SSN',
              accessor: 'ssn',
              width: 200,
            },
          ],
              
      []
    )
  
     const dataSet = React.useMemo(() => data, [])
/*     const data = [
        {
            firstname: "John",
            lastname: "Doe",
            address: "Congo", 
            ssn: "333-22-4444"
        
    }
    ]; */
  
    return (
      <Styles>
        <Table columns={columns} data={dataSet} />
      </Styles>
    )
  }
  
  export default TableContainer