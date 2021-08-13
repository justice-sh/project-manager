import styled from "styled-components";

import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

import Column from "../../types/column";
import SortColumn from "../../types/sortColumn";

export interface TableProps {
  data: any;
  columns: Column[];
  sortColumn: SortColumn;
  onSort: (sortColumn: SortColumn) => void;
}

const Table: React.FC<TableProps> = ({ columns, sortColumn, data, onSort }) => {
  return (
    <Wrapper>
      <table className="table">
        <TableHeader
          columns={columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <TableBody data={data} columns={columns} />
      </table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-width: 300px;
  overflow-x: hidden;
  border-radius: 7px;

  &::-webkit-scrollbar {
    width: 6px; // This line is not working. I don't know why.
  }

  &::-webkit-scrollbar-track {
    background-color: white;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #b5c6e0;
  }

  .table {
    min-width: 800px;
    height: 300px;
  }

  .thead {
    /* background-color: #007bff; */
    background-color: #0d41e1;
    color: white;
  }

  .tbody {
    border: 5px solid #b5c6e0;
  }

  .tbody__tr:nth-child(odd) .tbody__td {
    color: black;
    background-color: #b5c6e0;
  }

  .tbody__tr:nth-child(even) .tbody__td {
    background-color: #ebf4f5;
    color: black;
  }
`;

export default Table;
