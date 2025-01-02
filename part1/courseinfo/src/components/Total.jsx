const Total = ({parts}) => {
  let total = 0;
  parts.map(el => {total += el.exercises})
  return (
    <p>Number of exercises {total}</p>
  )
}

export default Total