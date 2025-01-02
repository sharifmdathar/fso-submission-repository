import Part from './Part'

const Content = ({parts}) => {
  const partsList = parts.map(el => (<Part key={el.name} name={el.name} exercises={el.exercises} />))
  return (
    <>
      {partsList}
    </>
  )
}

export default Content