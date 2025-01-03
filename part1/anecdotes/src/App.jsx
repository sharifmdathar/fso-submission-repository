import { useState } from "react";

const Anecdote = ({ anecdotes, votes, index }) => {
  return (
    <p>
      {anecdotes[index]}
      <br />
      has {votes[index]} votes
    </p>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [votes, setVotes] = useState({
    0: 1,
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
    7: 1,
  });

  const [selected, setSelected] = useState(0);

  const nextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const voteSelected = () => {
    setVotes((prevVotes) => {
      let newVotes = { ...prevVotes };
      newVotes[selected] += 1;
      return newVotes;
    });
  };

  const maxVotesIndex = () => {
    let max = 0;
    for (let key in votes) {
      votes[key] > votes[max] ? (max = key) : null;
    }
    return max;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} votes={votes} index={selected} />
      <button onClick={voteSelected}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h1>Anecdotes with most votes</h1>
      <Anecdote anecdotes={anecdotes} votes={votes} index={maxVotesIndex()} />
    </div>
  );
};

export default App;
