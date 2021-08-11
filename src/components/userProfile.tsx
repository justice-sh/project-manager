import auth from "../services/authService";
interface Props {}

function UserProfile(props: Props) {
  // const {} = props;

  console.log(auth.getCurrentUser());

  return <h1>User Profile</h1>;
}

export default UserProfile;
