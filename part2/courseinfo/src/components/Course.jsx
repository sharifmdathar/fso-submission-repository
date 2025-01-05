const Header = ({ courseName }) => <h1>{courseName}</h1>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ courseParts }) => (
  <>
    {courseParts.map((part) => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </>
);

const Total = ({ courseParts }) => {
  const total = courseParts.reduce((sum, part) => sum + part.exercises, 0);
  return <strong>total of {total} exercises</strong>;
};

const Course = ({ course }) => (
  <>
    <Header courseName={course.name} />
    <Content courseParts={course.parts} />
    <Total courseParts={course.parts} />
  </>
);

export default Course;
