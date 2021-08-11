export interface Props {
  liked: boolean;
  onClick: () => void;
}

const Like: React.FC<Props> = ({ liked, onClick }) => {
  const classes = 'fa fa-heart' + (liked ? '' : '-o');
  return (
    <i
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      className={classes}
      aria-hidden={true}
    />
  );
};

export default Like;
