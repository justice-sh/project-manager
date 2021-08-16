export interface SearchBoxProps {
  query: string;
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ query, onSearch }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      value={query}
      onChange={(e) => onSearch(e.currentTarget.value)}
      data-aos="fade-in"
      data-aos-duration={2000}
    />
  );
};

export default SearchBox;
