export const Notification = ({ msg }) => {
  if (msg === null) return null;
  return <div className="notification">{msg}</div>;
};
