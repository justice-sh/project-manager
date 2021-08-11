export default interface User {
  uid: string;
  name: string;
  password: string;
  isAdmin?: boolean;
}
