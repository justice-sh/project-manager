import { Route, Redirect, RouteProps } from "react-router-dom";
// import auth from "../../services/authService";

const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const { component: Component, render, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (false)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
