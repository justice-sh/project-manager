import styled from "styled-components";

import TableBody from "./tableBody";
import TableHead from "./tableHead";

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
        <TableHead columns={columns} onSort={onSort} sortColumn={sortColumn} />
        <TableBody data={data} columns={columns} />
      </table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-width: 250px;
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

  @media (max-width: 992px) {
    overflow-x: auto;
  }
`;

export default Table;
