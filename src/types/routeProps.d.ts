export default interface RouteProps {
  match: {
    path: string;
    url: string;
    isExact: boolean;
    params: { id: string };
  };

  location: {
    pathname: string;
    search: string;
    hash: string;
    key: string;
  };

  history: {
    length: number;
    action: "PUSH";
    location: { hash: string; key: string; pathname: string };
    createHref: () => void;
    push: (location: string) => void;
    replace: (location: string) => void;
    go: () => void;
    goBack: () => void;
    goForward: () => void;
    block: () => void;
    listen: () => void;
  };
}
