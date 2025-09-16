import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [goodtotal, setTotalGood] = useState(0)
  const [neutraltotal, setTotalNeutral] = useState(0)
  const [badtotal, setTotalBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    const updeateGood = good + 1
    setTotalGood(updeateGood)
    setTotal(updeateGood + neutral + bad)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    const updateNeutral = neutral + 1
    setTotalNeutral(updateNeutral)
    setTotal(updateNeutral + good + bad)
  }

  const handleBad = () => {
    setBad(bad + 1)
    const updateBad = bad + 1
    setTotalBad(updateBad)
    setTotal(updateBad + good + neutral)
  }

  const average = total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / total

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <h1>statistics</h1>
      <p>good: {goodtotal}</p>
      <p>neutral: {neutraltotal}</p>
      <p>bad: {badtotal}</p>
      <p>all: {total}</p>
      <p>average: {average}</p>
      <Positive good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}


const Positive = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  const yhteensa = good + neutral + bad

  return (
    <div>
      <p>positive: {(good/yhteensa)*100} %</p>
    </div>
  )
}

export default App