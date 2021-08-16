import React from "react";
import styled from "styled-components";

import Column from "../../types/column";

export interface TableBodyProps {
  data: any[];
  columns: Column[];
  idProperty?: string;
}

export interface TableBodyState {}

class TableBody extends React.Component<TableBodyProps, TableBodyState> {
  getProperty = (item: any, path: string) => {
    const paths = path.split(".");

    return paths.reduce((acc, next) => acc[next], item);
  };

  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return this.getProperty(item, column.path);
  };

  // rand = () => Math.random() * 1000;

  render() {
    const { data, columns, idProperty = "id" } = this.props;

    return (
      <Tbody className="tbody">
        {data.map((item, index) => (
          <tr
            key={item[idProperty]}
            className="tbody__tr"
            data-aos="flip-down"
            data-aos-delay={index === 0 ? 100 : 200 * index}
            data-aos-duration={600}
          >
            {columns.map((column) => (
              <td key={column.path || column.key} className="tbody__td">
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </Tbody>
    );
  }
}

const Tbody = styled.tbody`
  border: 1px solid #b5c6e0;

  .tbody__tr:nth-child(odd) .tbody__td {
    color: black;
    background-color: #b5c6e0;
  }

  .tbody__tr:nth-child(even) .tbody__td {
    background-color: #ebf4f5;
    color: black;
  }
`;

export default TableBody;
