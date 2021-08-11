export interface InputProps {
  name: string;
  label: string;
  value: string;
  error?: string;
  type?: string;
  onChange: (e) => void;
}

const Input: React.FC<InputProps> = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name} name={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
