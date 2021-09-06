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
  max-height: 400px;
  border-radius: 7px;
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid #b5c6e0;
  border-spacing: 10px 0px;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #007bff;
  }

  .table {
    margin-top: -5px;
    min-width: 800px;
  }

  @media (max-width: 992px) {
    overflow-x: auto;
  }

  @media (max-width: 400px) {
    max-height: 80vh;
  }
`;

export default Table;
