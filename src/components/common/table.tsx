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
  overflow-x: auto;
  border-radius: 7px;
  &::scrollbar-width {
    width: 5px;
  }

  .table {
    min-width: 800px;
  }

  .thead {
    /* background-color: #007bff; */
    background-color: #0d41e1;
    color: white;
  }

  .tbody__tr:nth-child(odd) {
    color: black;
    background-color: #b5c6e0;
  }

  .tbody__tr:nth-child(even) {
    background-color: #ebf4f5;
    color: black;
  }
`;

export default Table;
