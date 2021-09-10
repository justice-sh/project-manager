import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

interface Props {
  path: string;
  component?: any;
  render?: (props: any) => void;
}

const ProtectedRoute: React.FC<Props> = (props) => {
  const { component: Component, render, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser()) return <Redirect to="/please_login" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
