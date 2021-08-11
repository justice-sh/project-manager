export type SelectOption = {
  value: string;
  label: string;
};

export interface SelectProps {
  name: string;
  label: string;
  value: string;
  error?: string;
  options: SelectOption[];
  onChange: (e) => void;
}

const Select: React.FC<SelectProps> = (props) => {
  const { name, label, error, options, ...rest } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} {...rest} className="form-control">
        <option value="" />
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
