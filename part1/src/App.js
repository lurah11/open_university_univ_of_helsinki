const Header = (props) => {
  return(<h1>{props.name}</h1>)
}

const Part = (props) => {
  return (<p>{props.part} {props.exercise}</p>)
}

const Content = (props) => {
  const part1 = "Fundamentasls of React"
  const exercise1 = 10 
  const part2 = "Using props to pass data"
  const exercise2 = 7 
  const part3 = "State of a component"
  const exercise3=14
  return (
    <div>
      <Part part={part1} exercise={exercise1} />
      <Part part={part2} exercise={exercise2} />
      <Part part={part3} exercise={exercise3} />
    </div>
  )
}

const Total = (props) => {
  return (<p>Number of exercise {props.total}</p>)
}



const App = () => {
  const course = "Half Stack application development"
  const exercise1 = 10 
  const exercise2 = 7 
  const exercise3=14

  return (
    <div>
      <Header  name={course} />
      <Content />
      <Total total={exercise1+exercise2+exercise3} />
    </div>
)
}




export default App;
