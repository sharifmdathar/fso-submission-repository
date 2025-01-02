import { useState } from "react";

const StatisticLine = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral;
  return (
    <>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={(good - bad) / all} />
      <StatisticLine text="positive" value={`${(good / all) * 100} %`} />
    </>
  );
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood((prevGood) => prevGood + 1)} text="good" />
      <Button
        onClick={() => setNeutral((prevNeutral) => prevNeutral + 1)}
        text="neutral"
      />
      <Button onClick={() => setBad((prevBad) => prevBad + 1)} text="bad" />

      <h1>statistics</h1>
      {(good > 0) | (neutral > 0) | (bad > 0) ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
