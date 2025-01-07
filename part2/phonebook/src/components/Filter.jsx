export const Filter = ({ setFilter }) => (
  <p>
    filter shown with <input onChange={(e) => setFilter(e.target.value)} />
  </p>
);
