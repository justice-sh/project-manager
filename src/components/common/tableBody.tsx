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

  render() {
    const { data, columns, idProperty = "id" } = this.props;

    console.log(data.length);

    return (
      <Tbody className="tbody">
        {data.map((item, index) => (
          <tr
            key={item[idProperty]}
            className="tbody__tr"
            data-aos="flip-down"
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
  .tbody__tr {
    background-color: #ffffff;
  }
`;

export default TableBody;
