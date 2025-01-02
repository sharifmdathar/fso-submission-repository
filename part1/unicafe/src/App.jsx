import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral;
  return (
    <>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {(good - bad) / all}</p>
      <p>positive {(good / all) * 100} %</p>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood((prevGood) => prevGood + 1)}>good</button>
      <button onClick={() => setNeutral((prevNeutral) => prevNeutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad((prevBad) => prevBad + 1)}>bad</button>
      {(good > 0) | (neutral > 0) | (bad > 0) ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
