import { useState } from 'react'

const Button = ({handleClick, text})=>{ 
    return <button onClick={handleClick}>{text}</button>
}
const StatisticsLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>
const Statistics = ({votes, all, average, positive}) =>{
   
    return (<table>
        <tbody>
         <StatisticsLine text="good" value={votes.good} />
         <StatisticsLine text="neutral" value={votes.neutral} />
         <StatisticsLine text="bad" value={votes.bad} />
         <StatisticsLine text="all" value={all} />
         <StatisticsLine text="average" value={average} />
         <StatisticsLine text="positive" value={positive} />
        </tbody>
    </table>)
}

const App = () => {
  // save clicks of each button to its own state
  const [votes, setVotes] = useState({
    good:0,
    neutral:0,
    bad:0
  })
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const voteGood = ()=>{
    const newVote = {
        ...votes,
        good: votes.good+1
    }
    setVotes(newVote);
    calculations(newVote)
  }
  const voteNeutral = ()=>{
    const newVote = {
        ...votes,
        neutral: votes.neutral+1
    }
    setVotes(newVote);
    calculations(newVote)
  }

  const voteBad = ()=>{
    const newVote = {
        ...votes,
        bad: votes.bad+1
    }
    setVotes(newVote);
    calculations(newVote)
  }

  const calculations = (votes)=>{
      const sum = Object.values(votes).reduce((a,b)=> a+b)
      setAll(sum)
      const goodPoints = votes.good*1
      const neutralPoints = votes.neutral *0
      const badPoints = votes.bad *-1
      const calcAvg = (goodPoints+ neutralPoints + badPoints)/sum || 0
      setAverage(calcAvg.toString()+"%")
      setPositive((goodPoints/sum).toString()+"%" || 0 )
    }
 

  return (
    <>
        <h1>give feedback</h1>

        <Button handleClick={voteGood} text={"good"}/>
        <Button handleClick={voteNeutral} text={"neutral"}/>
        <Button handleClick={voteBad} text={"bad"}/>

        <h1>statistics</h1>
        {all>0? (
            <>
            <Statistics 
            votes={votes}
            all={all} 
            average={average} 
            positive={positive} />
            </> 
            ) : <p>No feedback given</p>}

    </>
  )
}

export default App