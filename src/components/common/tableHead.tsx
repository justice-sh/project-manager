import React from "react";
import styled from "styled-components";

import SortColumn from "../../types/sortColumn";
import Column from "../../types/column";

export interface TableHeadProps {
  columns: Column[];
  sortColumn: SortColumn;
  onSort: (sortColumn: SortColumn) => void;
}

export interface TableHeadState {}

class TableHead extends React.Component<TableHeadProps, TableHeadState> {
  raiseSort = (path: string) => {
    if (!path) return;

    let sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else sortColumn = { path, order: "asc" };

    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <Thead className="thead" data-aos="fade" data-aos-duration={1000}>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              className="clickable"
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </Thead>
    );
  }
}

const Thead = styled.thead`
  position: sticky;
  top: -2px;
  z-index: 111;
  background-color: #007bff;
  color: white;
`;

export default TableHead;
