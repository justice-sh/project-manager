import React from "react";
import styled from "styled-components";

import SortColumn from "../../types/sortColumn";
import Column from "../../types/column";

export interface TableHeaderProps {
  columns: Column[];
  sortColumn: SortColumn;
  onSort: (sortColumn: SortColumn) => void;
}

export interface TableHeaderState {}

class TableHeader extends React.Component<TableHeaderProps, TableHeaderState> {
  raiseSort = (path: string) => {
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
      <Thead className="thead">
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
  background-color: #007bff;
  color: white;
`;

export default TableHeader;
