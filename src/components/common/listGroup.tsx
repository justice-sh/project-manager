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
      {items.map((item, index) => (
        <li
          key={item[idProperty]}
          className={classes(item)}
          onClick={() => onItemSelect(item)}
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-offset="0"
          data-aos-delay={index === 0 ? 200 : index * 400}
          data-aos-duration={800}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
