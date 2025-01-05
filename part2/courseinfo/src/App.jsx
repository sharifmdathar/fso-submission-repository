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
const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      {courses.map((course) => (
        <Course course={course} />
      ))}
    </>
  );
};

export default App;
