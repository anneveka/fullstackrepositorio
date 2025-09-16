import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / total
  const positive = total === 0 ? 0 : (good/total)*100

  const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good+1)} text="good"/>
      <Button onClick={() => setNeutral(neutral+1)} text="neutral"/>
      <Button onClick={() => setBad(bad+1)} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} average={average} positive={positive} total={total}/>
    </div>
  )
}

const Statistics = (props) => {

  if (props.total === 0){
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <div>
      <p>good: {props.good}</p>
      <p>neutral: {props.neutral}</p>
      <p>bad: {props.bad}</p>
      <p>all: {props.good + props.neutral +props.bad}</p>
      <p>average: {props.average}</p>
      <p>positive: {props.positive}%</p>
    </div>
  )

}

export default App