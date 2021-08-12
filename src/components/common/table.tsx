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

  .thead {
    background-color: #007bff;
    color: white;
  }

  .tbody__tr:nth-child(odd) {
    background-color: #1daddd;
  }

  .tbody__tr:nth-child(even) {
    background-color: #2c5461;
    color: white;
  }
`;

export default Table;
