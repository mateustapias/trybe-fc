interface ICustomError extends Error {
  statusCode?: number;
}

export default ICustomError;
