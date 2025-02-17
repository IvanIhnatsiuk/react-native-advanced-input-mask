import State from "./State";

class EOLState extends State {
  accept: (char: string) => null = () => {
    return null;
  };

  toString: () => string = () => "EOL";
}

export default EOLState;
