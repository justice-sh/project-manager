export default interface Column {
  path?: string;
  label?: string;
  key?: string;
  content?: (item: any) => void;
}
