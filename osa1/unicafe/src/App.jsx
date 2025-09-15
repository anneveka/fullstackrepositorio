import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [goodtotal, setTotalGood] = useState(0)
  const [neutraltotal, setTotalNeutral] = useState(0)
  const [badtotal, setTotalBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    const updeateGood = good + 1
    setTotalGood(updeateGood)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    const updateNeutral = neutral + 1
    setTotalNeutral(updateNeutral)
  }

  const handleBad = () => {
    setBad(bad + 1)
    const updateBad = bad + 1
    setTotalBad(updateBad)
  }

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
    </div>
  )
}


export default App