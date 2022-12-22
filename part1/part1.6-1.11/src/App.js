import {useState} from 'react'

const Header = (props) => {
  return (
    <h3>{props.text}</h3>
  )
}

const Button = (props) => {
  
  return (
    
    <button onClick={props.prop[1]}>{props.prop[0]}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
       <td style={{border:"1px solid"}}>{props.text}</td><td style={{border:"1px solid"}}>{props.value}</td>
    </tr>
  )
}

const Statistic = (props) => {
    const good = props.prop[0]
    const neutral = props.prop[1]
    const bad = props.prop[2]
    const all = good + neutral + bad 
    const average = (good + (-1 * bad))/all
    const positive = (good/all)*100
  if (all == 0 ) {
    return (
      <div>
        <p>No Feedback has been given yet</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <table style={{border:"2px solid"}}>
          <thead>
          <tr >
            <th style={{border:"1px solid"}}>Stat</th>
            <th style={{border:"1px solid"}}>Value</th>
          </tr>
          </thead>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="All" value={all} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Positive" value={positive.toString()+" "+"%"} />       
          </tbody>
        </table>    
     </div>
     
      
    ) 

  }

}



const App = () => {
  const [good,setGood] = useState(0)
  const [bad,setBad] = useState(0)
  const [neutral,setNeutral] = useState(0)
  
  const handleGood = () => {
    setGood(good+1)
  }
  const handleBad = () => {
    setBad(bad+1)
  }
  const handleNeutral = () => {
    setNeutral(neutral +1)
  }

const feedback = [good,neutral,bad]


  return (
    <div>
       <Header text="Give Feedback" />
       <Button prop={["good",handleGood]} />
       <Button prop={["bad",handleBad]} />
       <Button prop={["neutral",handleNeutral]} />

       <Statistic prop={feedback}/>


    </div>
  )
}





export default App;
