export interface Props {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const range = (limit: number, start = 1) => {
  const range = [...new Array(limit + start).keys()];
  range.splice(0, 1);
  return range;
};

const Paginate: React.FC<Props> = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = range(pagesCount);

  return (
    <nav>
      <ul className='pagination'>
        {pages.map((p) => (
          <li
            key={p}
            className={'page-item' + (p === currentPage ? ' active' : '')}
          >
            <button onClick={() => onPageChange(p)} className='page-link'>
              {p}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginate;
