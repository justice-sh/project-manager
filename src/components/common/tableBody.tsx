import React from "react";
import Column from "../../types/column";

export interface TableBodyProps {
  data: any[];
  columns: Column[];
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

  rand = () => Math.random() * 1000;

  render() {
    const { data, columns } = this.props;

    return (
      <tbody className="tbody">
        {data.map((item, index) => (
          <tr key={index} className="tbody__tr">
            {columns.map((column) => (
              <td
                key={item.path || item.key}
                className="tbody__td"
                data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-offset="0"
                data-aos-delay={index === 0 ? 0 : index * 50}
                data-aos-duration={index === 0 ? 300 : 1000}
              >
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
