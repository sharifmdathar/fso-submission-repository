export const Message = ({ msg }) => {
  if (msg === null) return null;
  return (
    <div className="notification" id="message">
      {msg}
    </div>
  );
};

export const Error = ({ errorMsg }) => {
  if (errorMsg === null) return null;
  return (
    <div className="notification" id="error">
      {errorMsg}
    </div>
  );
};
