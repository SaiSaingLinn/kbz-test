import moment from 'moment';
import React, { useMemo } from 'react'
import DataTable from "react-data-table-component";
import FilterComponent from '../filterComponent';

const Table = props => {
  const columns = [
    {
      name: "Photo",
      cell: (row) => {
        return <div><img width={50} src={row.photo} /></div>
      },
      sortable: false,
    },
    {
      name: "Name",
      cell: row => row.name,
      sortable: false,
    },
    {
      name: "Email",
      cell: row => row.email,
      sortable: false
    },
    {
      name: "Phone",
      cell: row => row.phone,
      sortable: false,
    },
    {
      name: "Birthday",
      cell: row => row.dob,
      sortable: false,
    },
    {
      name: "Gender",
      cell: row => row.gender,
      sortable: false,
    },
    {
      name: "NRC",
      cell: row => row.nrc,
      sortable: false,
    },
    {
      name: "CreatedAt",
      cell: row => moment(new Date(row?.timeStamp?.seconds * 1000).toLocaleDateString("en-US")).format('MMM DD YYYY'),
      sortable: false,
    },
    {
      name: "Action",
      button: true,
      cell: (row) =>
        <div style={{padding: "5px 0"}}>
          <button
            style={{minWidth: '73px'}}
            className='edit'
            onClick={() => props.click('edit', row?.id)}
          >
            Edit
          </button>
          <button style={{minWidth: '73px'}} className='delete' onClick={() => props.click('delete', row?.id)}>Delete</button>
        </div>
    }
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );

  const filteredItems = props.data.filter(
    item =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      columns={columns}
      data={filteredItems}
      striped
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
    />
  );
};

export default Table;