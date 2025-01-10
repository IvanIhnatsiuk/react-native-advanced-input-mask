class FormatError extends Error {
  constructor() {
    super('Format error');
    Object.setPrototypeOf(this, FormatError.prototype);
  }
}

export default FormatError;
