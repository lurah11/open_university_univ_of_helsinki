import {useState} from 'react'

const Button = (props) => {
  
  return (
    <button onClick={props.props[1]}>{props.props[0]}</button>
   
  ) 
}

const MostVote = (props) => {
  const values = Object.values(props.props)
  const max_value = Math.max(...values)
  console.log(max_value)
  const index = Object.keys(props.props).find(key=>props.props[key]===max_value)
  return (
    <div>
    <h3>Anecdote with most votes</h3>
    <p>{props.ane[index]}</p>
    <p> has {max_value} votes </p>  
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const handleClick = () => {
  let rand_number = Math.floor(Math.random()*anecdotes.length) 
    setSelected(rand_number)
  }
   

  const handleVote = () => {
    const newVote = {...vote}
    newVote[selected] += 1

    setVote(newVote) 
  }
  
  const [selected,setSelected] = useState(0)
  const text1 = "next anecdote"
  const text2 = "vote"
  const int_selected = parseInt(selected)
  
  const points = {}

  for (let i = 0 ; i < anecdotes.length; i++) {
    points[i.toString()] = 0 
  }
  

 
  const [vote,setVote] = useState(
      points
  )


  return (
    <div>
      <h3>Anecdote of the day</h3>
      <p>{anecdotes[int_selected]}</p>
      <br />
      <Button props={[text2,handleVote]} />
      <Button props={[text1,handleClick]} />
      <br />
      <p>has {vote[selected]} votes </p>
      <MostVote ane={anecdotes}  props={vote}/>
    </div>
  )
}





export default App;
