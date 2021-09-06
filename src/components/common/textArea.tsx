interface Props {
  name: string;
  label: string;
  value: string;
  error?: string;
  onChange: (e) => void;
}

function TextArea({ name, label, error, ...rest }: Props) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        {...rest}
        className="form-control"
        id={name}
        name={name}
        rows={4}
      ></textarea>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default TextArea;
