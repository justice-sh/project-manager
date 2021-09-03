interface Props {
  items: any[];
  selectedItem: any;
  idProperty?: string;
  textProperty?: string;
  onItemSelect: (item: any) => void;
}

const ListGroup: React.FC<Props> = (props) => {
  const {
    onItemSelect,
    items,
    selectedItem,
    idProperty = "id",
    textProperty = "name",
  } = props;

  const classes = (item) => {
    return selectedItem === item
      ? "list-group-item active clickable"
      : "list-group-item clickable";
  };

  return (
    <ul className="list-group">
      {items.map((item, index) => {
        return (
          <li
            key={item[idProperty]}
            className={classes(item)}
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

export default ListGroup;
